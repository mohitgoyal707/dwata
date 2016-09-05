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
    var selectedTable = state.main.selectedTable
    var tableSettings = state.multiGrid[selectedTable] || null
    var urlParams = []

    if (tableSettings) {
      for (var x in tableSettings.ordering) {
        if (tableSettings.ordering[x] != null) {
          urlParams.push('order_by=' + x + ':' + tableSettings.ordering[x])
        }
      }
      if (tableSettings.limit) {
        urlParams.push('limit=' + tableSettings.limit[0] + ':' + tableSettings.limit[1])
      }
    }

    if (selectedTable.indexOf("data/") != -1) {
      xhr.open("GET", "/api/" + selectedTable + "?" + urlParams.join('&'))
    }
    xhr.responseType = "json"
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        dispatch({
          type: 'GRID_SET_HEAD_AND_RESULT',
          index: selectedTable,
          heads: xhr.response.keys,
          results: xhr.response.results
        })
      }
    }
    xhr.send();
  }
}