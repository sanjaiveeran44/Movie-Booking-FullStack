import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking", { state: { movieId: movie.id } });
  };

  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.name} />
      <div className="movie-info">
        <h3>{movie.name}</h3>
        <p><b>Theatre:</b> {movie.theater}</p>
        <p><b>Ticket:</b> {movie.ticket}</p>
        <p className="rating"><b>Rating:</b> {movie.rating}</p>
        <button className="btn" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
}