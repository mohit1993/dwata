import React from 'react'

import Navbar from './views/navbar.jsx'
import Grid from './views/grid.jsx'


export default class Dwata extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
  		sources: null,
  		currentSource: null,
  		schema: null,
  		currentTable: null,
  		queryResult: null
  	}
  	this.fetchSources = this.fetchSources.bind(this);
  	this.fetchSchema = this.fetchSchema.bind(this);
  	this.fetchData = this.fetchData.bind(this);
	}

	fetchSources() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/source/");
		xhr.responseType = "json";
		xhr.onreadystatechange = (() => {
			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({sources: xhr.response});
			}
		}).bind(this);
		xhr.send();
	}

	fetchSchema(sourceId) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/schema/" + sourceId + "/");
		xhr.responseType = "json"
		xhr.onreadystatechange = (() => {
			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({
					schema: xhr.response,
					currentSource: sourceId
				});
			}
		}).bind(this);
		xhr.send();
	}

	fetchData(tableId) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/table/data/" + this.state.currentSource + "/" + tableId + "/");
		xhr.responseType = "json"
		xhr.onreadystatechange = (() => {
			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({
					queryResult: xhr.response,
					currentTable: tableId
				});
			}
		}).bind(this);
		xhr.send();
	}

  render() {
  	return (<div>
  		<Navbar
				sources={this.state.sources}
				currentSource={this.state.currentSource}
				fetchSources={this.fetchSources}
				schema={this.state.schema}
				currentTable={this.state.currentTable}
				fetchSchema={this.fetchSchema}
				fetchData={this.fetchData} />
  		<Grid
				schema={this.state.schema}
				currentTable={this.state.currentTable}
				queryResult={this.state.queryResult} />
  	</div>)
  }
}

Dwata.contextTypes = {
  router: React.PropTypes.object
};
