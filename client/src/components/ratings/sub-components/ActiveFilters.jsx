import React, { useState, useEffect } from 'react';

export default function ActiveFilters({ selectedRating, setSelectedRating }) {
  // STATE DATA //
  const [filterStrings, setFilterStrings] = useState('');

  // HELPER FUNCTIONS //
  function filterJoiner() {
    return filterStrings.join(' ').replace(/[,\s]+$/, '');
  }

  function handleFilterStrings() {
    console.log('selected: ', selectedRating);
    const newFilterStrings = [];
    Object.keys(selectedRating).forEach((key) => {
      newFilterStrings.push(`${key} star, `);
    });
    setFilterStrings(filterJoiner(newFilterStrings));
  }

  // EVENT HANDLERS //
  function filterReset() {
    setSelectedRating(null);
    setFilterStrings(null);
  }

  // INITIALIZATION //
  useEffect(() => {
    if (selectedRating) {
      handleFilterStrings();
    }
  }, [selectedRating]);

  return (
    <div className="review-active-filter-container" style={{ height: '37px' }}>
      { filterStrings.length
        ? `Reviews Displayed: ${filterStrings}`
        : null }
      <button type="button" onClick={() => filterReset()}>Reset Filters</button>
    </div>
  );
}
