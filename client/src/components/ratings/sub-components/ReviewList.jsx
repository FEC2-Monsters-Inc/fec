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

  const [loadedReviews, setLoadedReviews] = useState(null);

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
      return reviewMapper(reviews);
    }
    const filteredReviews = reviews.filter((review) => selectedRating[review.rating] === true);
    return reviewMapper(filteredReviews);
  };

  // const twoAtATime = () => {
  //   if (loadedReviews) {
  //     setLoadedReviews(loadedReviews.slice(2));
  //     setReviews([...reviews, loadedReviews[1], loadedReviews[2]]);
  //   }
  //   //console.log(reviews);
  // };

  // INITIALIZATION //
  useEffect(() => {
    fetcher.ratings.getAllReviews(40350)
      .then(({ data }) => setLoadedReviews(data.results));
    //twoAtATime();
  }, [selectedRating, reviews]);

  return (
    <div className="review-list-container">
      <div className="review-list-dropdown-container">
        <RelevanceDropdown
          setReviews={setReviews}
          reviews={reviews}
          listLength={listLength}
          setListLength={setListLength}
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
