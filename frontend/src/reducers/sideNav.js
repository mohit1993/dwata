let nextNavIndex = 0

const nav = (state, action) => {
  if (typeof action === 'undefined') {
    return state
  }

  switch (action.type) {
    case 'SIDENAV_ADD':
      return Object.assign({}, action.nav, {
        index: action.nav.index ? action.nav.index : nextNavIndex++,
        active: false
      })

    case 'SIDENAV_CLICK':
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

const child = (state, action) => {
  if (typeof action === 'undefined') {
    return state
  }

  switch (action.type) {
    case 'SIDENAV_CHILD_ADD':
      return Object.assign({}, action.nav, {
        index: action.nav.index ? action.nav.index : nextNavIndex++,
        active: false
      })

    case 'SIDENAV_CHILD_CLICK':
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

const sideNav = (state = {isVisible: false, items: [], children: []}, action) => {
  switch (action.type) {
    case 'SIDENAV_SELECT_SOURCE':
      return Object.assign({}, state, {
        children: []
      })

    case 'SIDENAV_ADD':
      return Object.assign({}, state, {
        items: [...state.items, nav(undefined, action)]
      })

    case 'SIDENAV_CLICK':
      return Object.assign({}, state, {
        items: state.items.map(t => nav(t, action))
      })

    case 'TOPNAV_CLICK':
      if (action.index == "top-nav-dwata") {
        return Object.assign({}, state, {
          isVisible: !state.isVisible
        })
      }
      return state

    case 'SIDENAV_CHILD_ADD':
      return Object.assign({}, state, {
        children: [...state.children, child(undefined, action)]
      })

    case 'SIDENAV_CHILD_CLICK':
      return Object.assign({}, state, {
        children: state.children.map(t => child(t, action))
      })

    default:
      return state
  }
}

export default sideNav
