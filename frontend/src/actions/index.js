export const SIDEBAR_ADD = 'SIDEBAR_ADD'
export const navAddItem = (nav) => {
  return {
    type: SIDEBAR_ADD,
    nav: nav
  }
}

export const SIDEBAR_CLICK = 'SIDEBAR_CLICK'
export const navClickItem = (index) => {
  return {
    type: SIDEBAR_CLICK,
    index: index
  }
}

export const TOPNAV_CLICK = 'TOPNAV_CLICK'
export const topNavClick = (index) => {
  return {
    type: TOPNAV_CLICK,
    index: index
  }
}

export const SOURCES_REQUEST = 'SOURCES_REQUEST'
export const requestSources = () => {
  return {
    type: SOURCES_REQUEST
  }
}

export const receiveSources = (data) => {
  return {
    type: SIDEBAR_ADD,
    sources: data.results,
    receivedAt: Date.now()
  }
}

export const fetchSources = () => {
  return function (dispatch) {
    dispatch(requestSources())

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/source/");
    xhr.responseType = "json";
    xhr.onreadystatechange = (() => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch(receiveSources(xhr.response));
      }
    });
    xhr.send();
  }
}
