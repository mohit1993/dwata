import Immutable, { fromJS } from 'immutable';

import * as constants from 'base/constants';
import { filterByEntity, filterByEntityAndSearchPath } from 'base/common';


export const defaultItemEntry = Immutable.Map({
  entity: undefined,
  searchPath: undefined,

  data: Immutable.Map({}),

  _isFetching: false,
  _isReady: false
});


const itemEntry = (state = defaultItemEntry, action) => {
  switch (action.type) {
    case constants.STORE_ITEM_INIT:
      // Assumes an Immutable.List in action.payload
      return state.merge({
        entity: action.entity,
        searchPath: action.searchPath ? action.searchPath : undefined,
        data: action.payload ? action.payload : Immutable.Map({}),
        _isReady: true
      });

    case constants.STORE_ITEM_FETCH_INIT:
      return state.merge({
        _isFetching: true,
      });

    case constants.STORE_ITEM_FETCH_SUCCESS:
      // Assumes a plain JS object in action.payload, probably from AJAX response
      return state.merge({
        _isFetching: false,
        _isReady: true,
        data: fromJS(action.payload)
      });

    default:
      return state
  }
}


const findIndex = (state, action) => {
  if (action.searchPath === undefined) {
    return state.findIndex(filterByEntity(action.entity));
  } else {
    return state.findIndex(filterByEntityAndSearchPath(action.entity, action.searchPath));
  }
}


export default (state = Immutable.List([]), action) => {
  switch (action.type) {
    case constants.STORE_ITEM_INIT:
      // Assumes an Immutable.List in action.payload
      return state.push(itemEntry(undefined, action));

    case constants.STORE_ITEM_FETCH_INIT:
      return state.update(findIndex(state, action), x => itemEntry(x, action));

    case constants.STORE_ITEM_FETCH_SUCCESS:
      // Assumes a plain JS object in action.payload, probably from AJAX response
      return state.update(findIndex(state, action), x => itemEntry(x, action));

    case constants.STORE_ITEM_FETCH_ERROR:
      return state.update(findIndex(state, action), x => itemEntry(x, action));

    default:
      return state
  }
}