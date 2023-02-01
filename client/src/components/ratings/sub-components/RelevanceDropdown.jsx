import React, { useState, useEffect } from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import fetcher from '../../../fetchers';

export default function RelevanceDropdown({ setReviews, reviews, listLength, setListLength }) {
  // STATE DATA //
  const [display, setDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortString, setSortString] = useState('relevance');

  // EVENT HANDLERS //
  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  // HTTP REQUEST HANDLERS //
  const handleNew = (id) => {
    fetcher.ratings.getReviewsSortedNew(40350) // productID - currently a placeholder
      .then(({ data }) => setReviews(data.results))
      .then(() => setShowDropdown(false))
      .then(() => setSortString('recency'))
      .catch((error) => console.error('error fetching newest: ', error));
  };
  const handleHelpful = (id) => {
    fetcher.ratings.getReviewsSortedHelpful(40350) // productID - currently a placeholder
      .then(({ data }) => setReviews(data.results))
      .then(() => setShowDropdown(false))
      .then(() => setSortString('helpfulness'))
      .catch((error) => console.error('error fetching helpful: ', error));
  };
  const handleRelevant = (id) => {
    fetcher.ratings.getReviews(40350) // productID - currently a placeholder
      .then(({ data }) => setReviews(data.results))
      .then(() => setShowDropdown(false))
      .then(() => setSortString('relevance'))
      .catch((error) => console.error('error fetching relevant: ', error));
  };

  // HELPER FUNCTIONS //
  const reviewListLength = () => {
    if (!listLength) {
      return reviews.length;
    }
    return listLength;
  };

  // INITIALIZATION //
  useEffect(() => {
    if (reviews) {
      setDisplay(true);
    }
    console.log(listLength)
  }, [reviews, listLength]);

  return (
    <div className="review-sort-dropdown-main">
      { display
        ? (
          <p className="review-sort-title">
            {reviewListLength()}
            {' '}
            reviews sorted by
            {' '}
            <span onClick={handleClick} style={{ textDecoration: 'underline' }}>
              {sortString}
              <VscTriangleDown style={{ display: 'inline-block', position: 'absolute' }} />
            </span>
          </p>
        )
        : null }
      {showDropdown && (
        <div className="review-sort-dropdown-child">
          <ul className="review-ul">
            { sortString !== 'recency'
              ? <li className="review-li-1" onClick={() => handleNew()}>recency</li>
              : null }
            { sortString !== 'helpfulness'
              ? <li className="review-li-2" onClick={() => handleHelpful()}>helpfulness</li>
              : null }
            { sortString !== 'relevance'
              ? <li className="review-li-3" onClick={() => handleRelevant()}>relevance</li>
              : null }
          </ul>
        </div>
      )}
    </div>
  );
}
