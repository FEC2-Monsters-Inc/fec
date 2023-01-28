import React, {useState, useEffect} from 'react';
import ReviewTracker from './DashboardReviewTracker.jsx';
import StarImg from '../../../../dist/assets/star.png';

export default function ReviewDashboard({reviews, setSelectedRating, selectedRating}) {

  const [avgRating, setAvgRating] = useState(0);
  const [stars, setStars] = useState([]);
  const [recommended, setRecommended] = useState(0);


  const ratingSetter = function() {
    let total = 0;
    for (let review of reviews) {
      total += review.rating;
    }
    if (reviews.length > 0) {
      setAvgRating((total / reviews.length).toFixed(1));
      starRating(total / reviews.length);
    }
  };

  const recommendedSetter = function() {
    let totalRecs = 0;
    for (let review of reviews) {
      if (review.recommend === true) {
        totalRecs++;
      }
    }
    if (reviews.length > 0) {
      var percent = (totalRecs / reviews.length) * 100 + '%';
      setRecommended(percent);
    }
  };

  const starRating = function(x) {
    var tempStars = [];
    let rating = x;
    while (tempStars.length < 5) {
      if (rating > 1) {
        tempStars.push(1);
      } else if (rating > 0) {
        let empty = Math.abs(0 - rating);
        let quart = Math.abs(0.25 - rating);
        let half = Math.abs(0.5 - rating);
        let three = Math.abs(0.75 - rating);
        let full = Math.abs(1 - rating);
        let closest = Math.min(empty, quart, half, three, full);
        switch (closest) {
        case (empty):
          tempStars.push(0);
          break;
        case (quart):
          tempStars.push(0.28);
          break;
        case (half):
          tempStars.push(0.5);
          break;
        case (three):
          tempStars.push(0.72);
          break;
        case (full):
          tempStars.push(1.0);
          break;
        default:
          tempStars.push(0);
          break;
        }
      } else {
        tempStars.push(0);
      }
      rating = rating - 1;
      setStars(tempStars);
    }
  };

  const starMapper = stars.map((e, i) => {
    return (
      <div className="review-single-star-container" key={i}>
        <div className="review-single-star-fill" style={{width: `${parseInt(e * 31)}px`}}>
          <img className="review-single-star-outline" src={StarImg} alt="stars alt"></img>
        </div>
      </div>
    );
  });


  useEffect(() => {
    ratingSetter();
    recommendedSetter();
  }, [reviews]);

  const percentString = recommended + ' of reviews recommend this product';

  return (
    <div>
      <div className="review-main-star-container">
        <p className="review-avg-rating">{avgRating}</p>
        <div>
          {starMapper}
        </div>
      </div>
      <div>
        {percentString}
      </div>
      <div>
        <ReviewTracker reviews={reviews} setSelectedRating={setSelectedRating} selectedRating={selectedRating}/>
      </div>
    </div>
  );
}