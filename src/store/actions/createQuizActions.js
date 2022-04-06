import { CREATE_QUESTION, RESET_QUIZ } from "./actionTypes"
import axios from "../../axios/axios-quiz";

export function createQuestion(item) {
  return {
    type: CREATE_QUESTION,
    item
  }
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  }
}

export function createQuiz() {
  return async (dispatch, getState) => {
    await axios.post('quizes.json', getState().create.quiz)
    dispatch(resetQuiz())
  }
}

