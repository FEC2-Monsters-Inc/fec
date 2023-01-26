import React, {useState, useEffect} from 'react';


export default function ReviewDashboard({reviews}) {

  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let review of reviews) {
      total += review.rating;
    }
    if (reviews.length > 0) {
      setAvgRating(total / reviews.length);
    }
  }, [reviews]);


  return (
    <div>
      Average Rating: {avgRating} Stars
    </div>
  );
}