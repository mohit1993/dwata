import { combineReducers } from 'redux-immutable';

import items from './items';
import list from './list';

export default combineReducers({
  items,
  list
});