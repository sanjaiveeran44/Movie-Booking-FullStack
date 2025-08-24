import React from "react";
import "./MovieCard.css"
export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.name} />
      <div className="movie-info">
        <h3>{movie.name}</h3>
        <p><b>Theatre:</b> {movie.theater}</p>
        <p><b>Ticket:</b> {movie.ticket}</p>
        <p className="rating"><b>Rating:</b> {movie.rating}</p>
        <button className="btn">Book Now</button>
      </div>
    </div>
  );
}
