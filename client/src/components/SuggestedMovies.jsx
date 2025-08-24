import React, { useEffect, useState } from "react";
import "./SuggestedMovies.css";
import { FaArrowRight } from "react-icons/fa";

export default function Suggested() {
  const [movies, setMovies] = useState([]);

  // Fetch data from JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Error fetching movies:", err));
  }, []);

  return (
    <section className="movie-section">
         <h2 className="section-title">
          <span className="now">Now</span> <span className="showing">Showing</span>
        </h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.name} />
            <div className="movie-info">
              <h3>{movie.name}</h3>
              <p><b>Theatre:</b> {movie.theater}</p>
              <p><b>Ticket:</b> {movie.ticket}</p>
              <p className="rating"><b>Rating:</b> {movie.rating}</p>
              <button className="btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all-card">
        <button className="btn view-all">
            View All <FaArrowRight className="arrow-icon" />
        </button>
      </div>  
    </section>
  );
}
