import React, { useState, useEffect } from 'react';
import CharacteristicBar from './CharacteristicBar.jsx';


export default function CharacteristicTracker({reviewMeta}) {

  // Receive meta data object from parent
  // reviewMeta.characteristics is an object containing relevant info
  // iterate through object
  // map object into progress bar div thing

  const charTrackerMapper = function() {
    let components = [];
    for (var key in reviewMeta.characteristics) {
      var keyVal = reviewMeta.characteristics[key].id;
      components.push(
        <div key={keyVal} className="review-charTrackerMapper">
          <p>{key}</p>
          <CharacteristicBar reviewMeta={reviewMeta.characteristics[key].value} characteristicName={key}/>
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