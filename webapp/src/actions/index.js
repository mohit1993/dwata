import history from 'base/history';
import Immutable from 'immutable';

import * as constants from 'base/constants';
import { requestHeaders, filterByEntity, filterByEntityAndSearchPath } from 'base/common';


class CustomException {
  constructor(typeOfException, message) {
    this.code = typeOfException
    this.message = message
  }
}


const getFromListNoDefault = (state, entity, searchPath) => {
  // In the common/getFromList we return default Immutable.Map if data is not found
  // Here we return a blank Map
  if (searchPath === undefined) {
    return state.get('list').find(filterByEntity(entity), undefined, Immutable.Map({}));
  } else {
    return state.get('list').find(filterByEntityAndSearchPath(entity, searchPath), undefined, Immutable.Map({}));
  }
}


export const getFromItemNoDefault = (state, entity, searchPath) => {
  if (searchPath === undefined) {
    return state.get('item').find(filterByEntity(entity), undefined, Immutable.Map({}));
  } else {
    return state.get('item').find(filterByEntityAndSearchPath(entity, searchPath), undefined, Immutable.Map({}));
  }
}



const iterDataHeads = x => {
  return {
    name: x,
    label: x,
    _isOn: !(x.startsWith('pass') || x.endsWith('_code') || x.endsWith('_token') || x.startsWith('is_'))  // Is this column visible
  }
}


const processResults = (entity, searchPath, payload, dispatch, getState) => {
  entity = constants.ENTITY_TYPE_DATA_RESULT;
  let existing = getFromListNoDefault(getState(), entity, searchPath);

  if (existing.size === 0) {
    dispatch({
      type: constants.STORE_LIST_INIT,
      entity: entity,
      searchPath: searchPath
    })
  }

  dispatch({
    type: constants.STORE_LIST_FETCH_SUCCESS,
    payload: payload.results,
    entity: entity,
    searchPath: searchPath
  });

  entity = constants.ENTITY_TYPE_DATA_HEAD;
  existing = getFromListNoDefault(getState(), entity, searchPath);

  if (existing.size === 0) {
    dispatch({
      type: constants.STORE_LIST_INIT,
      entity: entity,
      searchPath: searchPath
    })
  }

  dispatch({
    type: constants.STORE_LIST_FETCH_SUCCESS,
    payload: payload.keys.map(iterDataHeads),
    entity: entity,
    searchPath: searchPath
  });
}


const entityDescList = {
  [constants.ENTITY_TYPE_DATA_SOURCE]: {
    listURL: (apiRoot) => `${apiRoot}/source/`
  },
  [constants.ENTITY_TYPE_TABLE]: {
    listURL: (apiRoot, searchPath) => `${apiRoot}/schema${searchPath}/`
  },
  [constants.ENTITY_TYPE_DATA]: {
    listURL: (apiRoot, searchPath) => `${apiRoot}/data${searchPath}/`,
    listProcessor: processResults
  }
}


export const fetchListFromAPI = (entity, searchPath = undefined) => {
  let entityDesc = entityDescList[entity];

  return (dispatch, getState) => {
    // Check if the list for this entity exists, else INIT first
    let existing = getFromListNoDefault(getState(), entity, searchPath);
    if (existing.size === 0) {
      dispatch({
        type: constants.STORE_LIST_INIT,
        entity: entity,
        searchPath: searchPath
      })
    }

    let apiRoot = '/api';
    // Tell our store that we are going to start an AJAX request
    dispatch({
      type: constants.STORE_LIST_FETCH_INIT,
      entity: entity,
      searchPath: searchPath
    });

    if (!entityDesc) {
      return null;
    }

    fetch(entityDesc.listURL(apiRoot, searchPath), requestHeaders())
      .then(
        res => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new CustomException('HTTP_' + res.status);
          }
        }
      )
      .then(
        data => {
          if (entityDesc.listProcessor) {
            entityDesc.listProcessor(entity, searchPath, data, dispatch, getState);
          } else {
            dispatch({
              type: constants.STORE_LIST_FETCH_SUCCESS,
              payload: data,
              entity: entity,
              searchPath: searchPath
            });
          }
        }
      )
      .catch(
        err => {
          dispatch({
            type: constants.STORE_LIST_FETCH_ERROR,
            entity: entity,
            searchPath: searchPath
          });
          history.push('/error/500');
        }
      )
  }
}