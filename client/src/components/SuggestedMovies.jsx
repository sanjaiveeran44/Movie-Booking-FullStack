import React, { useEffect, useState } from "react";
import "./SuggestedMovies.css";
import { FaArrowRight } from "react-icons/fa";

// ✅ Make sure these filenames exist exactly as typed:
import MovieCard from "./MovieCard";
import LoadingCard from "./LoadingCard";

export default function Suggested() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setMovies(data);
          setLoading(false);
        }, 2500);
      })
      .catch(err => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="movie-section">
      <h2 className="section-title">
        <span className="now">Now</span> <span className="showing">Showing</span>
      </h2>

      <div className="movie-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <LoadingCard key={i} />)
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

        {!loading && (
          <div className="view-all-card">
            <button className="btn view-all">
              More <FaArrowRight className="arrow-icon" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
