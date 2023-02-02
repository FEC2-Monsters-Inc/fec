import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import RelevanceDropdown from './RelevanceDropdown.jsx';
import fetcher from '../../../fetchers';

export default function ReviewList({
  reviews,
  selectedRating,
  setReviews,
  listLength,
  setListLength,
}) {
  const [loadedReviews, setLoadedReviews] = useState([]);
  const [listIndex, setListIndex] = useState(0);
  // HELPER FUNCTIONS //
  const reviewMapper = (reviewArray) => reviewArray.map((review) => (
    <ReviewTile
      review={review}
      key={review.review_id}
      reviews={reviews}
      setReviews={setReviews}
    />
  ));

  const reviewRenderer = () => {
    if (!selectedRating) {
      return reviewMapper(reviews.slice(0, listIndex));
    }
    const filteredReviews = reviews.filter((review) => selectedRating[review.rating] === true).slice(0, listIndex);
    return reviewMapper(filteredReviews);
  };

  const twoAtATime = () => {
    if (listIndex < reviews.length) {
      setListIndex(listIndex + 2);
      // setReviews(reviews.concat(loadedReviews.slice(listIndex, listIndex + 2)));
      // console.log('loaded reviews:', loadedReviews);
      // console.log('reviews:', reviews);
      // console.log('loadedReviews first two elements:', newReviews);
    }
  };

  // INITIALIZATION //
  useEffect(() => {
    // fetcher.ratings.getAllReviews(40350)
    //   .then(({ data }) => setLoadedReviews(data.results))
    //   .catch((err) => console.error(err));
    // setReviews(reviews.concat(loadedReviews.slice(listIndex, listIndex + 2)));
    setListIndex(2);
  }, []);



  return (
    <div className="review-list-container">
      <div className="review-list-dropdown-container">
        <RelevanceDropdown
          setReviews={setReviews}
          reviews={reviews}
          listLength={listLength}
          setListLength={setListLength}
          listIndex={listIndex}
        />
      </div>
      <div className="scroll-review-list">
        { reviews
          ? reviewRenderer()
          : null }
      </div>
      <div className="review-list-add-more-button">
          <button onClick={()=>twoAtATime()}>click me</button>
      </div>
    </div>
  );
}
