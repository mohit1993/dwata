let nextNavIndex = 0

const firstNavItem = {
	index: 'nav-' + nextNavIndex++,
	meta: null,
	selected: false,
	subItems: []
}

const nav = (state = firstNavItem, action) => {
	switch (action.type) {
		case 'NAVBAR_NAV_ADD':
			return Object.assign({}, action.nav, {
				index: nextNavIndex++
			})

		case 'NAVBAR_NAV_CLICK':
			if (state.index !== action.index) {
				return state
			}

			return Object.assign({}, state, {
				selected: !state.selected
			})

		default:
			return state
	}
}

const sidenav = (state = [], action) => {
	switch (action.type) {
		case 'NAVBAR_NAV_ADD':
			return [...state, nav(undefined, action)]

		case 'NAVBAR_NAV_CLICK':
			return state.map(t => nav(t, action))

		default:
			return [nav()]
	}
}

export default sidenav
