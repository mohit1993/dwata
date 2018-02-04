import { connect } from 'react-redux'
import SideNavComponent from '../components/SideNav.jsx'
import { selectSource, selectTable } from '../actions/index.js'


const mapStateToProps = (state) => {
  // The main state stores the currently selected data source
  var selectedSource = state.main.selectedSource ? state.sources.filter(x => x.index == state.main.selectedSource)[0] : null

  return {
    isVisible: state.topNav["top-nav-dwata"].active,
    sources: state.sources.map(x => { return {index: x.index, label: x.label, active: selectedSource ? x.index === selectedSource.index : false}}),
    tables: !selectedSource ? [] : selectedSource.tables.map(x => {return {index: x, label: state.tables[x].label}})
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: index => {
      // When the user selects a data source, we store this in the main state.
      // Refer to the main reducer in reducers/index.js
      dispatch({type: 'SELECT_SOURCE', index: index})
      dispatch(selectSource())
    },
    onClick: index => {
      // When user selects a table, we store this in the main state.
      // Refer to the main reducer in reducers/index.js
      dispatch({type: 'SELECT_TABLE', index: index})
      // Each selected table is added to the top navigation as a shortcut.
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
