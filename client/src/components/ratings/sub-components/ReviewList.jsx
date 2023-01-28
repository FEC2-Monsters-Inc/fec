import React from 'react';
import ReviewTile from './ReviewTile.jsx';

export default function ReviewList({reviews, selectedRating}) {

  // consider using hook to track length of current reviews
  //const [numReviews, setNumReviews] = useState(reviews.length);

  const reviewMapper = reviews.map((review, index) =>
    <ReviewTile review={review} key={index}/>
  );

  const filterReviewMapper = () => {
    const filteredReviews = reviews.filter(review => selectedRating[review.rating] === true);
    if (filteredReviews.length === 0) {
      return reviewMapper;
    } else {
      return filteredReviews.map((review, index) =>
        <ReviewTile review={review} key={index}/>
      );
    }
  };


  return (
    <div className="review-list-container">
      <p>{reviews.length} reviews, sorted by relevance</p>
      {filterReviewMapper()}
      <div>
        {console.log(document.getElementsByClassName('review-list-container'))}
      </div>
    </div>
  );
}
