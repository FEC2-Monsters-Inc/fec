import React, { useState, useEffect } from 'react';
import CharacteristicBar from './CharacteristicBar.jsx';

export default function CharacteristicTracker({ reviewMeta }) {
  // STATE DATA //
  const [components, setComponents] = useState(false);

  // HELPER FUNCTIONS //
  const renderSlider = () => Object.keys(reviewMeta.characteristics).map((key) => {
    const keyVal = reviewMeta.characteristics[key].id;
    return (
      <div key={keyVal}>
        <p>{key}</p>
        <CharacteristicBar reviewMeta={reviewMeta.characteristics[key].value} charName={key} />
      </div>
    );
  });

  // INITIALIZATION //
  useEffect(() => {
    if (reviewMeta) {
      setComponents(true);
    }
  }, [reviewMeta]);

  return (
    <div>
      { components
        ? renderSlider()
        : null}
    </div>
  );
}
