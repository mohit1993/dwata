import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as constants from 'base/constants';
import { getFromList, getFromItem } from 'base/common';
import { defaultListEntry } from 'reducers/list';


export const LeftNavContainer = (view) => withRouter(connect(
  (state, ownProps) => {
    const grid = getFromItem(state, constants.ENTITY_TYPE_GRID);

    return {
      dataList: getFromList(state, constants.ENTITY_TYPE_TOPNAV_LEFT),
      grid
    }
  },
)(view));


export const RightNavContainer = (view) => withRouter(connect(
  (state, ownProps) => {
    const grid = getFromItem(state, constants.ENTITY_TYPE_GRID);
    const columns = grid.get('data').size > 0 ? getFromList(state, constants.ENTITY_TYPE_DATA_HEAD, grid.getIn(['data', 'searchPath'])) : defaultListEntry;

    return {
      dataList: getFromList(state, constants.ENTITY_TYPE_TOPNAV_RIGHT),
      grid,
      columns
    }
  },
)(view));