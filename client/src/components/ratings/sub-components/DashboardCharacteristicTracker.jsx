import React from 'react';
import CharacteristicBar from './CharacteristicBar.jsx';

export default function CharacteristicTracker({ reviewMeta }) {
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
  return (
    <div>
      {components}
    </div>
  );
}
