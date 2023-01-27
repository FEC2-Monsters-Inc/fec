const model = require('../models').questions;

module.exports = {
  getQuestions: (req, res) => {
    model.getQuestions(req.query)
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.getQuestions: ', err);
        res.sendStatus(500);
      });
  },

  addQuestion: (req, res) => {
    model.addQuestion(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        console.log('err ctrl.addQuestion: ', err);
        res.sendStatus(500);
      });
  },

  reportQuestion: (req, res) => {
    model.reportQuestion()
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.reportQuestion: ', err);
        res.sendStatus(500);
      });
  },

  markHelpfulQuestion: (req, res) => {
    model.markHelpfulQuestion()
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.markHelpfulQuestion: ', err);
        res.sendStatus(500);
      });
  },

  getAnswers: (req, res) => {
    model.getAnswers(req.params.question_id)
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.getAnswers: ', err);
        res.sendStatus(500);
      });
  },

  answerQuestion: (req, res) => {
    model.answerQuestion()
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.answerQuestion: ', err);
        res.sendStatus(500);
      });
  },

  markHelpfulAnswer: (req, res) => {
    model.markHelpfulAnswer()
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.markHelpfulAnswer: ', err);
        res.sendStatus(500);
      });
  },

  reportAnswer: (req, res) => {
    model.reportAnswer()
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.reportAnswer: ', err);
        res.sendStatus(500);
      });
  }
};