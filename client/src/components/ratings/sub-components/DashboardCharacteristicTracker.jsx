import React, { useState, useEffect } from 'react';
import CharacteristicBar from './CharacteristicBar.jsx';

export default function CharacteristicTracker({ reviewMeta }) {
  const charTrackerMapper = () => {
    const components = [];
    if (reviewMeta.characteristics) {
      Object.keys(reviewMeta.characteristics).forEach((key) => {
        const keyVal = reviewMeta.characteristics[key].id;
        components.push(
          <div key={keyVal}>
            <p>{key}</p>
            <CharacteristicBar
              reviewMeta={reviewMeta.characteristics[key].value}
              charName={key}
            />
          </div>,
        );
      });
    }
    return components;
  };

  return (
    <div>{console.log(reviewMeta)}
      {charTrackerMapper()}
    </div>
  );
}
