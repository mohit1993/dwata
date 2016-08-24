export const fetchSources = () => {
  return (dispatch, getState) => {
    // dispatch(requestSources())
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/source/");
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        // console.log("Hello", xhr.response)
        dispatch({
          type: 'SOURCE_ADD_MULTI',
          sources: xhr.response
        })
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
    var columnOrder = state.grid.ordering
    var urlParams = []
    if (columnOrder) {
      for (var x in columnOrder) {
        if (columnOrder[x] != null) {
          urlParams.push('order_by=' + x + ':' + columnOrder[x])
        }
      }
    }
    var selectedTab = state.main.selectedTab
    if (selectedTab.indexOf("data/") != -1) {
      xhr.open("GET", "/api/" + selectedTab + "?" + urlParams.join('&'))
    }
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