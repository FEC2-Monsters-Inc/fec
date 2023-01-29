import React, { useState } from 'react';
import Question from './Question.jsx';

export default function QuestionsList({
  questions,
}) {
  const [numQuestions, setNumQuestions] = useState(2);

  const loadMoreQuestions = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      // TODO: Load more questions
      setNumQuestions(numQuestions + 2);
    }
  };

  const addQuestion = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      // TODO: Render Add Question modal
      // console.log('ADD A QUESTION')
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
          onKeyUp={addQuestion}
          onClick={addQuestion}
        >
          {'ADD A QUESTION \t +'}
        </button>
      </div>
    </div>
  );
}
