import { connect } from 'react-redux';

import DetailView from 'views/DetailView';


const mapStateToProps = state => {
  var grid = state.multiGrid[state.main.selectedTable]
  if (grid && grid.selectedRow != null) {
    return {
      heads: grid.heads,
      row: grid.results[grid.selectedRow],
      schema: state.schema
    }
  } else {
    return {
      heads: [],
      row: [],
      schema: []
    }
  }
}

export default connect(
  mapStateToProps
)(DetailView);