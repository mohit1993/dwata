import React, { PropTypes } from 'react'


const GridDash = ({ cell, limit, onChange }) => (<div id="grid-dash">
  { cell ? <div className="cell-data">{cell}</div> : null }
  <div className="grid-limit">Limit <select onChange={() => onChange(e.target.value)}>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="500">500</option>
    <option value="1000">1000</option>
  </select></div>
</div>)

const GridPagination = ({ page, onChange }) => (<div id="grid-page">
  <div className=""></div>
</div>)

const GridRow = ({ rowID, row, onClick }) => (<tr>
  { row.map((col, i) => <td key={i} onClick={() => onClick(rowID, i)}>{col}</td>) }
</tr>)

const Grid = ({ heads, results, onHeadClick, ordering, cell, onCellClick }) => (<div className="grid-cont">
  { heads.length ? <GridDash cell={cell} heads={heads} /> : null }
  <table className="grid">
    <thead><tr>
      { heads.map((item, i) => <th key={i} onClick={() => onHeadClick(item)}
        className={ordering[item]}>{item}</th>) }
    </tr></thead>
    <tbody>{ results.map((row, i) => <GridRow rowID={i} row={row} key={i} onClick={onCellClick} />) }</tbody>
  </table>
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