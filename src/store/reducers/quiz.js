import { 
  FETCH_QUIZES_ERROR, 
  FETCH_QUISES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZ_SUCCESS, 
  REPEAT_QUIZ,
  QUIZ_SET_STATE,
  QUIS_FINISH,
  NEXT_QUESTION
} from "../actions/actionTypes"

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  quiz: null
}

export default function quizReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_QUISES_START:
      return {
        ...state, 
        loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, 
        quizes: action.quizes,
        loading: false
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loading: false
      }
    case REPEAT_QUIZ:
      return {
        ...state, 
        ...action.data
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    case QUIS_FINISH:
      return {
        ...state,
        isFinished: true
      }
    case NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: null
      }
    default: return state
  }
}