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
  const [listIndex, setListIndex] = useState(2);
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

  const twoAtATime = () => {
    if (loadedReviews) {
      // setReviews([...reviews, loadedReviews.slice(listIndex, listIndex + 2)]);
      setListIndex(listIndex + 2);
      //setReviews(reviews.push(loadedReviews[listIndex], loadedReviews[listIndex + 1]));
      setReviews(reviews.concat(loadedReviews.slice(listIndex, listIndex + 2)));
      // console.log('loaded reviews:', loadedReviews);
      // console.log('reviews:', reviews);
      // console.log('loadedReviews first two elements:', newReviews);
    }
  };

  // INITIALIZATION //
  useEffect(() => {
    fetcher.ratings.getAllReviews(40350)
      .then(({ data }) => setLoadedReviews(data.results))
      .then(() => console.log(loadedReviews))
      .catch((err) => console.error(err));
  }, []);



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
