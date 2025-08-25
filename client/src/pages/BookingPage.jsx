import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieDetailsSkeleton from '../components/MovieDetailLoading';
import FormSkeleton from '../components/FormLoading';
import SeatSkeleton from '../components/SeatLoading';
import './BookingPage.css';

const BookingPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    showTiming: '',
    numberOfSeats: ''
  });
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get movieId from location state
  const movieId = location.state?.movieId;
  
  // Fetch movie details from API
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        setError("No movie selected");
        setLoading(false);
        return;
      }
      fetch(`http://localhost:5000/movies?id=${movieId}`)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setMovieInfo(data[0]);
          setLoading(false);
        }, 2500);
      })
      .catch(err => {
        console.error("Error fetching movie details:", err);
        setLoading(false);
      });
      // try {
      //   setLoading(true);
      //   const response = await axios.get(`http://localhost:5000/movies?id=${movieId}`);
      //   setMovieInfo(response.data[0]);
      //   setError(null);
      // } catch (err) {
      //   console.error("Error fetching movie details:", err);
      //   setError("Failed to load movie details");
      // } finally {
      //   setLoading(false);
      // }
    };
    
    fetchMovieDetails();
  }, [movieId]);
  
  // Generate seat data
  const generateSeats = () => {
    const seats = [];
    const totalRows = 12;
    const seatsPerRow = 20;
    
    // Some dummy booked seats
    const bookedSeats = ['A5', 'A6', 'B10', 'C15', 'F8', 'F9', 'G12', 'H3', 'I18', 'J7'];
    
    for (let row = 0; row < totalRows; row++) {
      const rowLetter = String.fromCharCode(65 + row); // A, B, C, etc.
      const isVipRow = row === 5 || row === 6; // Rows F and G are VIP
      
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${rowLetter}${seat}`;
        seats.push({
          id: seatId,
          row: rowLetter,
          number: seat,
          isVip: isVipRow,
          isBooked: bookedSeats.includes(seatId)
        });
      }
    }
    return seats;
  };
  
  const seats = generateSeats();
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSeatClick = (seatId, isBooked) => {
    if (isBooked) return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };
  
  const handleProceed = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.showTiming || !formData.numberOfSeats) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Booking Details:', {
      ...formData,
      selectedSeats,
      movie: movieInfo?.name,
      movieId: movieId
    });
    alert(`Booking initiated for ${selectedSeats.length} seats!`);
  };
  
  const getSeatClass = (seat) => {
    let className = 'seat';
    if (seat.isBooked) {
      className += ' booked';
    } else if (selectedSeats.includes(seat.id)) {
      className += ' selected';
    } else {
      className += ' available';
    }
    if (seat.isVip) {
      className += ' vip';
    }
    return className;
  };

  // Error state
  if (error || (!loading && !movieInfo)) {
    return (
      <div className="booking-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error || "Movie not found"}</p>
          <button 
            onClick={() => window.history.back()} 
            className="back-btn"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* First Division - Booking Form + Movie Info */}
      <div className="booking-container">
        {/* Show FormSkeleton while loading, otherwise show actual form */}
        {loading ? (
          <FormSkeleton />
        ) : (
          <div className="form-section">
            <h2>Book Your Tickets</h2>
            <form onSubmit={handleProceed} className="booking-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="showTiming">Show Timing</label>
                <select
                  id="showTiming"
                  name="showTiming"
                  value={formData.showTiming}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select timing</option>
                  <option value="morning">Morning (10:00 AM)</option>
                  <option value="afternoon">Afternoon (2:00 PM)</option>
                  <option value="evening">Evening (6:00 PM)</option>
                  <option value="night">Night (9:30 PM)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="numberOfSeats">Number of Seats</label>
                <input
                  type="number"
                  id="numberOfSeats"
                  name="numberOfSeats"
                  value={formData.numberOfSeats}
                  onChange={handleInputChange}
                  placeholder="Enter number of seats"
                  min="1"
                  max="10"
                  required
                />
              </div>
              
              <button type="submit" className="proceed-btn">
                Proceed to Payment
              </button>
            </form>
          </div>
        )}
        
        {/* Show MovieDetailsSkeleton while loading, otherwise show actual movie info */}
        {loading ? (
          <MovieDetailsSkeleton />
        ) : (
          <div className="movie-info-section">
            <h2>Movie Information</h2>
            <div className="movie-details">
              {movieInfo.image && (
                <div className="movie-poster">
                  <img src={movieInfo.image} alt={movieInfo.name} />
                </div>
              )}
              <h3 className="movie-title">{movieInfo.name}</h3>
              <div className="movie-meta">
                <span className="genre">
                  <strong>Genre:</strong> {movieInfo.genre}
                </span>
                <span className="duration">
                  <strong>Duration:</strong> {movieInfo.duration}
                </span>
                <span className="language">
                  <strong>Language:</strong> {movieInfo.language}
                </span>
                <span className="rating">
                  <strong>Rating:</strong> {movieInfo.rating}
                </span>
                <span className="ticket-price">
                  <strong>Ticket Price:</strong> {movieInfo.ticket}
                </span>
              </div>
              <div className="theater-info">
                <strong>Theater:</strong> {movieInfo.theater}
              </div>
              <div className="movie-about">
                <h4>About the Movie</h4>
                <p>{movieInfo.about}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Second Division - Seat Blueprint */}
      <div className="seat-selection-section">
        {loading ? (
          <SeatSkeleton />
        ) : (
          <div className="seat-selection-container">
            <h2>Select Your Seats</h2>
            <div className="screen-indicator">
              <div className="screen">SCREEN</div>
            </div>
            
            <div className="seats-grid">
              {Array.from({ length: 12 }, (_, rowIndex) => {
                const rowLetter = String.fromCharCode(65 + rowIndex);
                const rowSeats = seats.filter(seat => seat.row === rowLetter);
                const isVipRow = rowIndex === 5 || rowIndex === 6;
                
                return (
                  <div key={rowLetter} className={`seat-row ${isVipRow ? 'vip-row' : ''}`}>
                    <div className="row-label">{rowLetter}</div>
                    <div className="seats-in-row">
                      {rowSeats.map((seat) => (
                        <div
                          key={seat.id}
                          className={getSeatClass(seat)}
                          onClick={() => handleSeatClick(seat.id, seat.isBooked)}
                          title={seat.isBooked ? 'Booked' : `Seat ${seat.id}`}
                        >
                          {seat.isBooked ? <span className="booked-icon">❌</span> : seat.number}
                        </div>
                      ))}
                    </div>
                    <div className="row-label">{rowLetter}</div>
                  </div>
                );
              })}
            </div>
            
            <div className="seat-legend">
              <div className="legend-item">
                <div className="seat available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="seat selected"></div>
                <span>Selected</span>
              </div>
              <div className="legend-item">
                <div className="seat booked"></div>
                <span>Booked</span>
              </div>
              <div className="legend-item">
                <div className="seat vip available"></div>
                <span>VIP</span>
              </div>
            </div>
            
            {selectedSeats.length > 0 && (
              <div className="selected-seats-info">
                <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
                <p>Total: {selectedSeats.length} seat(s)</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;