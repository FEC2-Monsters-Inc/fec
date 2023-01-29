import React, { useState, useEffect } from 'react';
import CharacteristicBar from './CharacteristicBar.jsx';


export default function CharacteristicTracker({reviewMeta}) {



  const charTrackerMapper = function() {
    let components = [];
    for (var key in reviewMeta.characteristics) {
      var keyVal = reviewMeta.characteristics[key].id;
      components.push(
        <div key={keyVal}>
          <p>{key}</p>
          <CharacteristicBar reviewMeta={reviewMeta.characteristics[key].value}/>
        </div>

      );
    }
    return components;
  };

  return (
    <div>
      {charTrackerMapper()}
    </div>
  );
}