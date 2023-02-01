import React from 'react';

export default function TrackerBar({ progress }) {
  const childDiv = {
    width: `${progress}%`,
  };

  return (
    <div className="review-tracker-bar-container">
      <div className="review-tracker-bar-parent">
        <div className="review-tracker-bar-child" style={childDiv} />
      </div>
    </div>
  );
}
