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
    var selectedTab = state.main.selectedTab
    var columnOrder = (state.multiGrid[selectedTab] && state.multiGrid[selectedTab].ordering) || {}
    var urlParams = []
    if (columnOrder) {
      for (var x in columnOrder) {
        if (columnOrder[x] != null) {
          urlParams.push('order_by=' + x + ':' + columnOrder[x])
        }
      }
    }
    if (selectedTab.indexOf("data/") != -1) {
      xhr.open("GET", "/api/" + selectedTab + "?" + urlParams.join('&'))
    }
    xhr.responseType = "json"
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch({
          type: 'GRID_SET_HEAD',
          selectedTab: selectedTab,
          heads: xhr.response.keys
        })
        dispatch({
          type: 'GRID_SET_RESULT',
          selectedTab: selectedTab,
          results: xhr.response.results
        })
      }
    }
    xhr.send();
  }
}