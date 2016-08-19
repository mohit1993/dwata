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
            type: 'SIDENAV_ADD_SOURCE',
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
            type: 'SIDENAV_ADD_TABLE',
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


export const selectTable = () => {
  return (dispatch, getState) => {
    var xhr = new XMLHttpRequest()
    var state = getState()
    var columnOrder = state.grid.ordering
    var urlParams = []
    if (columnOrder) {
      for (var x in columnOrder) {
        if (columnOrder[x] != null) {
          urlParams.push('order_by=' + x + ':' + columnOrder[x]);
        }
      }
    }
    var source = state.sideNav.sources.filter(x => x.active)[0].index
    var table = state.sideNav.tables.filter(x => x.active)[0].index
    xhr.open("GET", "/api/table/data/" + source + "/" + table + "/?" + urlParams.join('&'));
    xhr.responseType = "json"
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch({
          type: 'GRID_SET_HEAD',
          heads: xhr.response.keys
        })
        dispatch({
          type: 'GRID_SET_RESULT',
          results: xhr.response.results
        })
      }
    }
    xhr.send();
  }
}