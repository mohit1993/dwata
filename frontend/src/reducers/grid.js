import { combineReducers } from 'redux'


const gridOperations = (state = {ordering: null, filters: null, group_by: null}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const gridHead = (state = [], action) => {
  switch (action.type) {
    case 'DATA_SET_HEAD':
      return action.heads

    default:
      return state
  }
}

const gridBody = (state = [], action) => {
  switch (action.type) {
    case 'DATA_SET_RESULT':
      return action.results

    default:
      return state
  }
}

const grid = (state = {heads: [], results: [], operations: {}}, action) => {
  switch (action.type) {
    case 'DATA_SET_HEAD':
      return Object.assign({}, state, {
        heads: gridHead(state.heads, action)
      })

    case 'DATA_SET_RESULT':
      return Object.assign({}, state, {
        results: gridBody(state.results, action)
      })

    default:
      return state
  }
}

export default grid