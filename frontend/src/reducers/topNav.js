const firstNavItem = {
  label: 'Dwata',
  index: 'top-nav-dwata',
  meta: null,
  active: false,
  side: 'left'
}

const nav = (state = {}, action) => {
  switch (action.type) {
    case 'TOPNAV_ADD':
      return Object.assign({}, action.nav, {
        index: action.nav.index,
        active: action.nav.active != undefined ? action.nav.active : false
      })

    case 'TOPNAV_CLICK':
      if (state.index !== action.index) {
        return state
      }

      return Object.assign({}, state, {
        active: !state.active
      })

    default:
      return state
  }
}

const topNav = (state = [firstNavItem], action) => {
  switch (action.type) {
    case 'TOPNAV_ADD':
    case 'SELECT_TABLE':
      return [...state, nav(undefined, action)]

    case 'TOPNAV_CLICK':
      return state.map(t => nav(t, action))

    default:
      return state
  }
}

export default topNav
