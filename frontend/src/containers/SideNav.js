import { connect } from 'react-redux'
import SideNavComponent from '../components/SideNav.jsx'
import { selectSource, selectTable } from '../actions/index.js'


const mapStateToProps = (state) => {
  var filtered = state.sideNav.items ? state.sideNav.items.filter(x => x.active) : null
  return {
    isVisible: state.sideNav.isVisible,
    items: state.sideNav.items,
    selectedIndex: filtered  && filtered.length ? filtered[0].index : null,
    children: state.sideNav.children
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: index => {
      dispatch({
        type: 'SIDENAV_CLICK',
        index: index
      })
      dispatch(selectSource(index))
    },
    onClick: index => {
      dispatch(selectTable(index))
    }
  }
}

const SideNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavComponent)

export default SideNav
