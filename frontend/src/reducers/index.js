import { combineReducers } from 'redux'
import topNav from './topNav.js'
import sideNav from './sideNav.js'
import multiGrid from './grid.js'
import { sources, tables } from './schema'


/*
  This is our main reducer. We store some state information needed to mostly determine selected entities.
  The selectedSource stores the data source that is selected from the dropdown in the side navigation.
  The selectedTable stores the table that is currently activated in the grid.
*/
const main = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_SOURCE':
      return Object.assign({}, state, {
        selectedSource: action.index
      })

    case 'SELECT_TABLE':
      return Object.assign({}, state, {
        selectedTable: action.index
      })

    default:
      return state
  }
}

/*
  We combine all our reducers to get our application state.
  When accessing the full state, we use the indices assigned here to access their corresponding
  sub-state.
*/
const dwata = combineReducers({
  topNav,
  sideNav,
  multiGrid,
  main,
  sources,
  tables
})

export default dwata
