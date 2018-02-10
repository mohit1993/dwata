import Immutable from 'immutable';

import * as constants from './constants';
import { defaultItemEntry } from 'reducers/item';
import { defaultListEntry } from 'reducers/list';


// Only filter by entity, not searchPath
export const filterByEntity = entity => item =>
  item.get('entity') === entity && item.get('searchPath') === undefined;


// Filter by entity and searchPath (like entity COMMENTS with searchPath `product/123`)
export const filterByEntityAndSearchPath = (entity, searchPath) => item =>
  item.get('entity') === entity && item.get('searchPath') === searchPath;


export const getFromList = (state, entity, searchPath) => {
  let list = state.get('list');
  if (searchPath === undefined) {
    return list.find(filterByEntity(entity), undefined, defaultListEntry.merge({
      entity
    }));
  } else {
    return list.find(filterByEntityAndSearchPath(entity, searchPath), undefined, defaultListEntry.merge({
      entity,
      searchPath
    }));
  }
}


export const getFromItem = (state, entity, searchPath) => {
  let item = state.get('item');
  if (searchPath === undefined) {
    return item.find(filterByEntity(entity), undefined, defaultItemEntry.merge({
      entity
    }));
  } else {
    return item.find(filterByEntityAndSearchPath(entity, searchPath), undefined, defaultItemEntry.merge({
      entity,
      searchPath
    }));
  }
}


export const selectedInList = (entity, select='_isSelected') => (state) =>
  state.getIn(['list', entity]).find(x => x.get(select, false) === true);


export const getDataFromState = (state, filters) => {
  if (!state) return state
  let index = state.findIndex(filterByEntityAndSearchPath(filters.entity, filters.searchPath));

  if (index !== -1) {
    let data = state[index].data;
    for (let i = 0; i < data.length; i++) {
      if (data[i][filters.id_field] === filters.id) return data[i]
    }
  }
}


export const requestHeaders = (method = 'GET', data, filters = undefined) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  // let authData = localStorage.getItem(constants.LOCALSTORAGE_VAR_NAME);
  // if (authData && authData !== 'undefined' && authData !== undefined && authData !== '') {
  //   authData = JSON.parse(authData);
  //   myHeaders.append('Authorization', `Bearer ${authData.auth_token}`);
  // }

  let request = {
    method: method,
    headers: myHeaders
  }
  if (filters) {
    let new_data = getDataFromState(data, filters);
    if (new_data) data = new_data;
  }

  if ((method === 'POST' && data) || (method === 'PUT' && data)) {
    let copy_data = JSON.parse(JSON.stringify(data))
    Object.keys(copy_data).forEach(key => {
      let obj = copy_data[key]

      if (typeof (obj) === 'object') {
        Object.keys(obj).forEach(new_key => {
          (obj[new_key] === null || obj[new_key] === '') && delete obj[new_key]
        })
      }

      if (obj !== undefined && (obj === null
        || obj === ''
        || obj === []
        || (typeof (obj) === 'object' && Object.keys(obj).length === 0))
      ) delete copy_data[key]
    })
    request.body = JSON.stringify(copy_data);
  }
  return request;
}