import React, {useState, useEffect} from 'react';
import Star from '../images/star.png';

export default function ReviewDashboard({reviews}) {

  const [avgRating, setAvgRating] = useState(0);
  const [stars, setStars] = useState([]);

  const ratingSetter = function() {
    let total = 0;
    for (let review of reviews) {
      total += review.rating;
    }
    if (reviews.length > 0) {
      setAvgRating(total / reviews.length);
      starRating(total / reviews.length);
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
          <img className="review-single-star-outline" src={Star} alt="stars alt"></img>
        </div>
      </div>
    );
  });


  useEffect(() => {
    ratingSetter();
  }, [reviews]);


  return (
    <div>
      <div>
        {starMapper}
      </div>
      Average Rating: {avgRating} Stars
    </div>
  );
}