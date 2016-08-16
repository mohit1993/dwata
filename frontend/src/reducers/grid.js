import { combineReducers } from 'redux'


const gridOperations = (state = {ordering: null, filters: null, group_by: null}, action) => {
  if (typeof action === 'undefined') {
    return state
  }
  switch (action.type) {
    default:
      return state
  }
}

const gridHead = (state = {items: []}, action) => {
  if (typeof action === 'undefined') {
    return state
  }
  switch (action.type) {
    case 'DATA_SET_HEAD':
      return action.heads

    default:
      return state
  }
}

const gridBody = (state = {items: []}, action) => {
  if (typeof action === 'undefined') {
    return state
  }
  switch (action.type) {
    case 'DATA_SET_RESULT':
      return action.results

    default:
      return state
  }
}

// const grid = (state = {head: null, body: null, operations: null}, action) => {
//   switch (action.type) {
//     default:
//       console.log(action)
//       return {
//         head: gridHead(state.head ? state.head : undefined, action),
//         body: gridBody(state.body ? state.body : undefined, action),
//         operations: gridOperations(state.operations ? state.operations : undefined, action)
//       }
//   }
// }

const grid = combineReducers({
  head: gridHead,
  body: gridBody,
  operations: gridOperations
})

export default grid