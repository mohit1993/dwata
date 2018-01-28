import Immutable from 'immutable';


const defaultItemEntry = Immutable.Map({
  entity: undefined,
  searchPath: undefined,

  data: Immutable.Map({}),

  _isFetching: false,
  _isReady: false
});


const itemEntry = (state = defaultItemEntry, action) => {
  switch (action.type) {
    case 'ITEM_INIT':
      // Assumes an Immutable.Map in action.payload
      return state.merge({
        entity: action.entity,
        searchPath: action.searchPath ? action.searchPath : undefined,
        data: action.payload ? action.payload : Immutable.List([]),
        _isReady: true
      });

    case 'ITEM_FETCH_INIT':
      return state.merge({
        _isFetching: true,
      });

    case 'ITEM_FETCH_COMPLETE':
      // Assumes a plain JS object in action.payload, probably from AJAX response
      return state.merge({

      });

    case 'ITEM_UPDATE':
      // Assumes an Immutable.Map in action.payload
      return state;

    default:
      return state
  }
}


export default (state = Immutable.List([]), action) => {
  switch (action.type) {
    case 'ITEM_INIT':
      // Assumes an Immutable.Map in action.payload
      return state

    case 'ITEM_FETCH_INIT':
      return state;

    case 'ITEM_FETCH_COMPLETE':
      // Assumes a plain JS object in action.payload, probably from AJAX response
      return state;

    case 'ITEM_UPDATE':
      // Assumes an Immutable.List in action.payload
      return state;

    default:
      return state
  }
}