import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function WriteReviewStar({
  filled, onClick, onMouseEnter, onMouseLeave,
}) {
  return (
    <FaStar
      color={filled ? 'gold' : 'lightgray'}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
