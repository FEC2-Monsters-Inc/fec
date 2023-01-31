import React, { useState } from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import fetcher from '../../../fetchers';

export default function RelevanceDropdown({ setReviews, reviews }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortString, setSortString] = useState('relevance');

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleNew = () => {
    fetcher.ratings.getReviewsSortedNew(40348) // PLACEHOLDER VALUE
      .then(({ data }) => setReviews(data.results))
      .then(() => setShowDropdown(false))
      .then(() => setSortString('date'))
      .catch((error) => console.log(error));
  };
  const handleHelpful = () => {
    fetcher.ratings.getReviewsSortedHelpful(40348) // PLACEHOLDER VALUE
      .then(({ data }) => setReviews(data.results))
      .then(() => setShowDropdown(false))
      .then(() => setSortString('helpfulness'))
      .catch((error) => console.log(error));
  };
  const handleRelevant = () => {
    fetcher.ratings.getReviews(40348) // PLACEHOLDER VALUE
      .then(({ data }) => setReviews(data.results))
      .then(() => setShowDropdown(false))
      .then(() => setSortString('relevance'))
      .catch((error) => console.log(error));
  };

  return (
    <div className="review-sort-dropdown-main">
      {reviews.length} reviews sorted by <span onClick={handleClick}>{sortString} <VscTriangleDown style={{display: 'inline-block', position: 'absolute'}}/></span>
      {showDropdown && (
        <div className="review-sort-dropdown-child">
          <ul className="review-ul">
            <li className="review-li-1" onClick={() => handleNew()}>Most Recent</li>
            <li className="review-li-2" onClick={() => handleHelpful()}>Highest Rated</li>
            <li className="review-li-3" onClick={() => handleRelevant()}>Most Relevant</li>
          </ul>
        </div>
      )}
    </div>
  );
};