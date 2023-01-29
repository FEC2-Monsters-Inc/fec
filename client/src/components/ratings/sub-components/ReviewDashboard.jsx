import React, { useState, useEffect } from 'react';
import ReviewTracker from './ReviewTracker.jsx';
import CharacteristicTracker from './DashboardCharacteristicTracker.jsx';
import StarImg from '../../../../dist/assets/star.png';

export default function ReviewDashboard({
  reviews,
  setSelectedRating,
  selectedRating,
  reviewMeta,
}) {
  const [avgRating, setAvgRating] = useState(0);
  const [stars, setStars] = useState([]);
  const [recommended, setRecommended] = useState(0);
  const ratingSetter = function dynamicRating() {
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
      const percent = `${(totalRecs / reviews.length) * 100}%`;
      setRecommended(percent);
    }
  };

  const starRating = function dynamicStarRater(x) {
    const tempStars = [];
    let rating = x;
    while (tempStars.length < 5) {
      if (rating > 1) {
        tempStars.push(1);
      } else if (rating > 0) {
        const empty = Math.abs(0 - rating);
        const quart = Math.abs(0.25 - rating);
        const half = Math.abs(0.5 - rating);
        const three = Math.abs(0.75 - rating);
        const full = Math.abs(1 - rating);
        const closest = Math.min(empty, quart, half, three, full);
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
      rating -= 1;
      setStars(tempStars);
    }
  };

  const starMapper = stars.map((e, i) => (
    <div className="review-single-star-container" key={i}>
      <div className="review-single-star-fill" style={{ width: `${parseInt((e * 31), 10)}px` }}>
        <img className="review-single-star-outline" src={StarImg} alt="stars alt" />
      </div>
    </div>
  ));

  useEffect(() => {
    ratingSetter();
    recommendedSetter();
  }, [reviews]);

  const percentString = `${recommended} of reviews recommend this product`;

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
        <ReviewTracker
          reviews={reviews}
          setSelectedRating={setSelectedRating}
          selectedRating={selectedRating}
        />
      </div>
      <div>
        <CharacteristicTracker
          reviewMeta={reviewMeta}
        />
      </div>
    </div>
  );
}
