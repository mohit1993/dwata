import history from 'base/history';
import moment from 'moment';

import * as constants from 'base/constants';
import { requestHeaders, filterByEntity, getFromList } from 'base/common';


class CustomException {
  constructor(typeOfException, message) {
    this.code = typeOfException
    this.message = message
  }
}


const iterDataHeads = x => {
  return {
    name: x,
    label: x,
    _isOn: !(x.startsWith('pass') || x.endsWith('_code') || x.endsWith('_token') || x.startsWith('is_'))  // Is this column visible
  }
}

const parseData = (entity, searchPath, payload, dispatch, getState) => {
  entity = constants.ENTITY_TYPE_DATA_RESULT;
  let existing = getFromList(getState(), entity, searchPath);

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
  existing = getFromList(getState(), entity, searchPath);

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
    listProcessor: parseData
  }
}


export const fetchListFromAPI = (entity, searchPath = undefined) => {
  let entityDesc = entityDescList[entity];

  return (dispatch, getState) => {
    // Check if the list for this entity exists, else INIT first
    let existing = getFromList(getState(), entity, searchPath);
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