import React, { useState, useEffect } from 'react';

export default function ActiveFilters({ selectedRating, setSelectedRating }) {
  const [filterStrings, setFilterStrings] = useState([]);
  function handleFilterStrings() {
    const newFilterStrings = [];
    Object.keys(selectedRating).forEach((key) => {
      if (selectedRating[key]) {
        newFilterStrings.push(`${key} star, `);
      }
    });
    setFilterStrings(newFilterStrings);
  }

  useEffect(() => {
    handleFilterStrings();
  }, [selectedRating]);
  function filterJoiner() {
    return filterStrings.join(' ').replace(/[,\s]+$/, '');
  }
  function filterReset() {
    setSelectedRating({
      1: false, 2: false, 3: false, 4: false, 5: false,
    });
    setFilterStrings([]);
  }
  function filterResetButton() {
    return (
      <button type="button" onClick={() => filterReset()}>Reset Filters</button>
    );
  }

  return (
    <div className="review-active-filter-container">
      {filterStrings.length !== 0 ? `Reviews Displayed: ${filterJoiner()}` : <div style={{ height: '37px' }} />}
      <div>
        {filterStrings.length !== 0 ? filterResetButton() : null }
      </div>
    </div>
  );
}
