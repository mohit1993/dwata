import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';

import history from 'base/history';
import * as constants from 'base/constants';
import { selectedInList, getFromList } from 'base/common';
import { fetchListFromAPI } from 'actions';
import { TablesView, SourcesView } from 'views/Selector';
import { defaultListEntry } from 'reducers/list';


export const Tables = withRouter(connect(
  (state, ownProps) => {
    const db = ownProps.match.isExact === true ? ownProps.match.params.db : null;

    return {
      db,
      dataList: db ? getFromList(state, constants.ENTITY_TYPE_TABLE, `/${db}`) : defaultListEntry
    }
  },

  (dispatch, ownProps) => {
    let db = ownProps.match.isExact === true ? ownProps.match.params.db : null;

    return {
      onMount: _ => { db ? dispatch(fetchListFromAPI(constants.ENTITY_TYPE_TABLE, `/${db}`)) : null },
    }
  }
)(TablesView));


export const Sources = connect(
  (state, ownProps) => {
    return {
      dataList: getFromList(state, constants.ENTITY_TYPE_DATA_SOURCE)
    }
  },

  (dispatch, ownProps) => {
    return {
      onMount: _ => dispatch(fetchListFromAPI(constants.ENTITY_TYPE_DATA_SOURCE)),
    }
  }
)(SourcesView);