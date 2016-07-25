import React from 'react'


const GridHead = (props) => <thead><tr>
		{ props.headings.map((head, i) => <th
				key={i}
				onClick={ (e) => { e.preventDefault(); props.handleHeadClick(head); } }
				style={{cursor: "pointer"}}>
				{head} { props.ordering && head in props.ordering ? <i className={"fa fa-sort-" + props.ordering[head]} aria-hidden="true"></i> : null }</th>) }
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


export default class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			schema: null,
			currentTable: null,
			queryResult: props.queryResult
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.queryResult)
		this.setState({
			schema: nextProps.schema,
			currentTable: nextProps.currentTable,
			queryResult: nextProps.queryResult
		})
	}

	render() {
		var headings = [];
		if (this.state.queryResult) {
			headings = this.state.queryResult.keys;
		}

		return (<table className="pure-table pure-table-horizontal pure-table-striped" style={{width: "100%"}}>
				<GridHead headings={headings} handleHeadClick={this.props.changeColumnOrder} ordering={this.props.columnOrder} />
				{ this.state.queryResult ? <GridBody records={this.state.queryResult.results} /> : null }
			</table>)
	}
}

Grid.contextTypes = {
  router: React.PropTypes.object
};
