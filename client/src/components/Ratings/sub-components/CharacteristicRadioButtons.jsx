import React from 'react';

export default function characteristicRadioButtons({ reviewMeta, setSubmitReview, submitReview }) {
  const RadioButtonRow = () => Object.keys(reviewMeta.characteristics).map((characteristic) => (
    <div className="review-radio-row-container">
      <div className="radio-row-title">{characteristic}</div>
      {[1, 2, 3, 4, 5].map((number) => (
        <div className="review-characteristics-modal-container">
          <div style={{width: '75px'}}>
            <label className="write-review-modal-label" htmlFor={characteristic}>
              {characteristicMapper(characteristic)[number - 1]}
            </label>
            <input
              type="radio"
              name={characteristic}
              value={number}
              onChange={()=>characteristicHandler(characteristic, number)}
              key={number}
              id={number + characteristic}
              className="write-review-characteristics-modal"
            />
          </div>
        </div>
      ))}
    </div>
  ));

  const characteristicHandler = (char, val) => {
    setSubmitReview({
      ...submitReview,
      characteristics: {
        ...submitReview.characteristics,
        [char]: val,
      },
    });
  };

  const characteristicMapper = (x) => {
    if (x === 'Size') {
      return ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'];
    }
    if (x === 'Width') {
      return ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
    }
    if (x === 'Fit') {
      return ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs too long'];
    }
    if (x === 'Length') {
      return ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
    }
    if (x === 'Comfort') {
      return ['Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect'];
    }
    if (x === 'Quality') {
      return ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
    }
    return null;
  };


  return (
    <>
      {RadioButtonRow()}
    </>
  );
}
