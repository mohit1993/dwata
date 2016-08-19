import { combineReducers } from 'redux'
import topNav from './topNav.js'
import sideNav from './sideNav.js'
import grid from './grid.js'


const dwata = combineReducers({
  topNav,
  sideNav,
  grid
})

export default dwata
