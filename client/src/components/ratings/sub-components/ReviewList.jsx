import React, {useState, useEffect} from 'react';
import ReviewTile from './ReviewTile.jsx';

export default function ReviewList({reviews, selectedRating}) {

  // consider using hook to track length of current reviews
  const [numReviews, setNumReviews] = useState(reviews.length);
  // TESTING W BOLTON //


  const reviewMapper = reviews.map((review, index) =>
    <ReviewTile review={review} key={index}/>
  );

  const filterReviewMapper = () => {
    const filteredReviews = reviews.filter(review => selectedRating[review.rating] === true);
    if (filteredReviews.length === 0) {
      //setNumReviews(reviewMapper.length);
      return reviewMapper;
    } else {
      //setNumReviews(filteredReviews.length);
      return filteredReviews.map((review, index) =>
        <ReviewTile review={review} key={index}/>
      );
    }
  };

  const numReviewsTracker = function() {
    let trueKeys = Object.keys(selectedRating).filter(key => selectedRating[key] === true).map(Number);
    let filteredArr = reviews.filter(review => trueKeys.includes(review.rating));
    //console.log(filteredArr)
    if (filteredArr.length === 0) {
      //console.log('test')
      setNumReviews(reviews.length); //FIX HARD CODED SOLUTION
      return;
    }
    setNumReviews(filteredArr.length);
  };

  useEffect(() => {
    numReviewsTracker();
  }, [selectedRating, reviews]);


  return (
    <div className="review-list-container">
      <p>{numReviews} reviews, sorted by relevance</p>
      {filterReviewMapper()}
    </div>
  );
}
