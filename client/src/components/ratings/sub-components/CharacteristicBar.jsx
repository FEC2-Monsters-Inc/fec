import React, { useState, useEffect } from 'react';

export default function CharacteristicBar({ reviewMeta }) {

  // Receive meta data object from parent
  // reviewMeta.characteristics is an object containing relevant info
  // iterate through object
  // map object into progress bar div thing
  const [chars, setChars] = useState({});


  const barWidth = chars ? (chars - 1) / 4 * 100 : 0;
  // const roundedRating = Math.round(chars.Size);

  useEffect(() => {
    setChars(reviewMeta);
    //console.log(chars.Size.value)
  }, [reviewMeta]);

  return (
    <div className="review-slidecontainer">
      <input type="range" min="1" max="100" value={'' + barWidth} className="slider" readOnly={true} />
      <div className="reivew-slider-label-container">
        <label className="review-slider-label-1">{charRatings.small}</label>
        <label className="review-slider-label-2">{charRatings.perf}</label>
        <label className="review-slider-label-3">{charRatings.big}</label>
      </div>
    </div>
  );
}