import React, { useState, useEffect } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export default function StyleThumbnails({ styles, toggleStyle }) {
  // STATE DATA //
  const [thumbRows, setThumbRows] = useState([]);

  // HELPER FUNCTIONS //
  const thumbRowSorter = (styleInfo) => {
    const result = [[]];
    let index = 0;
    let count = 1;
    styleInfo.forEach((style) => {
      if (count === 5) {
        count = 0;
        index += 1;
        result[index] = [];
        result[index].push(style);
      } else {
        result[index].push(style);
        count += 1;
      }
    });

    setThumbRows(result);
  };

  const thumbRowMapper = (thumbs) => (
    <div className="thumb-row" key={thumbs[0].name}>
      { thumbs.map((thumb) => {
        const src = thumb.photos[0].thumbnail_url;
        return (
          <div className="check-wrapper" key={thumb.style_id}>
            <BsFillCheckCircleFill className="check-mark" size="1.25em" />
            <img
              id={thumb.style_id}
              className="style-thumbnail"
              src={src}
              onClick={toggleStyle}
              alt={`${thumb.name} style thumbnail.`}
            />
          </div>
        );
      })}
    </div>
  );

  // INITIALIZATION //
  useEffect(() => {
    if (styles) {
      thumbRowSorter(styles.results);
    }
  }, [styles]);

  return (
    <div className="thumbs-container">
      { thumbRows.length
        ? thumbRows.map((row) => thumbRowMapper(row))
        : null }
    </div>
  );
}
