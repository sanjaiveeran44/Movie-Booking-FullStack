import React from "react";
import "./MovieCard.css"
export default function LoadingCard() {
  return (
    <div className="movie-card skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="movie-info">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-btn"></div>
      </div>
    </div>
  );
}
