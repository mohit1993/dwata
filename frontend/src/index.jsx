import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'


// import { APIHost } from './config.jsx'
import Dwata from './components/Dwata.jsx'
import dwata from './reducers'

let store = createStore(dwata)

store.dispatch({
	type: 'TOPNAV_NAV_ADD',
	nav: {
		index: 'tnav-src',
		label: 'Source',
		active: false,
		side: 'left'
	}
})

ReactDOM.render(
	<Provider store={store}>
		<Dwata />
	</Provider>,
	document.getElementById('dwata-root')
)