import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';

import history from 'base/history';
import * as constants from 'base/constants';
import { selectedInList, getFromList } from 'base/common';
import { fetchListFromAPI } from 'actions';
import { GridView } from 'views/Grid';


// const mapStateToProps = (state) => {
//   var grid = state.multiGrid[state.main.selectedTable]

//   if (grid) {
//     return {
//       heads: grid.heads,
//       results: grid.results.map(row => row.map(i => typeof i === "string" && i.length > 50 ? i.slice(0, 47) + '...' : i)),
//       ordering: grid.ordering,
//       cell: grid.cell,
//       count: grid.count,
//       limit: grid.limit,
//       offset: grid.offset
//     }
//   } else {
//     return {
//       heads: [],
//       results: []
//     }
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onHeadClick: index => {
//       dispatch({type: 'GRID_CLICK_HEAD', head: index})
//       dispatch(selectTable())
//     },
//     onCellClick: (x, y) => {
//       dispatch({type: 'GRID_SET_CELL', x: x, y: y})
//     },
//     onLimitChange: limit => {
//       dispatch({type: 'GRID_SET_META', meta: 'limit', value: limit})
//       dispatch(selectTable())
//     },
//     onScroll: height => {
//       // The height of the Grid table is fixed once it has loaded the data.
//       // When the scroll offset is very close to the Grid height it means we have scrolled the bottom of the Grid.
//       console.log(window.pageYOffset, height)
//       if (window.pageYOffset < height && window.pageYOffset > height - 150) {
//         dispatch({type: 'GRID_INCR_META', meta: 'offset'})
//         dispatch(selectTable())
//       }
//     },
//     onRowDoubleClick: x => {
//       dispatch({type: 'GRID_SELECT_ROW', x: x})
//     }
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(GridView);

const visibleResults = (results, visibleIndexes) => {
  return results.map(row => row.filter((_, i) => visibleIndexes.indexOf(i) !== -1));
}


export const Grid = withRouter(connect(
  (state, ownProps) => {
    let db = ownProps.match.isExact === true ? ownProps.match.params.db : null;
    let schema = ownProps.match.isExact === true ? ownProps.match.params.schema : null;
    let heads = db && schema ? getFromList(state, constants.ENTITY_TYPE_DATA_HEAD, `/${db}/${schema}`) : Immutable.Map({});
    let results = db && schema ? getFromList(state, constants.ENTITY_TYPE_DATA_RESULT, `/${db}/${schema}`) : Immutable.Map({});
    heads = heads.get('data', Immutable.List([]))

    // From the heads we can find out which indexes in heads or result records are visible
    let visibleIndexes = heads.map((x, i) => x.get('_isOn', false) === true ? i : null).filter(x => x !== undefined);

    return {
      heads: heads.filter((_, i) => visibleIndexes.indexOf(i) !== -1),
      results: visibleResults(results.get('data', Immutable.List([])), visibleIndexes)
    }
  },

  (dispatch, ownProps) => {
    let db = ownProps.match.isExact === true ? ownProps.match.params.db : null;
    let schema = ownProps.match.isExact === true ? ownProps.match.params.schema : null;

    return {
      onMount: _ => { db ? dispatch(fetchListFromAPI(constants.ENTITY_TYPE_DATA, `/${db}/${schema}`)) : null },

      onHeadClick: index => {
        dispatch({type: 'GRID_CLICK_HEAD', head: index})
        // dispatch(selectTable())
      },

      onCellClick: (x, y) => {
        dispatch({type: 'GRID_SET_CELL', x: x, y: y})
      },

      onLimitChange: limit => {
        dispatch({type: 'GRID_SET_META', meta: 'limit', value: limit})
        // dispatch(selectTable())
      },

      onScroll: height => {
        // The height of the Grid table is fixed once it has loaded the data.
        // When the scroll offset is very close to the Grid height it means we have scrolled the bottom of the Grid.
        console.log(window.pageYOffset, height)
        if (window.pageYOffset < height && window.pageYOffset > height - 150) {
          dispatch({type: 'GRID_INCR_META', meta: 'offset'})
          // dispatch(selectTable())
        }
      },

      onRowDoubleClick: x => {
        dispatch({type: 'GRID_SELECT_ROW', x: x})
      }
    }
  }
)(GridView));