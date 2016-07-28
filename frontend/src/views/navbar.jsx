import React from 'react'


const NavbarMenuItemSub = (props) => <li className="menu-item">
		<a href="#" className="menu-link"
			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler(props.id) } : null }>
			{props.label} { props.meta ? <span className="meta">({props.meta})</span> : null }
		</a>
	</li>


const NavbarMenuItem = (props) => {
	var subMenu = null,
		subRows = 12,
		colMenus = [],
		subs = props.subMenuItems

	if (subs && subs.length) {
		if (subs.length > subRows) {
			for (var cols = 0; cols < (subs.length / subRows); cols ++) {
				colMenus.push(<ul className="menu-child" key={ cols }>
					{ subs.slice(cols * subRows, (cols + 1) * subRows).map((item, i) => <NavbarMenuItemSub
						key={item.id} id={item.id}
						label={item.label} clickHandler={props.subClickHandler} />) }
					</ul>)
			}
		} else {
			colMenus.push(<ul className="menu-child" key="one">
				{ subs.map((item, i) => <NavbarMenuItemSub key={item.id} id={item.id}
					label={item.label} clickHandler={props.subClickHandler} />) }
				</ul>)
		}
		subMenu = <div className="menu-child-box" style={{ width: (subs.length > subRows ? Math.floor(subs.length/subRows) : 1) * 160 + "px" }}>{ colMenus }</div>
	}

	return (<li className={subMenu ? "menu-item has-children" : "pure-menu-item"}>
		<a href="#" className="pure-menu-link"
			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler(props.id) } : null }>
			{props.label} { props.meta ? <span className="meta">({props.meta})</span> : null }
		</a>{subMenu}
	</li>)
}


export default class NavBar extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selected: null,
			sources: props.sources,
			currentSource: props.currentSource,
			schema: props.schema,
			currentTable: props.currentTable
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			sources: nextProps.sources,
			currentSource: nextProps.currentSource,
			schema: nextProps.schema,
			currentTable: nextProps.currentTable
		})
	}

	render() {
		var navbarItems = [];

		var sources = [];
		if (this.state.sources && this.state.selected == 'src') {
			for (var x = 0; x < this.state.sources.length; x++) {
				sources.push({id: this.state.sources[x][0], label: this.state.sources[x][0]})
			}
		}
		navbarItems.push(<NavbarMenuItem
			label="Sources"
			meta={this.state.sources ? this.state.sources.length : null}
			key="src"
			id="src"
			clickHandler={ (sel) => { this.state.selected == "src" ? this.setState({selected: null}) : this.setState({selected: sel}) } }
			subMenuItems={sources}
			subClickHandler={this.props.fetchSchema} />)

		var schema = [];
		if (this.state.currentSource && this.state.schema && this.state.selected == 'src-' + this.state.currentSource) {
			for (var x = 0; x < this.state.schema.length; x++) {
				schema.push({id: this.state.schema[x][0], label: this.state.schema[x][0]})
			}
		}

		if (this.state.currentSource) {
			navbarItems.push(<NavbarMenuItem
				label={this.state.currentSource}
				meta={this.state.schema ? this.state.schema.length : null}
				key={"src-" + this.state.currentSource}
				id={"src-" + this.state.currentSource}
				clickHandler={ (sel) => { this.state.selected == "src-" + this.state.currentSource ? this.setState({selected: null}) : this.setState({selected: "src-" + this.state.currentSource}) } }
				subMenuItems={schema}
				subClickHandler={this.props.fetchData} />)
		}

		var rightNavbarItems = [];
		rightNavbarItems.push(<NavbarMenuItem label="Admin" key="adm" />);
	  rightNavbarItems.push(<NavbarMenuItem label="Logout" key="lot" />);

		return (<div id="top-menu">
	    <ul className="menu-list">{navbarItems}</ul>
	    <ul className="menu-list menu-right">{rightNavbarItems}</ul>
	  </div>)
	}
}