import React from 'react'

import Sidebar from './views/sidebar.jsx'


export default class Dwata extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
  		sources: [],
  		current_source: null,
  		schema: {},
  		current_table: null,
  		table_data: []
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

	fetchSchema(source_id) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/schema/" + source_id + "/");
		xhr.responseType = "json"
		xhr.onreadystatechange = (() => {
			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({
					schema: xhr.response,
					current_source: source_id
				});
			}
		}).bind(this);
		xhr.send();
	}

	fetchData(table_id) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/table/data/" + this.state.current_source + "/" + table_id + "/");
		xhr.responseType = "json"
		xhr.onreadystatechange = (() => {
			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({
					table_data: xhr.response,
					current_table: table_id
				});
			}
		}).bind(this);
		xhr.send();
	}

  render() {
  	return (
  		<div id="layout" className="content pure-g">
  			<Sidebar
  				sources={this.state.sources}
  				current_source={this.state.current_source}
  				fetchSources={this.fetchSources}
  				schema={this.state.schema}
  				current_table={this.state.current_table}
  				fetchSchema={this.fetchSchema}
  				fetchData={this.fetchData} />
  		</div>
  	)
  }
}

Dwata.contextTypes = {
  router: React.PropTypes.object
};
