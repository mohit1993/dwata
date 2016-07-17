import React from 'react'


const GridHead = (props) => <thead><tr>
		{ props.headings.map((head, i) => <th key={i}>{head.name}</th>) }
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
		{ Object.keys(row).map((col) => col[0] != "_" ? <td key={col}>{row[col]}</td> : null)
		}
	</tr>)
}

const GridBody = (props) => <tbody>
		{ props.records.map((row) => <GridRow row={row} key={row.id} />) }
	</tbody>


export default (props) => {
	var headings = [];
	if (props.schema && props.currentTable) {
		headings = props.schema[props.currentTable];
	}

	return (<table className="pure-table pure-table-horizontal pure-table-striped" style={{width: "100%"}}>
			<GridHead headings={headings} />
			{ props.records ? <GridBody records={props.records} /> : null }
		</table>)
}