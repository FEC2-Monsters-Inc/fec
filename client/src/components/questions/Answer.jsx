import React from 'react';
import { format, parseISO } from 'date-fns';
import fetcher from '../../fetchers/questions';

export default function Answer({
  answer: {
    id,
    body,
    date,
    answerer_name: name,
    helpfulness,
    photos,
  },
  question_id,
}) {
  const markHelpfulAnswer = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      fetcher
        .markHelpfulAnswer(id)
        .then(() => {
          // TODO: update the answer
        })
        .catch((err) => console.error('markHelpfulAnswer: ', err));
    }
  };

  const reportAnswer = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      fetcher
        .reportAnswer(question_id)
        .then((results) => {
          // TODO: maybe update answers..
          console.log(results);
        })
        .catch((err) => console.error('reportAnswer: ', err));
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
              key={photo}
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
          onKeyUp={markHelpfulAnswer}
          onClick={markHelpfulAnswer}
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
