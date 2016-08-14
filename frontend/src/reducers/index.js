import { combineReducers } from 'redux'
import topNav from './topNav.js'
import sideNav from './sideNav.js'


const dwataApp = combineReducers({
	topNav,
	sideNav
})

export default dwataApp
