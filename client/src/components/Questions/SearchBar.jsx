import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBar({
  text,
  handleChange,
}) {
  return (
    <div className="qa search">
      <input
        className="qa search-input"
        name="search"
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      />
      {/* TODO: Text outline box should cover whole div,
      including the search button */}
      <AiOutlineSearch className="qa search-icon" />
    </div>
  );
}
