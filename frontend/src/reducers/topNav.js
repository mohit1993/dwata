const defaultTopNav = {
  'top-nav-dwata': {
    label: 'Dwata',
    meta: null,
    active: false,
    side: 'left'
  }
}

const toggleActive = (state, index) => {
  var newState = {}
  for (var k in state) {
    var v = state[k]
    newState[k] = k != index ? Object.assign({}, v, {
      active: false
    }) : Object.assign({}, v, {
      active: !v.active
    })
  }
  return newState
}

const topNav = (state = defaultTopNav, action) => {
  switch (action.type) {
    case 'TOPNAV_ADD':
      if (Object.keys(state).indexOf(action.nav.index) != -1) {
        // The item exists, just set active correctly
        return toggleActive(state, action.nav.index)
      } else {
        // New item, insert into our object of nav items
        // We set the initial active to reverse of what we want, since the toggleActive
        //   will reverse it again
        var newState = Object.assign({}, state, {
          [action.nav.index]: Object.assign({}, action.nav, {
            active: action.nav && !action.nav.active || true
          })
        })
        return toggleActive(newState, action.nav.index)
      }

    case 'TOPNAV_CLICK':
      return toggleActive(state, action.index)

    default:
      return state
  }
}

export default topNav
