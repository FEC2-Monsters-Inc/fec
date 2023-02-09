import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
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
  setShowThankyou,
}) {
  // STATE DATA //
  const [reviewExpander, setReviewExpander] = useState('25rem');
  const [expandedStatus, setExpandedStatus] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);

  // HELPER FUNCTIONS //

  const getDateString = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${monthName} ${day}, ${year}`;
  };

  const reviewMapper = (reviewArray) => reviewArray.map((review) => {
    if (review.body.toLowerCase()
      .includes((searchTerm.length >= 3 ? searchTerm.toLowerCase() : '')) || review.summary.toLowerCase()
      .includes((searchTerm.length >= 3 ? searchTerm.toLowerCase() : '')) || review.reviewer_name.toLowerCase().includes((searchTerm.length >= 3 ? searchTerm.toLowerCase() : '')) || (getDateString(review.date).toLowerCase().includes((searchTerm.length >= 3 ? searchTerm.toLowerCase() : '')))) {
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

  // EVENT HANDLERS //

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

  // INITIALIZATION (dbl Check if useEffect Neccessary!)

  useEffect(() => {
    if (reviews) {
      reviewRenderer();
    }
  }, [reviews]);

  return (
    <div className="review-list-container">
      <div className="review-list-dropdown-container">
        <div className="searchbar-dropdown-container">
          <RelevanceDropdown
            setReviews={setReviews}
            reviews={reviews}
            listLength={listLength}
            setListLength={setListLength}
            listIndex={listIndex}
            reviewRenderer={reviewRenderer}
          />
          <ReviewSearchBar
            reviews={reviews}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            listIndex={listIndex}
          />

        </div>
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
      <div className="review-list-button-container">
        {
          !expandedStatus
            ? <button className="expanded-reviews" type="button" onClick={() => handleClick()}>Expand Reviews</button>
            : null
        }
        <button className="write-new-review" type="button" onClick={() => setReviewModal(true)}>Write a Review</button>
        {/* <CSSTransition nodeRef={nodeRef} in={reviewModal} timeout={5000} classNames="my-node" unmountOnExit key={reviewModal}> */}
        <CSSTransition in={reviewModal} timeout={5000} classNames="my-node" unmountOnExit>
          <ReviewModal
            setReviewModal={setReviewModal}
            feature={feature}
            reviewMeta={reviewMeta}
            setReviewMeta={setReviewMeta}
            reviews={reviews}
            setReviews={setReviews}
            setShowThankyou={setShowThankyou}
            reviewModal={reviewModal}
          />
        </CSSTransition>
        {/* </CSSTransition> */}
      </div>
    </div>
  );
}
