const defaultTopNav = {
  'top-nav-dwata': {
    label: 'Dwata',
    meta: null,
    active: false,
    side: 'left'
  }
}

const topNav = (state = defaultTopNav, action) => {
  switch (action.type) {
    case 'TOPNAV_ADD':
    case 'SELECT_TABLE':
      return Object.assign({}, state, {
        [action.index]: Object.assign({}, action.nav, {
          active: action.nav && action.nav.active || false
        })
      })

    case 'TOPNAV_CLICK':
      var newState = {}
      for (var k in state) {
        var v = state[k]
        newState[k] = k != action.index ? Object.assign({}, v, {
          active: false
        }) : Object.assign({}, v, {
          active: true
        })
      }
      return newState

    default:
      return state
  }
}

export default topNav
