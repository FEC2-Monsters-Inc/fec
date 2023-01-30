import React, { useState } from 'react';
import Question from './Question.jsx';
import QandAModal from './QandAModal.jsx';

export default function QuestionsList({
  questions,
  product_id,
}) {
  const [numQuestions, setNumQuestions] = useState(2);
  const [showAddQ, setShowAddQ] = useState(false);

  const loadMoreQuestions = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      // TODO: Load more questions
      setNumQuestions(numQuestions + 2);
    }
  };

  // TODO: same function in Question.jsx
  const showModal = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setShowAddQ(true);
    }
  };

  const hasAnswer = (question) => {
    if (!Object.keys(question.answers).length) return false;
    return true;
  };

  return (
    <div className="qa list">
      {questions.length > 0
        ? questions.filter(hasAnswer).slice(0, numQuestions).map((question) => (
          <Question
            key={`q_${question.question_id}`}
            question={question}
          />
        ))
        : null}
      <div className="qa footer-control">
        <button
          className="qa footer-btn"
          type="button"
          tabIndex={0}
          onKeyUp={loadMoreQuestions}
          onClick={loadMoreQuestions}
        >
          MORE ANSWERED QUESTIONS
        </button>
        <button
          className="qa footer-btn"
          type="button"
          tabIndex={0}
          onKeyUp={showModal}
          onClick={showModal}
        >
          {'ADD A QUESTION \t +'}
        </button>
        <QandAModal
          type="question"
          show={showAddQ}
          closeModal={setShowAddQ}
          product_id={product_id}
        />
      </div>
    </div>
  );
}
