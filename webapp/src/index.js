import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from 'reducers';
import setDefaults from 'base/defaults';


const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);

setDefaults(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
