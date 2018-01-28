import Immutable, { fromJS } from 'immutable';

import * as constants from 'base/constants';
import { filterByEntity } from 'base/common';


const defaultListEntry = Immutable.Map({
  entity: undefined,
  searchPath: undefined,

  data: Immutable.List([]),

  _isFetching: false,
  _isReady: false
});


const listEntry = (state = defaultListEntry, action) => {
  switch (action.type) {
    case constants.STORE_LIST_INIT:
      // Assumes an Immutable.List in action.payload
      return state.merge({
        entity: action.entity,
        searchPath: action.searchPath ? action.searchPath : undefined,
        data: action.payload ? action.payload : Immutable.List([]),
        _isReady: true
      });

    case constants.STORE_LIST_FETCH_INIT:
      return state.merge({
        _isFetching: true,
      });

    case constants.STORE_LIST_FETCH_SUCCESS:
      // Assumes a plain JS list in action.payload, probably from AJAX response
      return state.merge({
        data: fromJS(action.payload)
      });

    case constants.STORE_LIST_UPDATE:
      // Assumes an Immutable.List in action.payload
      return state;

    default:
      return state
  }
}


const findIndex = (state, action) => {
  if (!action.searchPath) {
    return state.findIndex(filterByEntity(action.entity));
  }
}


export default (state = Immutable.List([]), action) => {
  switch (action.type) {
    case constants.STORE_LIST_INIT:
      // Assumes an Immutable.List in action.payload
      return state.push(listEntry(undefined, action));

    case constants.STORE_LIST_FETCH_INIT:
      return state.update(findIndex(state, action), x => listEntry(x, action));

    case constants.STORE_LIST_FETCH_SUCCESS:
      // Assumes a plain JS list in action.payload, probably from AJAX response
      return state.update(findIndex(state, action), x => listEntry(x, action));

    case constants.STORE_LIST_UPDATE:
      // Assumes an Immutable.List in action.payload
      return state;

    default:
      return state
  }
}