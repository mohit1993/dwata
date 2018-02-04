import history from './history';

import * as constants from 'base/constants';
import { requestHeaders, filterByEntity } from 'base/common';


class CustomException {
  constructor(typeOfException, message) {
    this.code = typeOfException
    this.message = message
  }
}


/*
  We fetch all the data sources available. Each data source is like a database.
*/
export const fetchSources = () => {
  return (dispatch, getState) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/source/");
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch({
          type: 'SOURCE_ADD_MULTI',
          sources: xhr.response
        })
        if (xhr.response.length === 1) {
          // If there is just one source, then we make it selected source and
          // request to fetch its tables
          console.log(xhr.response[0][0])
          dispatch({type: 'SELECT_SOURCE', index: xhr.response[0][0]})
          dispatch(selectSource())
        }
      }
    }
    xhr.send();
  }
}


const entityDescList = {
  [constants.ENTITY_TYPE_DATA_SOURCE]: {
    itemURL: (apiRoot, id) => `${apiRoot}/source/${id}/`,
    listURL: (apiRoot) => `${apiRoot}/source/`
  },
}


export const fetchListFromAPI = (entity, searchPath = undefined) => {
  let entityDesc = entityDescList[entity];

  return (dispatch, getState) => {
    // Check if the list for this entity exists, else INIT first
    if (getState().get('list').findIndex(filterByEntity(entity)) === -1) {
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

    fetch(entityDesc.listURL(apiRoot), requestHeaders())
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
          dispatch({
            type: constants.STORE_LIST_FETCH_SUCCESS,
            payload: data,
            entity: entity,
            searchPath: searchPath
          });
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


/*
  For each data source we can have multiple tables or views.
*/
export const selectSource = () => {
  return (dispatch, getState) => {
    var index = getState().main.selectedSource
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/schema/" + index + "/");
    xhr.responseType = "json"
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch({
          type: 'TABLE_ADD_MULTI',
          source: index,
          tables: xhr.response
        })
        dispatch({
          type: 'SOURCE_ADD_TABLES',
          source: index,
          tables: xhr.response
        })
      }
    }
    xhr.send();
  }
}


export const selectTable = () => {
  return (dispatch, getState) => {
    var xhr = new XMLHttpRequest()
    var state = getState()
    var selectedTable = state.main.selectedTable
    var tableSettings = state.multiGrid[selectedTable] || null
    var urlParams = []

    if (tableSettings) {
      if (tableSettings.ajaxLoading || tableSettings.hasSynced) {
        return
      }
      for (var x in tableSettings.ordering) {
        if (tableSettings.ordering[x] != null) {
          urlParams.push('order_by=' + x + ':' + tableSettings.ordering[x])
        }
      }
      if (tableSettings.limit) {
        urlParams.push('limit=' + tableSettings.limit)
      }
      if (tableSettings.offset) {
        urlParams.push('offset=' + tableSettings.offset)
      }
    }

    if (selectedTable.indexOf("data/") !== -1) {
      xhr.open("GET", "/api/" + selectedTable + "/?" + urlParams.join('&'))
    }
    xhr.responseType = "json"
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch({
          type: 'GRID_SET_HEAD_AND_RESULT',
          index: selectedTable,
          heads: xhr.response.keys,
          results: xhr.response.results,
          count: xhr.response.count
        })
      }
    }
    dispatch({
      type: 'GRID_SET_META',
      meta: 'ajaxLoading',
      value: true
    })
    xhr.send();
  }
}
