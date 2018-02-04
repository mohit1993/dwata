import Immutable, { fromJS } from 'immutable';
import moment from 'moment';

import * as constants from 'base/constants';
import { filterByEntity, filterByEntityAndSearchPath } from 'base/common';


const defaultListEntry = Immutable.Map({
  entity: undefined,
  searchPath: undefined,

  data: Immutable.List([]),

  _isFetching: false,
  _isReady: false,
  _lastFetchedAt: undefined
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
        _isReady: false
      });

    case constants.STORE_LIST_FETCH_SUCCESS:
      // Assumes a plain JS list in action.payload, probably from AJAX response
      return state.merge({
        data: fromJS(action.payload),

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

    default:
      return state
  }
}


// export default (state = Immutable.List([]), action) => {
//   switch (action.type) {
//     case constants.STORE_LIST_INIT:
//       // Assumes an Immutable.List in action.payload
//       return state.push(action.entity, listEntry(undefined, action));

//     case constants.STORE_LIST_FETCH_INIT:
//       return state.update(action.entity, x => listEntry(x, action));

//     case constants.STORE_LIST_FETCH_SUCCESS:
//       // Assumes a plain JS list in action.payload, probably from AJAX response
//       return state.update(action.entity, x => listEntry(x, action));

//     case constants.STORE_LIST_UPDATE:
//       // Assumes an Immutable.List in action.payload
//       return state;

//     case constants.STORE_LIST_SELECT_ITEM:
//       return state.update(action.entity, x => listEntry(x, action));

//     default:
//       return state
//   }
// }