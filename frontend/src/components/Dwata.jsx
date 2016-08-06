import React from 'react'

import TopNav from '../containers/TopNav.js'
// import Grid from './views/grid.jsx'
// import Query from './views/query.jsx'

// export default class Dwata extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
//   		sources: null,
//   		currentSource: null,
//   		schema: null,
//   		currentTable: null,
//   		queryResult: null,
//   		columnOrder: null,
//   		queryBox: false
//   	}
//   	this.fetchSources = this.fetchSources.bind(this)
//   	this.fetchSchema = this.fetchSchema.bind(this)
//   	this.fetchData = this.fetchData.bind(this)
//   	this.changeColumnOrder = this.changeColumnOrder.bind(this)
//   	this.toggleState = this.toggleState.bind(this)
//   	this.fetchQueryData = this.fetchQueryData.bind(this)

//   	this.fetchSources()
// 	}

// 	fetchSources() {
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("GET", "/api/source/");
// 		xhr.responseType = "json";
// 		xhr.onreadystatechange = (() => {
// 			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
// 				this.setState({sources: xhr.response});
// 			}
// 		}).bind(this);
// 		xhr.send();
// 	}

// 	fetchSchema(sourceId) {
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("GET", "/api/schema/" + sourceId + "/");
// 		xhr.responseType = "json"
// 		xhr.onreadystatechange = (() => {
// 			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
// 				this.setState({
// 					schema: xhr.response,
// 					currentSource: sourceId
// 				});
// 			}
// 		}).bind(this);
// 		xhr.send();
// 	}

// 	fetchData(tableId, columnOrder = null) {
// 		var xhr = new XMLHttpRequest();
// 		columnOrder = columnOrder || this.state.columnOrder;
// 		var urlParams = []
// 		if (columnOrder) {
// 			for (var x in columnOrder) {
// 				urlParams.push('order_by=' + x + ':' + columnOrder[x]);
// 			}
// 		}
// 		xhr.open("GET", "/api/table/data/" + this.state.currentSource + "/" + tableId + "/?" + urlParams.join('&'));
// 		xhr.responseType = "json"
// 		xhr.onreadystatechange = (() => {
// 			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
// 				this.setState({
// 					queryResult: xhr.response,
// 					currentTable: tableId,
// 					columnOrder: columnOrder
// 				});
// 			}
// 		}).bind(this);
// 		xhr.send();
// 	}

// 	fetchQueryData(query, columnOrder = null) {
// 		var xhr = new XMLHttpRequest();
// 		columnOrder = columnOrder || this.state.columnOrder;
// 		var urlParams = []
// 		if (columnOrder) {
// 			for (var x in columnOrder) {
// 				urlParams.push('order_by=' + x + ':' + columnOrder[x]);
// 			}
// 		}
// 		xhr.open("POST", "/api/query/" + this.state.currentSource + "/?" + urlParams.join('&'));
// 		xhr.setRequestHeader("Content-type", "application/json")
// 		xhr.responseType = "json"
// 		xhr.onreadystatechange = (() => {
// 			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
// 				this.setState({
// 					queryResult: xhr.response,
// 					columnOrder: columnOrder
// 				});
// 			}
// 		}).bind(this);
// 		xhr.send(JSON.stringify({query: query}));
// 	}

// 	changeColumnOrder(column, order) {
// 		var columnOrder = this.state.columnOrder || {};
// 		if (column in columnOrder) {
// 			if (columnOrder[column] == 'asc') {
// 				columnOrder[column] = 'desc'
// 			} else {
// 				delete columnOrder[column]
// 			}
// 		} else {
// 			columnOrder[column] = 'asc'
// 		}
// 		this.fetchData(this.state.currentTable, columnOrder);
// 	}

// 	toggleState(variable) {
// 		var temp = {}
// 		temp[variable] = !this.state[variable]
// 		this.setState(temp)
// 	}

//   render() {
//   	return (<div>
//   		<Navbar
// 				sources={this.state.sources}
// 				currentSource={this.state.currentSource}
// 				schema={this.state.schema}
// 				currentTable={this.state.currentTable}
// 				fetchSchema={this.fetchSchema}
// 				fetchData={this.fetchData}
// 				toggleParentState={this.toggleState} />
// 			{ this.state.queryBox ? <Query fetchQueryData={this.fetchQueryData} /> : null }
//   		<Grid
// 				schema={this.state.schema}
// 				currentTable={this.state.currentTable}
// 				queryResult={this.state.queryResult}
// 				ordering={this.state.columnOrder}
// 				changeColumnOrder={this.changeColumnOrder} />
//   	</div>)
//   }
// }

// Dwata.contextTypes = {
//   router: React.PropTypes.object
// };

const Dwata = () => (<div>
	<TopNav />
</div>)

export default Dwata
