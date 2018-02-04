import Immutable from 'immutable';

import * as constants from 'base/constants';


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
        link: '/source',
        meta: null,
        isActive: false
      })
    ])
  });
}