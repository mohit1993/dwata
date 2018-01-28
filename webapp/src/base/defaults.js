import Immutable from 'immutable';

import * as constants from 'base/constants';
import { fetchListFromAPI } from 'actions';


export default (reduxStore) => {
  // let store = reduxStore.getState();
  let dispatch = reduxStore.dispatch;

  dispatch({
    type: constants.STORE_LIST_INIT,
    entity: constants.ENTITY_TYPE_TOPNAV_LEFT,
    payload: Immutable.List([
      Immutable.Map({
        id: 'top-nav-dwata',
        label: 'Sources',
        meta: null,
        isActive: false
      })
    ])
  });

  dispatch(fetchListFromAPI(constants.ENTITY_TYPE_DATA_SOURCE));
  //   case constants.ENTITY_TYPE_GRID :
  //     return Immutable.Map({
  //       heads: Immutable.List([]),
  //       ordering: Immutable.Map({}),
  //       filters: Immutable.Map({}),
  //       group_by: Immutable.Map({}),
  //       cell: null,
  //       active: false,
  //       index: null,
  //       count: 0,
  //       limit: 100,
  //       offset: 0,
  //       selectedRow: null
  //     });
  // }
}