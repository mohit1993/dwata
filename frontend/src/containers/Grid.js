import { connect } from 'react-redux'
import GridComponent from '../components/Grid.jsx'
import { selectTable } from '../actions/index'


const mapStateToProps = (state) => {
  var grid = state.multiGrid[state.main.selectedTable]
  if (grid) {
    return {
      heads: grid.heads,
      results: grid.results.map(row => row.map(i => typeof i == "string" && i.length > 50 ? i.slice(0, 47) + '...' : i)),
      ordering: grid.ordering,
      cell: grid.cell,
      count: grid.count,
      limit: grid.limit,
      offset: grid.offset
    }
  } else {
    return {
      heads: [],
      results: []
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHeadClick: index => {
      dispatch({type: 'GRID_CLICK_HEAD', head: index})
      dispatch(selectTable())
    },
    onCellClick: (x, y) => {
      dispatch({type: 'GRID_SET_CELL', x: x, y: y})
    },
    onLimitChange: limit => {
      dispatch({type: 'GRID_SET_META', meta: 'limit', value: limit})
      dispatch(selectTable())
    },
    onScroll: height => {
      if (window.pageYOffset < height && window.pageYOffset > height/1.35) {
        dispatch({type: 'GRID_INCR_META', meta: 'offset'})
        dispatch(selectTable())
      }
    }
  }
}

const Grid = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridComponent)

export default Grid
