import { connect } from 'react-redux'
import GridComponent from '../components/Grid.jsx'
import { selectSource, selectTable } from '../actions/index.js'


const mapStateToProps = (state) => {
  return {
    head: state.grid.head,
    results: state.grid.body,
    operations: state.grid.operations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHeadClick: index => {
      return false
    }
  }
}


const Grid = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridComponent)

export default Grid
