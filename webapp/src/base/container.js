import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';

import * as constants from 'base/constants';
import { filterByEntity, getFromList } from 'base/common';


const mapStateToProps = ({ entity=undefined, mode=constants.CONTAINER_MODE_ITEM, router=false }) => {
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


  const propsForItem = (state, ownProps) => {
    let dataItem = state.get('items').find(filterByEntity(entity));

    return {
      common: commonProps(state, ownProps),
      dataItem: dataItem ? dataItem.get('data') : Immutable.Map({})
    }
  }


  const propsForList = (state, ownProps) => {
    let dataList = getFromList(state, entity)

    return {
      common: commonProps(state, ownProps),
      dataList: dataList
    }
  }


  const propsForForm = (state, ownProps) => {
    // Common return variable
    return {
      common: commonProps(state, ownProps)
    }  
  }

  // Depending on the mode selected we return correct state to props mapping method.
  if (mode === constants.CONTAINER_MODE_ITEM) {
    return propsForItem;
  } else if (mode === constants.CONTAINER_MODE_LIST) {
    return propsForList;
  } else if (mode === constants.CONTAINER_MODE_FORM) {
    return propsForForm;
  }
}


const mapDispatchToProps = ({ entity=undefined, mode=constants.CONTAINER_MODE_ITEM, router=false, filter=undefined }) => {
  const handlersforItem = (dispatch, ownProps) => {
    return {};
  }

  const handlersforList = (dispatch, ownProps) => {
    return {
      onSelect: (id) => {
        dispatch({
          type: constants.STORE_LIST_SELECT_ITEM,
          entity,
          id
        });
      }
    };
  }

  const handlersforForm = (dispatch, ownProps) => {
    return {};
  }


  if (mode === constants.CONTAINER_MODE_ITEM) {
    return handlersforItem;
  } else if (mode === constants.CONTAINER_MODE_LIST) {
    return handlersforList;
  } else if (mode === constants.CONTAINER_MODE_FORM) {
    return handlersforForm;
  }
}


export default (view, { entity=undefined, mode=constants.CONTAINER_MODE_ITEM, router=false } = {}) => {
  let container = undefined;
  let options = {
    entity,
    mode,
    router
  }

  if (entity && mode) {
    container = connect(
      mapStateToProps(options),
      mapDispatchToProps(options)
    )(view);
  } else {
    container = connect()(view);
  }

  if (router) {
    return withRouter(container);
  } else {
    return container;
  }
}