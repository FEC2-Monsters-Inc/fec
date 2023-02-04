import React, { useState } from 'react';
import WriteReviewStar from './WriteReviewStar.jsx';

export default function WriteReviewStarRating({ onChange }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [starIndex, setStarIndex] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
    onChange?.(newRating);
  };

  return (
    <span>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <WriteReviewStar
          key={Math.random()}
          filled={index < (rating || hover)}
          className={index <= (hover || rating) ? 'write-on' : 'write-off'}
          onClick={() => changeRating(index + 1)}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(rating)}
        />
      ))}
    </span>
  );
}


/*
    <span>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <WriteReviewStar
          key={Math.random()}
          filled={index < rating}
          className={index <= (hover || rating) ? 'on' : 'off'}
          onClick={() => changeRating(index + 1)}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(rating)}
        />
      ))}
    </span>
*/