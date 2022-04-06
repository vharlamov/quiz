import { CREATE_QUESTION, RESET_QUIZ } from "../actions/actionTypes"

const initialState = {
  quiz: []
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    case RESET_QUIZ:
      return {
        ...state,
        quiz: []
      }
    default: return state
  }
}