import { connect } from 'react-redux';

import TopNavView from 'views/TopNav';
import { topNavClick } from 'actions/index';


const getNav = (navItems, side) => {
  switch (side) {
    case 'TOPNAV_LEFT':
      return Object.keys(navItems).
        filter(x => navItems[x].side === 'left').
        map(x => Object.assign({}, navItems[x], {index: x}))

    case 'TOPNAV_RIGHT':
      return Object.keys(navItems).
        filter(x => navItems[x].side === 'right').
        map(x => Object.assign({}, navItems[x], {index: x}))
  }
}


const mapStateToProps = (state) => {
  return {
    leftNav: getNav(state.topNav, 'TOPNAV_LEFT').map(x => x.shortcut ? Object.assign({}, x, {
      label: state.tables[x.index].label,
      active: x.index === state.main.selectedTable ? true : x.active
    }) : x),
    rightNav: getNav(state.topNav, 'TOPNAV_RIGHT')
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (index) => {
      if (index.indexOf("data/") === 0) {
        dispatch({type: 'TOPNAV_CLICK', index: index})
        dispatch({type: 'SELECT_TABLE', index: index})
      } else if (index.indexOf("query/") === 0) {
        dispatch({type: 'TOPNAV_CLICK', index: index})
        dispatch({type: 'SELECT_TABLE', index: index})
      } else {
        dispatch({type: 'TOPNAV_CLICK', index: index})
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavView);