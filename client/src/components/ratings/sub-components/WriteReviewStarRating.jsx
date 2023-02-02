import React, { useState } from 'react';
import Star from './WriteReviewStar.jsx';

export default function WriteReviewStarRating({ onChange }) {
  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
    onChange?.(newRating);
  };

  return (
    <span>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <Star
          key={Math.random()}
          filled={index < rating}
          onClick={() => changeRating(index + 1)}
        />
      ))}
    </span>
  );
}
