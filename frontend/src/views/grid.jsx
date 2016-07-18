import React from 'react'


const GridHead = (props) => <thead><tr>
		{ props.headings.map((head, i) => <th key={i}>{head}</th>) }
	</tr></thead>


const GridRow = (props) => {
	var row = props.row;
	for (var x in row) {
		if (typeof row[x] == "string" && row[x].length > 30) {
			row["_" + x] = row[x];
			row[x] = row[x].substring(0, 30) + "...";
		}
	}
	return (<tr>
		{ Object.keys(row).map((col) => col[0] != "_" ? <td key={col}>{row[col]}</td> : null) }
	</tr>)
}

const GridBody = (props) => <tbody>
		{ props.records.map((row, i) => <GridRow row={row} key={i} />) }
	</tbody>


export default (props) => {
	var headings = [];
	if (props.queryResult) {
		headings = props.queryResult.keys;
	}

	return (<table className="pure-table pure-table-horizontal pure-table-striped" style={{width: "100%"}}>
			<GridHead headings={headings} />
			{ props.queryResult ? <GridBody records={props.queryResult.results} /> : null }
		</table>)
}