import * as constants from './constants';


export const fakeUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}


export const filterByEntity = (entity) => {
  // If there is a searchPath, then use that to filter instead
  return (item) => item.get('entity') === entity && !item.get('searchPath')
}


// parent is like a URL, example `job/12` or `user/12`
export const filterByEntityAndParent = (entity, parent) => {
  return (item) => item.entity === entity && item.parent === parent
}


export const getDataFromState = (state, filters) => {
  if (!state) return state
  let index = state.findIndex(filterByEntityAndParent(filters.entity, filters.parent));
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