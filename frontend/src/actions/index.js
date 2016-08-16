export const SIDENAV_ADD = 'SIDENAV_ADD'
export const navAddItem = (nav) => {
  return {
    type: SIDENAV_ADD,
    nav: nav
  }
}


export const TOPNAV_CLICK = 'TOPNAV_CLICK'
export const topNavClick = (index) => {
  return {
    type: TOPNAV_CLICK,
    index: index
  }
}

export const fetchSources = () => {
  return (dispatch, getState) => {
    // dispatch(requestSources())
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/source/");
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        // console.log("Hello", xhr.response)
        for (var x in xhr.response) {
          var item = xhr.response[x][0]
          dispatch({
            type: SIDENAV_ADD,
            nav: {
              label: item,
              index: item
            }
          });
        }
      }
    }
    xhr.send();
  }
}

export const SIDENAV_CHILD_ADD = 'SIDENAV_CHILD_ADD'
export const selectSource = (index) => {
  return (dispatch, getState) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/schema/" + index + "/");
    xhr.responseType = "json"
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch({type: 'SIDENAV_SELECT_SOURCE'})
        for (var x in xhr.response) {
          var item = xhr.response[x]
          dispatch({
            type: SIDENAV_CHILD_ADD,
            nav: {
              label: item[0],
              index: item[0],
              struct: item[1]
            }
          })
        }
      }
    }
    xhr.send();
  }
}


export const selectTable = (index) => {
  return (dispatch, getState) => {
    var xhr = new XMLHttpRequest()
    var state = getState()
    var columnOrder = state.grid.operations.ordering
    var urlParams = []
    if (columnOrder) {
      for (var x in columnOrder) {
        urlParams.push('order_by=' + x + ':' + columnOrder[x]);
      }
    }
    var source = state.sideNav.items.filter(x => x.active)[0].index
    xhr.open("GET", "/api/table/data/" + source + "/" + index + "/?" + urlParams.join('&'));
    xhr.responseType = "json"
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch({
          type: 'DATA_SET_HEAD',
          heads: xhr.response.keys
        })
        dispatch({
          type: 'DATA_SET_RESULT',
          results: xhr.response.results
        })
      }
    }
    xhr.send();
  }
}