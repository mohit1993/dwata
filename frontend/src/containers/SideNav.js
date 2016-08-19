import { connect } from 'react-redux'
import SideNavComponent from '../components/SideNav.jsx'
import { selectSource, selectTable } from '../actions/index.js'


const mapStateToProps = (state) => {
  var filtered = state.sideNav.sources ? state.sideNav.sources.filter(x => x.active) : null
  return {
    isVisible: state.sideNav.isVisible,
    sources: state.sideNav.sources,
    selectedIndex: filtered  && filtered.length ? filtered[0].index : null,
    tables: state.sideNav.tables
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
      dispatch({
        type: 'SIDENAV_CLICK_TABLE',
        index: index
      })
      dispatch(selectTable(index))
    }
  }
}

const SideNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavComponent)

export default SideNav
