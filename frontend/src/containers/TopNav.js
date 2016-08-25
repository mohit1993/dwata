import { connect } from 'react-redux'
import TopNavComponent from '../components/TopNav.jsx'
import { topNavClick } from '../actions/index.js'


const getNav = (navItems, side) => {
  switch (side) {
    case 'TOPNAV_LEFT':
      return Object.keys(navItems).
        filter(x => navItems[x].side == 'left').
        map(x => Object.assign({}, navItems[x], {index: x}))

    case 'TOPNAV_RIGHT':
      return Object.keys(navItems).
        filter(x => navItems[x].side == 'right').
        map(x => Object.assign({}, navItems[x], {index: x}))
  }
}

const mapStateToProps = (state) => {
  return {
    leftNav: getNav(state.topNav, 'TOPNAV_LEFT').map(x => x.shortcut ? Object.assign({}, x, {
      label: state.tables[x.index].label,
      active: x.index == state.main.selectedTab ? true : x.active
    }) : x),
    rightNav: getNav(state.topNav, 'TOPNAV_RIGHT')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (index) => {
      if (index.indexOf("data/") != -1) {
        dispatch({type: 'TOPNAV_CLICK', index: index})
        dispatch({type: 'SELECT_TABLE', index: index})
      } else if (index.indexOf("query/") != -1) {
        dispatch({type: 'TOPNAV_CLICK', index: index})
        dispatch({type: 'SELECT_TABLE', index: index})
      } else {
        dispatch({type: 'TOPNAV_CLICK', index: index})
      }
    }
  }
}

const TopNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavComponent)

export default TopNav
