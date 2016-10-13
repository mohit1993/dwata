import React, { PropTypes } from 'react'


const GridDash = ({ cell, limit, onLimitChange }) => (<div id="grid-dash">
  { cell ? <div className="cell-data">{cell}</div> : null }
  { <div className="grid-limit">Limit <select onChange={e => onLimitChange(e.target.value)} value={limit}>
    <option value="100">100</option>
    <option value="300">300</option>
    <option value="600">600</option>
    <option value="1000">1000</option>
    <option value="3000">3000</option>
    <option value="6000">6000</option>
  </select></div> }
</div>)

const GridPagination = ({ count, limit, offset, onPageChange }) => {
  var pages = []
  var activePage = offset / limit + 1
  if (count/limit > 10) {
    pages.push(1)
    pages.push(2)
    pages.push('...')
    pages.push(Math.floor(count/(limit*5)))
    pages.push(Math.floor(count/(limit*5) * 2))
    pages.push(Math.floor(count/(limit*5) * 3))
    pages.push(Math.floor(count/(limit*5) * 4))
    pages.push('...')
    pages.push(Math.floor(count/limit) - 1)
    pages.push(Math.floor(count/limit))
  }
  return (<div id="grid-pagination">
    <ul>{ pages.map((x, i) => <li key={i} onClick={() => onPageChange(x)} className={offset == (x - 1) * limit ? "active" : null}>{x}</li>) }</ul>
  </div>)
}

const GridRow = ({ rowID, row, onClick, onDoubleClick }) => (<tr>
  { row.map((col, i) => <td key={i} onClick={() => onClick(rowID, i)} onDoubleClick={() => onDoubleClick(rowID)}>{col}</td>) }
</tr>)

class Grid extends React.Component {
  constructor(heads, results, onHeadClick, ordering, cell, onCellClick, count, limit,
    offset, onLimitChange, onPageChange, onScroll, onRowDoubleClick) {
    super(heads, results, onHeadClick, ordering, cell, onCellClick, count, limit,
      offset, onLimitChange, onPageChange, onScroll, onRowDoubleClick)
    this.onScroll = this.onScroll.bind(this)
  }

  onScroll() {
    this.props.onScroll(this._table.offsetHeight)
  }

  componentDidUpdate() {
    window.addEventListener('scroll', this.onScroll)
  }

  render() {
    var { heads, results, onHeadClick, ordering, cell, onCellClick, count, limit,
      offset, onLimitChange, onPageChange, onScroll, onRowDoubleClick } = this.props;
    return (<div className="grid-cont">
      { heads.length ? <GridDash cell={cell} heads={heads} limit={limit} onLimitChange={onLimitChange} /> : null }
      <table className="grid" id="grid-table" ref={(c) => this._table = c}>
        <thead><tr>
          { heads.map((item, i) => <th key={i} onClick={() => onHeadClick(item)}
            className={ordering[item]}>{item}</th>) }
        </tr></thead>
        <tbody>{ results.map((row, i) => <GridRow rowID={i} row={row} key={i} onClick={onCellClick} onDoubleClick={onRowDoubleClick} />) }</tbody>
      </table>
      { heads.length ? <GridPagination count={count} limit={limit} offset={offset} onPageChange={onPageChange} /> : null }
    </div>)
  }
}

Grid.propTypes = {
  heads: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  ordering: PropTypes.object,
  onHeadClick: PropTypes.func.isRequired,
  cell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object
  ])
};

export default Grid