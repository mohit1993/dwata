import React, { PropTypes } from 'react'


const GridRow = ({ row }) => (<tr>
	{ row.map((col, i) => <td key={i}>{col}</td>) }
</tr>)

const Grid = ({ heads, results, onHeadClick}) => (<table className="grid">
		<thead><tr>{ heads.map((item, i) => <th key={i} onClick={() => props.onHeadClick(item)}>{item}</th>) }</tr></thead>
		<tbody>{ results ? <GridBody row={results} /> : null }</tbody>
	</table>)

Grid.contextTypes = {
  head: PropTypes.arrayOf(PropTypes.shape({
  	label: PropTypes.string.isRequired
  })).isRequired,
  results: PropTypes.array.isRequired,
  onHeadClick: PropTypes.func.isRequired
};

export default Grid