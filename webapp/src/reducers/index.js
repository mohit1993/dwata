import { combineReducers } from 'redux-immutable';

import item from './item';
import list from './list';

export default combineReducers({
  item,
  list
});