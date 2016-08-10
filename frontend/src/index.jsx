import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'


// import { APIHost } from './config.jsx'
import Dwata from './components/Dwata.jsx'
import dwata from './reducers'

let store = createStore(
	dwata,
	applyMiddleware(
		thunkMiddleware
	)
)

store.dispatch({
	type: 'TOPNAV_ADD',
	nav: {
		label: 'Dwata',
		side: 'left'
	}
})

ReactDOM.render(
	<Provider store={store}>
		<Dwata />
	</Provider>,
	document.getElementById('dwata-root')
)