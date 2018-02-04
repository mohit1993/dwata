import { connect } from 'react-redux';

import GridView from 'views/Grid';
import { selectTable } from 'actions/index';


const mapStateToProps = (state) => {
  var grid = state.multiGrid[state.main.selectedTable]
  if (grid) {
    return {
      heads: grid.heads,
      results: grid.results.map(row => row.map(i => typeof i === "string" && i.length > 50 ? i.slice(0, 47) + '...' : i)),
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
      // The height of the Grid table is fixed once it has loaded the data.
      // When the scroll offset is very close to the Grid height it means we have scrolled the bottom of the Grid.
      console.log(window.pageYOffset, height)
      if (window.pageYOffset < height && window.pageYOffset > height - 150) {
        dispatch({type: 'GRID_INCR_META', meta: 'offset'})
        dispatch(selectTable())
      }
    },
    onRowDoubleClick: x => {
      dispatch({type: 'GRID_SELECT_ROW', x: x})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridView);