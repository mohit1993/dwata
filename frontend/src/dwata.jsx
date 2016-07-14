import React from 'react'

import Sidebar from './views/sidebar.jsx'


export default class Dwata extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
  		sources: []
  	}
  	this.fetchSources = this.fetchSources.bind(this);
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

  render() {
  	return (
  		<div id="layout" className="content pure-g">
  			<Sidebar sources={this.state.sources} fetchSources={this.fetchSources} />
  		</div>
  	)
  }
}

Dwata.contextTypes = {
  router: React.PropTypes.object
};
