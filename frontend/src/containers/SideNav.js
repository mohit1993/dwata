import { connect } from 'react-redux'
import SideNavComponent from '../components/SideNav.jsx'
import { selectSource, selectTable } from '../actions/index.js'


const mapStateToProps = (state) => {
  var filtered = state.sideNav.sources ? state.sideNav.sources.filter(x => x.active) : null
  var selectedSource = state.main.selectedSource ? state.sources.filter(x => x.index == state.main.selectedSource)[0] : null

  return {
    isVisible: state.topNav.filter(x => x.index == "top-nav-dwata")[0].active,
    sources: state.sources.map(x => { return {index: x.index, label: x.label, active: selectedSource ? x.index === selectedSource.index : false}}),
    tables: selectedSource ? state.tables.
      filter(x => selectedSource.tables.findIndex(t => t == x.index) != -1).
      map(x => { return {index: x.index, label: x.label, active: false} }) : []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: index => {
      dispatch({type: 'SELECT_SOURCE', index: index})
      dispatch(selectSource(index))
    },
    onClick: index => {
      dispatch({type: 'SELECT_TABLE', index: index})
      dispatch({
        type: 'TOPNAV_ADD',
        nav: {
          side: 'left',
          index: index,
          active: true,
          shortcut: true
        }
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
