import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';

export default function Questions({
  feature
}) {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetcher.questions.getById(feature.id)
      .then(results => setQuestions(results.data.results))
      .catch(err => console.log('err Questions on feature change fetch: ', err));
  }, [feature]);

  return (
    <div>
      Questions and Answers
      <div>
        Questions List
        {questions.length > 0 ?
          questions.map(question => (
            //TODO: more formatting, extract questions to a component
            <div key={question.question_id}>{question.question_body}</div>
          ))
          : null}
      </div>
    </div>
  );
}