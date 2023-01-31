import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QandAModal from './QandAModal.jsx';

export default function QuestionsList({
  questions,
  product_id,
  updateQuestions,
}) {
  const [numQuestions, setNumQuestions] = useState(2);
  const [showAddQ, setShowAddQ] = useState(false);

  const loadMoreQuestions = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      let increment = 2;
      if (numQuestions + increment > questions.length) {
        increment = questions.length - numQuestions;
      }
      setNumQuestions(numQuestions + increment);
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

  useEffect(() => {
    setNumQuestions(questions.length < 2 ? questions.length : 2);
  }, [questions]);

  return (
    <div className="qa list">
      {questions.length > 0
        ? questions.filter(hasAnswer).slice(0, numQuestions).map((question) => (
          <Question
            key={question.question_id}
            question={question}
            updateQuestions={updateQuestions}
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
