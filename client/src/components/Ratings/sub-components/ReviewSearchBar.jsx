import React, { useState, useEffect } from 'react';

export default function ReviewSearchBar({
  reviews, searchTerm, setSearchTerm, listIndex,
}) {
  // const [searchResults, setSearchResults] = useState([]);

  // set search term to the value of the search input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // search through the reviews and add the search results to the state
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchTerm.length >= 3) {
  //     const results = reviews.slice(0, listIndex).filter((review) => {
  //       const { body, summary, reviewer_name } = review;
  //       return body.replace(searchTerm, `<span class="highlight">${searchTerm}</span>`) || summary.replace(searchTerm, `<span class="highlight">${searchTerm}</span>`) || reviewer_name.replace(searchTerm, `<span class="highlight">${searchTerm}</span>`);
  //     });
  //     setSearchResults(results);
  //   }
  // };

  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search reviews..."
      />
      <button type="submit">Search</button>

    </form>
  );
}

// <form onSubmit={handleSearch}>
