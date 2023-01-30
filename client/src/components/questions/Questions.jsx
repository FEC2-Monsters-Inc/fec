import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';
import SearchBar from './SearchBar.jsx';
import QuestionsList from './QuestionsList.jsx';
import './styles/questions.css';

export default function Questions({
  feature,
}) {
  const [questions, setQuestions] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetcher.questions.getById(feature.id)
      .then(({ data }) => setQuestions(data.results))
      .catch((err) => console.error('Questions on feature change fetch: ', err));
  }, [feature]);

  return (
    <div className="qa section">
      <h2>QUESTIONS & ANSWERS</h2>
      <SearchBar text={filterText} handleChange={setFilterText} />
      <QuestionsList product_id={feature.id} questions={questions} />
    </div>
  );
}
