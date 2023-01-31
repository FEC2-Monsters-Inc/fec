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
  const [timer, setTimer] = useState(null);

  const onFilterTextChange = (value) => {
    setFilterText(value);
    clearTimeout(timer);
  };

  const putQuestions = () => {
    fetcher.questions.getById(feature.id)
      .then(({ data }) => setQuestions(data.results))
      .catch((err) => console.error('Questions on feature change fetch: ', err));
  };

  // TODO: investigate react-hooks/exhaustive-deps
  useEffect(() => {
    putQuestions();
  }, [feature]);

  useEffect(() => {
    if (filterText.length >= 3) {
      setTimer(setTimeout(() => {
        // TODO: filter the questions
        console.log("I'M SEARCHING");
      }, 500));
    }
  }, [filterText]);

  return (
    <div className="qa qa-section">
      <h2>QUESTIONS & ANSWERS</h2>
      <SearchBar text={filterText} handleChange={onFilterTextChange} />
      <QuestionsList
        product_id={feature.id}
        questions={questions}
        updateQuestions={putQuestions}
      />
    </div>
  );
}
