import { combineReducers } from 'redux'
import topNav from './topNav.js'
import sideNav from './sideNav.js'
import grid from './grid.js'
import { sources, tables } from './schema'


const main = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_SOURCE':
      return Object.assign({}, state, {
        selectedSource: action.index
      })

    case 'SELECT_TABLE':
      return Object.assign({}, state, {
        selectedTab: action.index
      })

    default:
      return state
  }
}

const dwata = combineReducers({
  topNav,
  sideNav,
  grid,
  main,
  sources,
  tables
})

export default dwata
