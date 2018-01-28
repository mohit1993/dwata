import * as constants from './constants';


export default (state, entity) => {
  switch (entity) {
    case constants.ENTITY_TYPE_TOPNAV_LEFT:
      return state.list.get('');
  }
}
