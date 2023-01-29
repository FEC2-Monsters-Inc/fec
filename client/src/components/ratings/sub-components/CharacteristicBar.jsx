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
    <div className="characteristic-rating-bar-parent">
      <div className="characteristic-bar-child" style={{width: 50 + '%'}}>
        {console.log(barWidth)}
      </div>
    </div>
  );
}