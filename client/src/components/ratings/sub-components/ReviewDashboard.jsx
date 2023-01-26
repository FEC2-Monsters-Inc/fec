import React, {useState, useEffect} from 'react';


export default function ReviewDashboard({reviews}) {

  const [avgRating, setAvgRating] = useState(0);

  const ratingSetter = function() {
    let total = 0;
    for (let review of reviews) {
      total += review.rating;
    }
    if (reviews.length > 0) {
      setAvgRating(total / reviews.length);
    }
  };

  const starRating = function() {
    let rating = avgRating;
    let stars = [];
    while (stars.length < 5) {
      if (rating > 1) {
        stars.push(1);
      } else if (rating > 0) {
        let empty = Math.abs(0 - rating);
        let quart = Math.abs(0.25 - rating);
        let half = Math.abs(0.5 - rating);
        let three = Math.abs(0.75 - rating);
        let full = Math.abs(1 - rating);
        let closest = Math.min(empty, quart, half, three, full);
        switch (closest) {
        case (empty):
          stars.push(0);
          break;
        case (quart):
          stars.push(0.25);
          break;
        case (half):
          stars.push(0.5);
          break;
        case (three):
          stars.push(0.75);
          break;
        case (full):
          stars.push(1.0);
          break;
        default:
          stars.push(0);
          break;
        }
      } else {
        stars.push(0);
      }
      rating = rating - 1;
    }
  };

  // const starMapper = stars


  useEffect(() => {
    ratingSetter();
  }, [reviews]);


  return (
    <div>
      <div>

      </div>
      Average Rating: {avgRating} Stars
    </div>
  );
}