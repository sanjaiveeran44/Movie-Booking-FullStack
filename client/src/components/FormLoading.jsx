import React from 'react';
import './FormLoading.css';

const FormSkeleton = () => {
  return (
    <div className="form-section">
      <h2>Book Your Tickets</h2>
      <div className="booking-form-skeleton">
        <div className="form-group-skeleton">
          <div className="skeleton-box label-skeleton"></div>
          <div className="skeleton-box input-skeleton"></div>
        </div>
        
        <div className="form-group-skeleton">
          <div className="skeleton-box label-skeleton"></div>
          <div className="skeleton-box select-skeleton"></div>
        </div>
        
        <div className="form-group-skeleton">
          <div className="skeleton-box label-skeleton"></div>
          <div className="skeleton-box input-skeleton"></div>
        </div>
        
        <div className="button-skeleton-container">
          <div className="skeleton-box button-skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;