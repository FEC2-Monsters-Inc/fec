import React from 'react';
import { format, parseISO } from 'date-fns';

export default function Answer({
  answer: {
    // id,
    body,
    date,
    answerer_name: name,
    helpfulness,
    photos,
  },
}) {
  const clickYes = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      // TODO: Send Helpful Answer PUT request
    }
  };

  const reportAnswer = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      // TODO: Send Report Answer PUT request
    }
  };

  return (
    <div className="qa answer">
      <div className="qa answer-body">
        <div className="qa answer-text">
          {body}
        </div>
        {/* TODO: expand photo on click */}
        {photos.length > 0
          ? photos.map((photo, index) => (
            <img
              className="qa photo-sml"
              src={photo}
              key={`${photo.slice(62, 82)}`}
              alt={`Customer's image ${index + 1}`}
            />
          ))
          : null}
      </div>
      <div className="qa answer-info">
        {`by ${name}, ${format(parseISO(date), 'MMMM d, yyyy')} | Helpful? `}
        <span
          className="qa link"
          role="link"
          tabIndex={0}
          onKeyUp={clickYes}
          onClick={clickYes}
        >
          Yes
        </span>
        {` (${helpfulness}) | `}
        <span
          className="qa link"
          role="link"
          tabIndex={0}
          onKeyUp={reportAnswer}
          onClick={reportAnswer}
        >
          Report
        </span>
      </div>
    </div>
  );
}
