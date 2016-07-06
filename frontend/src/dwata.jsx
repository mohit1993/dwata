import React from 'react'
import Immutable from 'immutable'

import Sidebar from './views/sidebar.jsx'


export default class Dwata extends React.createClass {
	constructor(props) {
		super(props);
		this.state = Immutable.Map({
  		sources: Immutable.List()
  	})
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
