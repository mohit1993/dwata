import { connect } from 'react-redux'
import GridComponent from '../components/Grid.jsx'

const mapStateToProps = (state) => {
  return {
    heads: state.grid.heads,
    results: state.grid.results,
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
