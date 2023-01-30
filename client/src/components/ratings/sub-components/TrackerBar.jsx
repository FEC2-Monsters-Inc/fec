import React from 'react';

export default function TrackerBar({ progress }) {
  const childDiv = {
    width: `${progress}%`,
  };

  return (
    <div className="review-tracker-bar-container">
      <div className="review-tracker-bar-parent">
        <div className="review-tracker-bar-child" style={childDiv}>
          <span className="review-tracker-bar-percent">{`${progress}%`}</span>
        </div>
      </div>
    </div>
  );
}
