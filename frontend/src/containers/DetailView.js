import { connect } from 'react-redux'
import DetailViewComponent from '../components/DetailView.jsx'


const mapStateToProps = state => {
  var grid = state.multiGrid[state.main.selectedTable]
  if (grid && grid.selectedRow) {
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

const DetailView = connect(
  mapStateToProps
)(DetailViewComponent)

export default DetailView
