import React from 'react';
import './MovieDetailLoading.css';

const MovieDetailsSkeleton = () => {
  return (
    <div className="movie-info-section">
      <h2>Movie Information</h2>
      <div className="movie-details">
        <div className="movie-poster-skeleton">
          <div className="skeleton-box poster-skeleton"></div>
        </div>
        <div className="movie-title-skeleton">
          <div className="skeleton-box title-skeleton"></div>
        </div>
        <div className="movie-meta-skeleton">
          <div className="skeleton-box meta-item-skeleton"></div>
          <div className="skeleton-box meta-item-skeleton"></div>
          <div className="skeleton-box meta-item-skeleton"></div>
          <div className="skeleton-box meta-item-skeleton"></div>
          <div className="skeleton-box meta-item-skeleton"></div>
        </div>
        <div className="theater-info-skeleton">
          <div className="skeleton-box theater-skeleton"></div>
        </div>
        <div className="movie-about-skeleton">
          <div className="skeleton-box about-title-skeleton"></div>
          <div className="skeleton-box about-text-skeleton line-1"></div>
          <div className="skeleton-box about-text-skeleton line-2"></div>
          <div className="skeleton-box about-text-skeleton line-3"></div>
          <div className="skeleton-box about-text-skeleton line-4"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;