import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import RelevanceDropdown from './RelevanceDropdown.jsx';
import ReviewModal from './ReviewModal.jsx';
import ReviewSearchBar from './ReviewSearchBar.jsx';

export default function ReviewList({
  reviews,
  selectedRating,
  setReviews,
  listLength,
  setListLength,
  listIndex,
  setListIndex,
  feature,
  reviewMeta,
  setReviewMeta,
}) {
  // STATE DATA //
  const [reviewExpander, setReviewExpander] = useState('25rem');
  const [expandedStatus, setExpandedStatus] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (reviews) {
      reviewRenderer();
    }
  }, [reviews]);

  // HELPER FUNCTIONS //
  const reviewMapper = (reviewArray) => reviewArray.map((review) => {
    if (review.body
      .includes(searchTerm) || review.summary
      .includes(searchTerm) || review.reviewer_name.includes(searchTerm)) {
      // apply <b> tag to text in "review-tile-body" that matches search term
      return (
        <ReviewTile
          review={review}
          key={review.review_id}
          reviews={reviews}
          setReviews={setReviews}
          feature={feature}
          searchTerm={searchTerm}
        />
      );
    }
    return null;
  });

  const reviewRenderer = () => {
    if (!selectedRating) {
      return reviewMapper(reviews.slice(0, listIndex));
    }
    const filteredReviews = reviews
      .slice(0, listIndex).filter((review) => selectedRating[review.rating] === true);
    return reviewMapper(filteredReviews);
  };

  const twoAtATime = () => {
    if (reviews.length - listIndex === 1) {
      setListIndex(listIndex + 1);
    }
    if (listIndex < reviews.length) {
      setListIndex(listIndex + 2);
    }
  };

  const handleScroll = (e) => {
    const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop)
     === Math.round(e.currentTarget.clientHeight);
    if (bottom) {
      twoAtATime(); // investigate for proper GET after POST
    }
  };

  const handleClick = () => {
    twoAtATime();
    setReviewExpander('50rem');
    setExpandedStatus(true);
  };

  return (
    <div className="review-list-container">
      <div className="review-list-dropdown-container">
        <RelevanceDropdown
          setReviews={setReviews}
          reviews={reviews}
          listLength={listLength}
          setListLength={setListLength}
          listIndex={listIndex}
          reviewRenderer={reviewRenderer}
        />
      </div>
      <div
        className="scroll-review-list"
        onScroll={(e) => handleScroll(e)}
        style={{ height: reviewExpander }}
      >
        { reviews
          ? reviewRenderer()
          : null }
      </div>
      <div>
        {
          !expandedStatus
            ? <button type="button" onClick={() => handleClick()}>Expand Reviews</button>
            : null
        }
      </div>
      <div>
        <button type="button" onClick={() => setReviewModal(true)}>Write a Review</button>
        {
          reviewModal
            ? (
              <ReviewModal
                setReviewModal={setReviewModal}
                feature={feature}
                reviewMeta={reviewMeta}
                setReviewMeta={setReviewMeta}
                reviews={reviews}
                setReviews={setReviews}
              />
            )
            : null
        }
      </div>
      <div>
        <ReviewSearchBar
          reviews={reviews}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          listIndex={listIndex}
        />
      </div>
    </div>
  );
}
