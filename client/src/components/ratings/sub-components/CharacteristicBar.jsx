import React, { useState, useEffect } from 'react';

export default function CharacteristicBar({ reviewMeta, characteristicName }) {

  const [chars, setChars] = useState({});
  const [charRatings, setCharRatings] = useState({
    small: 'too small',
    perf: 'perfect!',
    big: 'too big'
  });

  const barWidth = chars ? (chars - 1) / 4 * 100 : 0;

  const labelSetter = function() {
    if (characteristicName === 'Size') {
      setCharRatings({small: 'runs small', perf: 'perfect!', big: 'runs large'});
    } else if (characteristicName === 'Width') {
      setCharRatings({small: 'can\'t breathe', perf: 'perfect!', big: 'like a tent'});
    } else if (characteristicName === 'Comfort') {
      setCharRatings({small: 'too baggy', perf: 'perfect!', big: 'too large'});
    } else if (characteristicName === 'Quality') {
      setCharRatings({small: 'cheap', perf: 'flawless', big: 'substandard'});
    } else if (characteristicName === 'Length') {
      setCharRatings({small: 'too short', perf: 'perfect!', big: 'too long'});
    } else if (characteristicName === 'Fit') {
      setCharRatings({small: 'too tight', perf: 'perfect!', big: 'too loose'});
    }
  };

  useEffect(() => {
    setChars(reviewMeta);
    labelSetter();
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