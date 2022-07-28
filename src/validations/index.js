const answersValidations = require('./answer.js')
const dificultyValidations = require('./difficulty.js')
const questionsAnswersValidations = require('./question_answers.js')
const questionValidations = require('./question.js')
const subjectValidations = require('./subject.js')
const topicValidations = require('./topic.js')
const userValidations = require('./user.js')
const loginValidations = require('./login.js')
const questionsByTopicsDifficulties = require('./question_by_topics_difficulties.js')

module.exports = {
  answersValidations,
  dificultyValidations,
  questionsAnswersValidations,
  questionValidations,
  subjectValidations,
  topicValidations,
  userValidations,
  loginValidations,
  questionsByTopicsDifficulties
}
