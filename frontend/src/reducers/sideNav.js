let nextNavIndex = 0

const child = (state, action) => {
  if (typeof action === 'undefined') {
    return state
  }

  switch (action.type) {
    case 'SIDENAV_ADD_TABLE':
      return Object.assign({}, action.nav, {
        index: action.nav.index ? action.nav.index : nextNavIndex++,
        active: false
      })

    case 'SIDENAV_CLICK_TABLE':
      if (state.index !== action.index && !state.active) {
        return state
      } else if (state.index !== action.index && state.active) {
        return Object.assign({}, state, {
          active: false
        })
      }

      return Object.assign({}, state, {
        active: !state.active
      })

    default:
      return state
  }
}

const sideNav = (state = {isVisible: false, tables: []}, action) => {
  switch (action.type) {
    case 'SIDENAV_SELECT_SOURCE':
      return Object.assign({}, state, {
        tables: []
      })

    case 'SIDENAV_ADD_TABLE':
      return Object.assign({}, state, {
        tables: [...state.tables, child(undefined, action)]
      })

    case 'SIDENAV_CLICK_TABLE':
      return Object.assign({}, state, {
        tables: state.tables.map(t => child(t, action))
      })

    default:
      return state
  }
}

export default sideNav
