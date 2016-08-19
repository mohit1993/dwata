import { connect } from 'react-redux'
import GridComponent from '../components/Grid.jsx'
import { selectTable } from '../actions/index'


const mapStateToProps = (state) => {
  return {
    heads: state.grid.heads,
    results: state.grid.results.map(row => row.map(i => typeof i == "string" && i.length > 50 ? i.slice(0, 47) + '...' : i)),
    ordering: state.grid.ordering,
    cell: state.grid.cell
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHeadClick: index => {
      dispatch({type: 'GRID_CLICK_HEAD', head: index})
      dispatch(selectTable(index))
    },
    onCellClick: (x, y) => {
      dispatch({type: 'GRID_SET_CELL', x: x, y: y})
    }
  }
}

const Grid = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridComponent)

export default Grid
