import React from 'react';
import { BsSearch } from 'react-icons/bs';

export default function ReviewSearchBar({
  reviews, searchTerm, setSearchTerm, listIndex,
}) {
  // set search term to the value of the search input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      document.querySelector('.search-container').classList.remove('active');
    } else {
      document.querySelector('.search-container').classList.add('active');
    }
  };

  return (
    <form className="review-search-container">
      <div className="search-container">
        <button className="search-button" type="button">
          <BsSearch />
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Search Reviews…"
          value={searchTerm}
          onChange={handleInputChange}
          onMouseEnter={() => document.querySelector('.search-button').classList.add('hidden')}
          onBlur={() => document.querySelector('.search-button').classList.remove('hidden')}
        />
      </div>
    </form>
  );
}

// <form onSubmit={handleSearch}>
