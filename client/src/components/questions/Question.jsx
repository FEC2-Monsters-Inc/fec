import React, { useState } from 'react';
import Answer from './Answer.jsx';
import QandAModal from './QandAModal.jsx';

export default function Question({
  question: {
    question_id,
    question_body: body,
    // question_date: date,
    // asker_name: asker,
    question_helpfulness: helpfulness,
    // reported,
    answers,
  },
}) {
  const [numAnswers, setNumAnswers] = useState(2);
  const [showAddA, setShowAddA] = useState(false);

  const clickYes = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      // TODO: Send Helpful Question PUT request
      // console.log('CLICK YES');
    }
  };

  const loadMoreAnswers = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      if (numAnswers + 2 > answers.length) {
        if (numAnswers + 1 <= answers.length) setNumAnswers(numAnswers + 1);
      } else setNumAnswers(numAnswers + 2);
    }
  };

  // TODO: same function in QuestionsList.jsx
  const showModal = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setShowAddA(true);
    }
  };

  return (
    <div className="qa q&a">
      <div className="qa question">
        <h3 className="qa question-body">
          {`Q: ${body}`}
        </h3>
        <span className="qa control">
          {'Helpful? '}
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
            onKeyUp={showModal}
            onClick={showModal}
          >
            Add Answer
          </span>
          <QandAModal
            type="answer"
            show={showAddA}
            closeModal={setShowAddA}
            question_id={question_id}
          />
        </span>
      </div>
      {/* TODO: should only render 2 answers */}
      {Object.keys(answers).length > 0
        ? (
          <div className="qa answers-section">
            <h3>A: </h3>
            <div className="qa answers-list">
              {Object.keys(answers).slice(0, numAnswers).map((key) => (
                <Answer
                  key={key}
                  answer={answers[key]}
                />
              ))}
            </div>
          </div>
        ) : null}
      {numAnswers + 1 < Object.keys(answers).length
        ? (
          <span
            className="qa link link-bold"
            role="link"
            tabIndex={0}
            onKeyUp={loadMoreAnswers}
            onClick={loadMoreAnswers}
          >
            LOAD MORE ANSWERS
          </span>
        )
        : null}
    </div>
  );
}
