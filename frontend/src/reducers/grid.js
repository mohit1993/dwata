import { combineReducers } from 'redux'


const gridOperations = (state, action) => {
  switch (action.type) {
    case 'GRID_CLICK_HEAD':
      var current = state.ordering[action.head]
      return Object.assign({}, state, {
        ordering: Object.assign({}, state.ordering, {
          [action.head]: current === 'asc' ? 'desc' : (current === 'desc' ? null : 'asc')
        })
      })

    default:
      return state
  }
}

const gridHead = (state = [], action) => {
  switch (action.type) {
    case 'GRID_SET_HEAD':
      return action.heads

    default:
      return state
  }
}

const gridBody = (state = [], action) => {
  switch (action.type) {
    case 'GRID_SET_RESULT':
      return action.results

    default:
      return state
  }
}

const grid = (state = {heads: [], results: [], ordering: {}, filters: {}, group_by: {}, cell: null}, action) => {
  switch (action.type) {
    case 'GRID_SET_HEAD':
      return Object.assign({}, state, {
        heads: gridHead(state.heads, action)
      })

    case 'GRID_SET_RESULT':
      return Object.assign({}, state, {
        results: gridBody(state.results, action)
      })

    case 'GRID_CLICK_HEAD':
      return gridOperations(state, action)

    case 'GRID_SET_CELL':
      var row = state.results.filter((k, x) => x == action.x)[0]
      return Object.assign({}, state, {
        cell: row.filter((k, y) => y == action.y)[0]
      })

    default:
      return state
  }
}

export default grid