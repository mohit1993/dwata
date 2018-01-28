import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';

import * as constants from 'base/constants';
import getDefault from './defaults';
import { filterByEntity } from './common';


const mapStateToProps = (entity, mode) => {
  /*
   We define three different methods here.
   One is for view (read only) kind of state to props mapping.
   One is for list (read only) kind of state to props mapping.
   The other is for form (edit mode) kind of state to props mapping.
  */

  const commonProps = (state, ownProps) => {
    // We can add common stuff like authentication, notifications, etc.
    let ret = Immutable.Map({});
    return ret;
  }


  const propsForView = (state, ownProps) => {
    let dataItem = state.get('items').find(filterByEntity(entity));

    return {
      common: commonProps(state, ownProps),
      dataItem: dataItem ? dataItem.get('data') : Immutable.Map({})
    }
  }


  const propsForList = (state, ownProps) => {
    let dataList = state.get('list').find(filterByEntity(entity));

    return {
      common: commonProps(state, ownProps),
      dataList: dataList ? dataList.get('data') : Immutable.List([])
    }
  }


  const propsForForm = (state, ownProps) => {
    // Common return variable
    let ret = commonProps(state, ownProps);

    return {
      common: commonProps(state, ownProps)
    }  
  }

  // Depending on the mode selected we return correct state to props mapping method.
  if (mode === constants.CONTAINER_MODE_ITEM) {
    return propsForView;
  } else if (mode === constants.CONTAINER_MODE_LIST) {
    return propsForList;
  } else if (mode === constants.CONTAINER_MODE_FORM) {
    return propsForForm;
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}


export default (view, { entity = undefined, mode = constants.CONTAINER_MODE_ITEM } = {}) => withRouter(connect(
  mapStateToProps(entity, mode),
  mapDispatchToProps(entity, mode)
)(view));