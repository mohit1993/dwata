let nextNavIndex = 0

const firstNavItem = {
	label: 'Sources',
	index: 'tnav-' + nextNavIndex++,
	meta: null,
	active: false
}

const nav = (state = firstNavItem, action) => {
	if (typeof action === 'undefined') {
		return state
	}

	switch (action.type) {
		case 'TOPNAV_ADD':
			return Object.assign({}, action.nav, {
				index: nextNavIndex++,
				active: false
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

const topNav = (state = [], action) => {
	switch (action.type) {
		case 'TOPNAV_ADD':
			return [...state, nav(undefined, action)]

		case 'TOPNAV_CLICK':
			return state.map(t => nav(t, action))

		default:
			return [nav()]
	}
}

export default topNav
