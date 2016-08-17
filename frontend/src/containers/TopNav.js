import { connect } from 'react-redux'
import TopNavComponent from '../components/TopNav.jsx'
import { topNavClick } from '../actions/index.js'


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

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (index) => {
      dispatch(topNavClick(index))
    }
  }
}

const TopNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavComponent)

export default TopNav
