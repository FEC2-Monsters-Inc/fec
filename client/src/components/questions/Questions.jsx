import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers/questions';
import SearchBar from './SearchBar.jsx';
import QuestionsList from './QuestionsList.jsx';
import './styles/questions.css';

export default function Questions({
  feature,
}) {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [timer, setTimer] = useState(null);

  const onFilterTextChange = (value) => {
    setFilterText(value);
    clearTimeout(timer);
  };

  const putQuestions = () => {
    fetcher.getQuestionsById(feature.id)
      .then(({ data }) => setQuestions(data.results))
      .catch((err) => console.error('Questions on feature change fetch: ', err));
  };

  // TODO: maybe want to search through answers too
  // const combineAnswerText = ()

  const byHasAnswers = (question) => {
    if (!Object.keys(question.answers).length) return false;
    return true;
  };

  const bySearchTerm = (question) => {
    if (!question.question_body
      .toUpperCase()
      .includes(filterText.toUpperCase())) return false;
    return true;
  };

  const filterQuestionsWithAnswers = () => {
    setFilteredQuestions(questions.filter(byHasAnswers));
  };

  const filterQuestionsBySearch = () => {
    if (filterText.length >= 3) {
      setFilteredQuestions(questions.filter(bySearchTerm));
    } else filterQuestionsWithAnswers();
  };

  // TODO: investigate react-hooks/exhaustive-deps
  // TODO: probably some way to use less useEffects and condense the functions
  useEffect(() => {
    putQuestions();
  }, [feature]);

  useEffect(() => {
    setTimer(setTimeout(filterQuestionsBySearch, 500));
  }, [filterText]);

  useEffect(() => {
    filterQuestionsBySearch();
  }, [questions]);

  return (
    <div id="questions-widget" className="qa qa-section">
      <h2>QUESTIONS & ANSWERS</h2>
      <SearchBar
        text={filterText}
        handleChange={onFilterTextChange}
      />
      <QuestionsList
        product_id={feature.id}
        questions={!filteredQuestions.length ? questions : filteredQuestions}
        updateQuestions={putQuestions}
        filterText={filterText}
      />
    </div>
  );
}
