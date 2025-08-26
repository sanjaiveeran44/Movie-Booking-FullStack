import React, { useState, useEffect } from 'react';
import './MovieSlider.css';

const MovieSlider = ({ movies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [movies.length]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? movies.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === movies.length - 1 ? 0 : currentIndex + 1);
  };

  if (movies.length === 0) {
    return (
      <div className="movie-slider-container">
        <div className="movie-slider-empty">
          <p>No movies available</p>
        </div>
      </div>
    );
  }

  // Get visible movies (previous, current, next)
  const getVisibleMovies = () => {
    const visibleMovies = [];
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i;
      if (index < 0) index = movies.length - 1;
      if (index >= movies.length) index = 0;
      visibleMovies.push({ ...movies[index], position: i });
    }
    return visibleMovies;
  };

  const visibleMovies = getVisibleMovies();

  return (
    <div className="movie-slider-container">
      <div className="movie-slider">
        <div className="movie-cards-wrapper">
          {visibleMovies.map((movie, index) => (
            <div
              key={`${movie.id}-${currentIndex}-${index}`}
              className={`movie-card ${
                movie.position === 0 ? 'center' : 
                movie.position === -1 ? 'left' : 'right'
              }`}
            >
              <div className="movie-poster">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=';
                  }}
                />
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                {movie.rating && (
                  <div className="movie-rating">
                    <span className="rating-star">★</span>
                    <span className="rating-value">{movie.rating}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="nav-arrow nav-arrow-left" 
          onClick={goToPrevious}
          aria-label="Previous movie"
        >
          ‹
        </button>
        <button 
          className="nav-arrow nav-arrow-right" 
          onClick={goToNext}
          aria-label="Next movie"
        >
          ›
        </button>

        {/* Dots Navigation */}
        <div className="movie-slider-dots">
          {movies.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to movie ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;