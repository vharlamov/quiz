const redux = require('redux')

const initialState = {
  counter: 0
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        counter: ++state.counter
      }
    case 'SUB':
      return {
        counter: --state.counter
      }
    case 'ADD_NUMBER':
      return {
        counter: state.counter + action.data
      }
    default: return state
  }

}

// Store
const store = redux.createStore(reducer)

store.subscribe(() => {
  console.log('Subscribe', store.getState())
})

// Actions
const addCounter = {
  type: 'ADD'
}
const subCounter = {
  type: 'SUB'
}

store.dispatch(addCounter)

store.dispatch(addCounter)

store.dispatch(subCounter)

store.dispatch({type: 'ADD_NUMBER', data: 5})
