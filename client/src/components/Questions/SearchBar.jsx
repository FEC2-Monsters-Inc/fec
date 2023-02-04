import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBar({
  text,
  handleChange,
}) {
  return (
    <div className="qa search">
      <input
        className="qa"
        id="question-search"
        aria-label="Search Question"
        type="search"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      />
      <AiOutlineSearch className="qa search-icon" />
    </div>
  );
}
