import React from 'react';
import './SeatLoading.css';

const SeatSkeleton = () => {
  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="screen-indicator">
        <div className="screen-skeleton">
          <div className="skeleton-box screen-text-skeleton"></div>
        </div>
      </div>
      
      <div className="seats-grid-skeleton">
        {Array.from({ length: 12 }, (_, rowIndex) => {
          const isVipRow = rowIndex === 5 || rowIndex === 6;
          
          return (
            <div key={rowIndex} className={`seat-row-skeleton ${isVipRow ? 'vip-row-skeleton' : ''}`}>
              <div className="row-label-skeleton">
                <div className="skeleton-box label-box-skeleton"></div>
              </div>
              <div className="seats-in-row-skeleton">
                {Array.from({ length: 20 }, (_, seatIndex) => (
                  <div key={seatIndex} className="seat-skeleton-box">
                    <div className={`skeleton-box seat-item-skeleton ${isVipRow ? 'vip-seat-skeleton' : ''}`}></div>
                  </div>
                ))}
              </div>
              <div className="row-label-skeleton">
                <div className="skeleton-box label-box-skeleton"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="seat-legend-skeleton">
        <div className="legend-item-skeleton">
          <div className="skeleton-box legend-seat-skeleton"></div>
          <div className="skeleton-box legend-text-skeleton"></div>
        </div>
        <div className="legend-item-skeleton">
          <div className="skeleton-box legend-seat-skeleton"></div>
          <div className="skeleton-box legend-text-skeleton"></div>
        </div>
        <div className="legend-item-skeleton">
          <div className="skeleton-box legend-seat-skeleton"></div>
          <div className="skeleton-box legend-text-skeleton"></div>
        </div>
        <div className="legend-item-skeleton">
          <div className="skeleton-box legend-seat-skeleton vip-legend-skeleton"></div>
          <div className="skeleton-box legend-text-skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default SeatSkeleton;