import React, { useState, useEffect } from 'react';

export default function CharacteristicBar({ reviewMeta, charName }) {
  // STATE DATA //
  // STATE DATA //
  const [chars, setChars] = useState({});
  const [sliderText, setSliderText] = useState({ small: '', perf: '', big: '' });
  const barWidth = chars ? ((chars - 1) / 4) * 100 : 0;


  // HELPER FUNCTIONS //
  function ratingDescription() {
    if (charName === 'Size') {
      setSliderText({ small: 'tight', perf: 'perfect!', big: 'baggy' });
    } else if (charName === 'Width') {
      setSliderText({ small: 'small', perf: 'perfect!', big: 'loose' });
    } else if (charName === 'Comfort') {
      setSliderText({ small: 'can\'t breathe', perf: 'perfect!', big: 'like a tent' });
    } else if (charName === 'Quality') {
      setSliderText({ small: 'cheap', perf: 'perfect!', big: 'delicate' });
    } else if (charName === 'Fit') {
      setSliderText({ small: 'small', perf: 'perfect!', big: 'large' });
    } else if (charName === 'Length') {
      setSliderText({ small: 'too long', perf: 'perfect!', big: 'too short' });
    }
  }


  // INITIALIZATION //
  useEffect(() => {
    setChars(reviewMeta);
    ratingDescription();
  }, [reviewMeta, charName]);

  return (
    <div className="review-slide-container">
      <input type="range" min="1" max="100" value={`${barWidth}`} className="review-slider" readOnly />
      <div className="reivew-slider-label-container">
        <p className="review-slider-label-1">{sliderText.small}</p>
        <p className="review-slider-label-2">{sliderText.perf}</p>
        <p className="review-slider-label-3">{sliderText.big}</p>
      </div>
    </div>
  );
}
