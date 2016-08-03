import React from 'react'


export default class Query extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			text: "",
			query_list: null
		}

		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleKeyUp = this.handleKeyUp.bind(this)
	}

	handleTextChange(event) {
		this.setState({text: event.target.value})
	}

	handleKeyUp(event) {
		if (event.keyCode == 13 && event.shiftKey && this.state.text) {
			this.props.fetchQueryData(this.state.text)
		}
	}

	render() {
		return (<div id="query-box">
			<div className="query-textbox"><textarea value={this.state.text} onChange={this.handleTextChange}
			 onKeyUp={this.handleKeyUp} /></div>
		</div>)
	}
}