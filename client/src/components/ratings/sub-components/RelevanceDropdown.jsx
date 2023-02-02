import React, { useState, useEffect } from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

export default function RelevanceDropdown({
  setReviews, reviews, listLength, listIndex, reviewRenderer,
}) {
  // STATE DATA //
  const [display, setDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortString, setSortString] = useState('relevance');

  // EVENT HANDLERS //
  const handleClick = () => {
    setShowDropdown(true);
  };
  const handleClose = (e) => {
    if (e.target.className !== 'review-close-dropdown') {
      setShowDropdown(false);
    }
  };
  // SORT HELPER FUNCTIONS //
  const handleNew = () => {
    const sortByDate = (data) => data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const onPage = sortByDate(reviews.slice(0, listIndex));
    setReviews(onPage.concat(reviews.slice(listIndex)));
    setShowDropdown(false);
    setSortString('recency');
  };
  const handleHelpful = () => {
    const sortByHelp = (data) => data.sort((a, b) => (b.helpfulness) - (a.helpfulness));
    const onPage = sortByHelp(reviews.slice(0, listIndex));
    setReviews(onPage.concat(reviews.slice(listIndex)));
    setShowDropdown(false);
    setSortString('helpful');
  };
  const handleRelevant = () => {
    const sortByRelevancy = (data) => data.sort((a, b) => {
      if (b.helpfulness > 20) {
        return (b.helpfulness) - (a.helpfulness);
      }
      if (new Date(b.date) - new Date(a.date) === 0) {
        return (b.helpfulness) - (a.helpfulness);
      }
      return new Date(b.date) - new Date(a.date);
    });
    const onPage = sortByRelevancy(reviews.slice(0, listIndex));
    setReviews(onPage.concat(reviews.slice(listIndex)));
    setShowDropdown(false);
    setSortString('relevance');
  };

  // OTHER HELPER FUNCTIONS //
  const reviewListLength = () => {
    if (!listLength) {
      return reviews.slice(0, listIndex).length;
    }
    return listLength;
  };

  // INITIALIZATION //
  useEffect(() => {
    if (reviews) {
      setDisplay(true);
      reviewRenderer(reviews);
    }
    document.addEventListener('click', handleClose);
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
            <span
              onClick={handleClick}
              onKeyPress={handleClick}
              tabIndex="0"
              role="button"
              style={{ textDecoration: 'underline' }}
              className="review-close-dropdown"
            >
              {sortString}
              <VscTriangleDown onClick={handleClick} className="review-close-icon" />
            </span>
          </p>
        )
        : null }
      {showDropdown && (
        <div className="review-sort-dropdown-child">
          <ul className="review-ul">
            { sortString !== 'recency'
              ? (
                <li>
                  <div
                    className="review-li-1"
                    onClick={() => handleNew()}
                    onKeyPress={() => handleNew()}
                    tabIndex="0"
                    role="button"
                  >
                    recency
                  </div>
                </li>
              )
              : null }
            { sortString !== 'helpfulness'
              ? (
                <li>
                  <div
                    className="review-li-2"
                    onClick={() => handleHelpful()}
                    onKeyPress={() => handleHelpful()}
                    tabIndex="0"
                    role="button"
                  >
                    helpfulness
                  </div>
                </li>
              )
              : null }
            { sortString !== 'relevance'
              ? (
                <li>
                  <div
                    className="review-li-3"
                    onClick={() => handleRelevant()}
                    onKeyPress={() => handleRelevant()}
                    tabIndex="0"
                    role="button"
                  >
                    relevance
                  </div>
                </li>
              )
              : null }
          </ul>
        </div>
      )}
    </div>
  );
}
