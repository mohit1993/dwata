import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';

import history from 'base/history';
import * as constants from 'base/constants';
import { selectedInList, getFromList } from 'base/common';
import { fetchListFromAPI } from 'actions';
import { TablesView, SourcesView } from 'views/SideNav';


export const Tables = withRouter(connect(
  (state, ownProps) => {
    let db = ownProps.match.isExact === true ? ownProps.match.params.db : null;

    return {
      dataList: db ? getFromList(state, constants.ENTITY_TYPE_TABLE, `/${db}`) : Immutable.Map({})
    }
  },

  (dispatch, ownProps) => {
    let db = ownProps.match.isExact === true ? ownProps.match.params.db : null;

    return {
      onMount: _ => { db ? dispatch(fetchListFromAPI(constants.ENTITY_TYPE_TABLE, `/${db}`)) : null },

      onSelect: (e, nav) => {
        e.preventDefault();
        // dispatch({
        //   type: constants.STORE_LIST_SELECT_ITEM,
        //   entity: constants.ENTITY_TYPE_TABLE,
        //   filterBy: x => x.get(0) === nav[0]
        // });
        dispatch(fetchListFromAPI(constants.ENTITY_TYPE_DATA, `/${db}/${nav[0]}`));
        history.push(`/records/${db}/${nav[0]}/`);
      }
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

      onSelect: (e, nav) => {
        e.preventDefault();
        // dispatch({
        //   type: constants.STORE_LIST_SELECT_ITEM,
        //   entity: constants.ENTITY_TYPE_DATA_SOURCE,
        //   filterBy: x => x.get(0) === nav[0]
        // });
        dispatch(fetchListFromAPI(constants.ENTITY_TYPE_TABLE, `/${nav[0]}`));
        history.push(`/source/${nav[0]}/`);
      }
    }
  }
)(SourcesView);