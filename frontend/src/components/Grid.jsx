import React, { PropTypes } from 'react'


const GridRow = ({ rowID, row, onClick }) => (<tr>
  { row.map((col, i) => <td key={i} onClick={() => onClick(rowID, i)}>{col}</td>) }
</tr>)

const Grid = ({ heads, results, onHeadClick, ordering, cell, onCellClick }) => (<div className="grid-cont">
  { heads.length ? <div className="sel-data">{cell}</div> : null }
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