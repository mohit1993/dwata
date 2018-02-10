import Immutable, { fromJS } from 'immutable';
import moment from 'moment';

import * as constants from 'base/constants';
import { filterByEntity, filterByEntityAndSearchPath } from 'base/common';


export const defaultListEntry = Immutable.Map({
  entity: undefined,
  searchPath: undefined,

  data: Immutable.List([]),

  _isFetching: false,
  _isReady: false,
  _lastFetchedAt: null
});


const listEntry = (state = defaultListEntry, action) => {
  switch (action.type) {
    case constants.STORE_LIST_INIT:
      // Assumes an Immutable.List in action.payload
      return state.merge({
        entity: action.entity,
        searchPath: action.searchPath ? action.searchPath : undefined,
        data: action.payload ? action.payload : Immutable.List([]),
        _isReady: true,
        _lastFetchedAt: moment.utc()
      });

    case constants.STORE_LIST_FETCH_INIT:
      return state.merge({
        _isFetching: true,
        _isReady: false
      });

    case constants.STORE_LIST_FETCH_SUCCESS:
      // Assumes a plain JS list in action.payload, probably from AJAX response
      const data = fromJS(action.payload)
      return state.merge({
        data: data,

        _isFetching: false,
        _isReady: true,
        _lastFetchedAt: moment.utc()
      });

    case constants.STORE_LIST_MERGE:
      // Assumes an Immutable.List in action.payload
      return state.get('data').merge(action.payload);

    case constants.STORE_LIST_SELECT_ITEM:
      return state.get('data').map(x => x.id === action.id ? x.set('_isSelected', true) : x)

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
  if (action.entity === undefined) {
    return state;
  }

  switch (action.type) {
    case constants.STORE_LIST_INIT:
      // Assumes an Immutable.List in action.payload
      return state.push(listEntry(undefined, action));

    case constants.STORE_LIST_FETCH_INIT:
      return state.update(findIndex(state, action), x => listEntry(x, action));

    case constants.STORE_LIST_FETCH_SUCCESS:
      // Assumes a plain JS list in action.payload, probably from AJAX response
      return state.update(findIndex(state, action), x => listEntry(x, action));

    case constants.STORE_LIST_MERGE:
      // Assumes an Immutable.List in action.payload
      return state.update(findIndex(state, action), x => listEntry(x, action));

    case constants.STORE_LIST_SELECT_ITEM:
      return state.update(findIndex(state, action), x => listEntry(x, action));

    case constants.STORE_LIST_DESTROY:
      return state.delete(findIndex(state, action))

    default:
      return state
  }
}