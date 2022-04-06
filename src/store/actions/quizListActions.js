import axios from "../../axios/axios-quiz";
import { 
  FETCH_QUISES_START, 
  FETCH_QUIZES_ERROR, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZ_SUCCESS, 
  NEXT_QUESTION, 
  QUIS_FINISH, 
  QUIZ_SET_STATE, 
  REPEAT_QUIZ
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('quizes.json')

      const quizes = []

      console.log(response);

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        }) 
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      fetchQuizesError(e)
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {

    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get(`quizes/${quizId}.json`)
      const quiz = response.data

      dispatch(fetchQuizSuccess(quiz))

    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUISES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function repeatQuiz() {
  return {
    type: REPEAT_QUIZ,
    data: {
      results: {},
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      }
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function finishQuiz() {
  return {
    type: QUIS_FINISH
  }
}

export function nextQuestion(activeQuestion) {
  return {
    type: NEXT_QUESTION,
    activeQuestion
  }
}

export function answerClick(id) {

  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] !== 'error') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswer === id) {

      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[id]: 'success'}, results))

      const timeout = window.setTimeout(() => {

        if (isQuizFinised(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(nextQuestion(state.activeQuestion + 1, null))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'

      dispatch(quizSetState({[id]: 'error'}, results))
    }  }
  
}

function isQuizFinised(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

