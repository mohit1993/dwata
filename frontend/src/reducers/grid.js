import { combineReducers } from 'redux'


const gridOperations = (state, action) => {
  switch (action.type) {
    case 'GRID_CLICK_HEAD':
      var current = state.ordering[action.head]
      return Object.assign({}, state, {
        ordering: Object.assign({}, state.ordering, {
          [action.head]: current === 'asc' ? 'desc' : (current === 'desc' ? null : 'asc')
        })
      })

    default:
      return state
  }
}

const defaultGridData = { heads: [], results: [], ordering: {}, filters: {},
  group_by: {}, cell: null, active: false, index: null, count: 0, limit: 100, offset: 0,
  ajaxLoading: false, selectedRow: null, hasSynced: false }

const grid = (state = defaultGridData, action) => {
  switch (action.type) {
    case 'GRID_SET_HEAD':
      return Object.assign({}, state, {
        index: action.index,
        heads: action.heads
      })

    case 'GRID_SET_RESULT':
      return Object.assign({}, state, {
        index: action.index,
        results: state.results.concat(action.results),
        ajaxLoading: false,
        hasSynced: true
      })

    case 'GRID_RESET':
      return Object.assign({}, state, {
        heads: [],
        results: [],
        ordering: {},
        filters: {},
        group_by: {},
        cell: null,
        count: 0,
        limit: 100,
        offset: 0,
        selectedRow: null,
        hasSynced: false
      })

    case 'GRID_CLICK_HEAD':
      return gridOperations(state, action)

    case 'GRID_SET_CELL':
      return Object.assign({}, state, {
        cell: state.results[action.x][action.y]
      })

    case 'GRID_SELECT_ROW':
      return Object.assign({}, state, {
        selectedRow: action.x
      })

    case 'SELECT_TABLE':
      return Object.assign({}, state, {
        active: state.index == null || state.index === action.index ? true : false
      })

    case 'GRID_INIT_TABLE':
      return state

    case 'GRID_SET_META':
      if (action.meta == 'limit' || action.meta == 'offset') {
        return Object.assign({}, state, {
          [action.meta]: action.value,
          hasSynced: false
        })
      } else if (action.meta == 'ajaxLoading' || action.meta == 'count' ) {
        return Object.assign({}, state, {
          [action.meta]: action.value
        })
      }
      return state

    case 'GRID_INCR_META':
      if (action.meta == 'offset') {
        return Object.assign({}, state, {
          offset: state.offset + state.limit,
          hasSynced: false
        })
      }
      return state

    default:
      return state
  }
}

const multiGrid = (state = {}, action) => {
  switch (action.type) {
    case 'GRID_SET_HEAD':
    case 'GRID_SET_RESULT':
      var idx = Object.keys(state).indexOf(action.index)
      return Object.assign({}, state, {
        [action.index]: grid(idx == -1 ? undefined : state[action.index], action)
      })

    case 'GRID_CLICK_HEAD':
    case 'GRID_SET_CELL':
    case 'GRID_SELECT_ROW':
      var active = Object.keys(state).filter(x => state[x].active === true)[0]
      return Object.assign({}, state, {
        [active]: grid(state[active], action)
      })

    case 'GRID_SET_HEAD_AND_RESULT':
      var idx = Object.keys(state).indexOf(action.index)
      var gridData = idx == -1 ? undefined : state[action.index]
      gridData = grid(gridData, {type: 'GRID_SET_HEAD', index: action.index, heads: action.heads})
      gridData = grid(gridData, {type: 'GRID_SET_RESULT', index: action.index, results: action.results})
      gridData = grid(gridData, {type: 'GRID_SET_META', meta: 'count', value: action.count})

      return Object.assign({}, state, {
        [action.index]: gridData
      })

    case 'SELECT_TABLE':
      var idx = Object.keys(state).indexOf(action.index)
      var newState = {}
      if (idx == -1) {
        newState[action.index] = grid(undefined, {type: 'GRID_INIT_TABLE'})
        newState[action.index] = grid(undefined, action)
      }
      for (var x in state) {
        newState[x] = grid(state[x], action)
      }
      return newState

    case 'GRID_SET_META':
      var active = Object.keys(state).filter(x => state[x].active === true)[0]
      return Object.assign({}, state, {
        [active]: grid(state[active], action)
      })

    case 'GRID_INCR_META':
      var active = Object.keys(state).filter(x => state[x].active === true)[0]
      return Object.assign({}, state, {
        [active]: grid(state[active], action)
      })

    default:
      return state
  }
}

export default multiGrid