import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as constants from 'base/constants';
import { getFromList } from 'base/common';


export const LeftNavContainer = (view) => withRouter(connect(
  (state, ownProps) => {
    return {
      dataList: getFromList(state, constants.ENTITY_TYPE_TOPNAV_LEFT)
    }
  },
)(view));


export const RightNavContainer = (view) => withRouter(connect(
  (state, ownProps) => {
    return {
      dataList: getFromList(state, constants.ENTITY_TYPE_TOPNAV_RIGHT)
    }
  },
)(view));