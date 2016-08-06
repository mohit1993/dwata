export const navAddItem = (nav) => {
	return {
		type: 'NAVBAR_NAV_ADD',
		nav: nav
	}
}

export const navClickItem = (index) => {
	return {
		type: 'NAVBAR_NAV_CLICK',
		index: index
	}
}

export const topNavClickItem = (index) => {
	return {
		type: 'TOPNAV_NAV_CLICK',
		index: index
	}
}
