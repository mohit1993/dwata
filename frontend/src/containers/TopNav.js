import { connect } from 'react-redux'
import TopNavBar from '../components/TopNavBar.jsx'


const getNav = (navItems, side) => {
	switch (side) {
		case 'TOPNAV_LEFT':
			return navItems.filter(nv => nv.side == 'left')

		case 'TOPNAV_RIGHT':
			return navItems.filter(nv => nv.side == 'right')
	}
}

const mapStateToProps = (state) => {
	return {
		leftNav: getNav(state.topNav, 'TOPNAV_LEFT'),
		rightNav: getNav(state.topNav, 'TOPNAV_RIGHT')
	}
}

const TopNav = connect(
	mapStateToProps
)(TopNavBar)

export default TopNav
