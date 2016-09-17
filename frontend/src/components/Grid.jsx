import React, { PropTypes } from 'react'


const GridDash = ({ cell, limit, onLimitChange }) => (<div id="grid-dash">
  { cell ? <div className="cell-data">{cell}</div> : null }
  <div className="grid-limit">Limit <select onChange={e => onLimitChange(e.target.value)} value={limit}>
    <option value="100">100</option>
    <option value="300">300</option>
    <option value="600">600</option>
    <option value="1000">1000</option>
    <option value="3000">3000</option>
    <option value="6000">6000</option>
  </select></div>
</div>)

const GridPagination = ({ count, limit, offset, onPageChange }) => {
  var pages = []
  for (var x=0; x < count/limit; x++) {
    pages.push(x + 1)
  }
  return (<div id="grid-pagination">
    <ul>{ pages.map((x, i) => <li>{x}</li>) }</ul>
  </div>)
}

const GridRow = ({ rowID, row, onClick }) => (<tr>
  { row.map((col, i) => <td key={i} onClick={() => onClick(rowID, i)}>{col}</td>) }
</tr>)

const Grid = ({ heads, results, onHeadClick, ordering, cell, onCellClick, count, limit, offset, onLimitChange, onPageChange }) => (<div className="grid-cont">
  { heads.length ? <GridDash cell={cell} heads={heads} limit={limit} onLimitChange={onLimitChange} /> : null }
  <table className="grid">
    <thead><tr>
      { heads.map((item, i) => <th key={i} onClick={() => onHeadClick(item)}
        className={ordering[item]}>{item}</th>) }
    </tr></thead>
    <tbody>{ results.map((row, i) => <GridRow rowID={i} row={row} key={i} onClick={onCellClick} />) }</tbody>
  </table>
  { heads.length ? <GridPagination count={count} limit={limit} offset={offset} onPageChange={onPageChange} /> : null }
</div>)

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