import ReactDOM from 'react-dom'
import React from 'react'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

// import { APIHost } from './config.jsx'
import Dwata from './dwata.jsx'

ReactDOM.render(
	<Dwata />,
	document.getElementById('app-placeholder')
)