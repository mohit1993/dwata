import React from 'react'

import Sidebar from './views/sidebar.jsx'


export default class Dwata extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
  		sources: []
  	}
	}

  render() {
  	return (
  		<div id="layout" className="content pure-g">
  			<Sidebar sources={this.state.sources} />
  		</div>
  	)
  }
}

Dwata.contextTypes = {
  router: React.PropTypes.object
};
