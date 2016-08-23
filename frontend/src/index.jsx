import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'


// import { APIHost } from './config.jsx'
import Dwata from './components/Dwata.jsx'
import dwata from './reducers'
import { fetchSources } from './actions'

let store = createStore(
  dwata,
  applyMiddleware(
    thunkMiddleware
  )
)

store.dispatch(fetchSources())

ReactDOM.render(
  <Provider store={store}>
    <Dwata />
  </Provider>,
  document.getElementById('dwata-root')
)