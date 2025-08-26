import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './UpcomingMovies.css';

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/Upcoming.json');
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Auto-slide effect every 4 seconds
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [movies.length]);

  // Get visible movies (3 at a time with infinite loop)
  const getVisibleMovies = () => {
    if (movies.length === 0) return [];

    const visibleMovies = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + movies.length) % movies.length;
      visibleMovies.push({
        ...movies[index],
        position: i, // -1 for left, 0 for center, 1 for right
      });
    }
    return visibleMovies;
  };

  // Manual navigation
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  // Animation variants
  const cardVariants = {
    center: {
      scale: 1.2,
      opacity: 1,
      filter: 'brightness(1)',
      zIndex: 3,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    side: {
      scale: 0.8,
      opacity: 0.6,
      filter: 'brightness(0.7)',
      zIndex: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <div className="upcoming-movies">
        <div className="upcoming-overlay">
          <div className="upcoming-container">
            <h2 className="upcoming-title">Upcoming Movies</h2>
            <div className="loading">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="upcoming-movies">
      <div className="upcoming-overlay">
        <div className="upcoming-container">
          <h2 className="upcoming-title">Upcoming Movies</h2>
          
          <div className="carousel-container">
            <motion.div 
              className="carousel"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                {getVisibleMovies().map((movie) => (
                  <motion.div
                    key={`${movie.id}-${currentIndex}`}
                    className={`movie-card ${movie.position === 0 ? 'center' : 'side'}`}
                    variants={cardVariants}
                    animate={movie.position === 0 ? 'center' : 'side'}
                    style={{
                      transform: `translateX(${movie.position * 100}px)`,
                    }}
                  >
                    <div className="movie-poster-container">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="movie-poster"
                        loading="lazy"
                      />
                      <div className="movie-info-overlay">
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-release">
                          {new Date(movie.release).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Navigation buttons */}
            <button 
              className="nav-btn prev-btn" 
              onClick={goToPrev}
              aria-label="Previous movie"
            >
              &#8249;
            </button>
            <button 
              className="nav-btn next-btn" 
              onClick={goToNext}
              aria-label="Next movie"
            >
              &#8250;
            </button>
          </div>

          {/* Dots indicator */}
          <div className="dots-container">
            {movies.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to movie ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovies;