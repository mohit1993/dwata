import React, { PropTypes } from 'react'


export const shapeNavBarSub = {
	index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	meta: PropTypes.string,
	active: PropTypes.bool
}

export const NavBarSub = ({index, label, onClick, meta, active}) => <li className="menu-item">
	{ active ? <span className="menu-link"
		onClick={ onClick ? onClick : null }>
		{label} { meta ? <span className="meta">({meta})</span> : null }
	</span> : <a href="#" className="menu-link"
		onClick={ onClick ? onClick : null }>
		{label} { meta ? <span className="meta">({meta})</span> : null }
	</a> }
</li>

NavBarSub.propTypes = shapeNavBarSub


// const NavBarSub = (props) => <li className="menu-item">
// 		<a href="#" className="menu-link"
// 			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler(props.id) } : null }>
// 			{props.label} { props.meta ? <span className="meta">({props.meta})</span> : null }
// 		</a>
// 	</li>


const NavBarItem = ({ index, label, onClick, meta, active, subItems }) => {
	var subMenu = null,
		subRows = 12,
		colMenus = []

	if (subItems && subItems.length) {
		for (var cols = 0; cols < (subItems.length / subRows); cols ++) {
			colMenus.push(<ul className="menu-child" key={ 'nav-col-' + cols }>
				{ subItems.slice(cols * subRows, (cols + 1) * subRows).map((item, i) => <NavBarSub
					key={item.index} {...item} onClick={() => onClick(item.index)} />) }
				</ul>)
		}
		subMenu = <div className="menu-child-box"
			style={{ width: (subItems.length > subRows ? Math.floor(subItems.length/subRows) : 1) * 160 + "px" }}>
			{ colMenus }
		</div>
	}

	return (<li className={subMenu ? "menu-item has-children" : "pure-menu-item"}>
		<a href="#" className="pure-menu-link"
			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler(props.id) } : null }>
			{props.label} { props.meta ? <span className="meta">({props.meta})</span> : null }
		</a>{subMenu}
	</li>)
}

NavBarItem.propTypes = Object.assign({}, shapeNavBarSub, {
	subItems: PropTypes.arrayOf(PropTypes.shape(shapeNavBarSub))
})


// const NavBarMenuItem = (props) => {
// 	var subMenu = null,
// 		subRows = 12,
// 		colMenus = [],
// 		subItems = props.subMenuItems

// 	if (subItems && subItems.length) {
// 		if (subItems.length > subRows) {
// 			for (var cols = 0; cols < (subItems.length / subRows); cols ++) {
// 				colMenus.push(<ul className="menu-child" key={ cols }>
// 					{ subItems.slice(cols * subRows, (cols + 1) * subRows).map((item, i) => <NavBarSub
// 						key={item.id} id={item.id}
// 						label={item.label} clickHandler={props.subClickHandler} />) }
// 					</ul>)
// 			}
// 		} else {
// 			colMenus.push(<ul className="menu-child" key="one">
// 				{ subItems.map((item, i) => <NavBarSub key={item.id} id={item.id}
// 					label={item.label} clickHandler={props.subClickHandler} />) }
// 				</ul>)
// 		}
// 		subMenu = <div className="menu-child-box" style={{ width: (subItems.length > subRows ? Math.floor(subItems.length/subRows) : 1) * 160 + "px" }}>{ colMenus }</div>
// 	}

// 	return (<li className={subMenu ? "menu-item has-children" : "pure-menu-item"}>
// 		<a href="#" className="pure-menu-link"
// 			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler(props.id) } : null }>
// 			{props.label} { props.meta ? <span className="meta">({props.meta})</span> : null }
// 		</a>{subMenu}
// 	</li>)
// }


// export class NavBar extends React.Component {
// 	render() {
// 		var navbarItems = [];

// 		var sources = [];
// 		if (this.state.sources && this.state.selected == 'src') {
// 			for (var x = 0; x < this.state.sources.length; x++) {
// 				sources.push({id: this.state.sources[x][0], label: this.state.sources[x][0]})
// 			}
// 		}
// 		navbarItems.push(<NavBarMenuItem
// 			label="Sources"
// 			meta={this.state.sources ? this.state.sources.length : null}
// 			key="src"
// 			id="src"
// 			clickHandler={ (sel) => { this.state.selected == "src" ? this.setState({selected: null}) : this.setState({selected: sel}) } }
// 			subMenuItems={sources}
// 			subClickHandler={this.props.fetchSchema} />)

// 		var schema = [];
// 		if (this.state.currentSource && this.state.schema && this.state.selected == 'src-' + this.state.currentSource) {
// 			for (var x = 0; x < this.state.schema.length; x++) {
// 				schema.push({id: this.state.schema[x][0], label: this.state.schema[x][0]})
// 			}
// 		}

// 		if (this.state.currentSource) {
// 			navbarItems.push(<NavBarMenuItem
// 				label={this.state.currentSource}
// 				meta={this.state.schema ? this.state.schema.length : null}
// 				key={"src-" + this.state.currentSource}
// 				id={"src-" + this.state.currentSource}
// 				clickHandler={ (sel) => { this.state.selected == "src-" + this.state.currentSource ? this.setState({selected: null}) : this.setState({selected: "src-" + this.state.currentSource}) } }
// 				subMenuItems={schema}
// 				subClickHandler={this.props.fetchData} />)

// 			if (this.state.currentSource) {
// 				navbarItems.push(<NavBarMenuItem
// 						label="Query"
// 						key="query"
// 						id="query"
// 						clickHandler={ () => { this.props.toggleParentState('queryBox') } }
// 					/>)
// 			}
// 		}

// 		var rightNavbarItems = [];
// 		rightNavbarItems.push(<NavBarMenuItem label="Admin" key="adm" />);
// 	  rightNavbarItems.push(<NavBarMenuItem label="Logout" key="lot" />);

// 		return (<div id="top-menu">
// 	    <ul className="menu-list">{navbarItems}</ul>
// 	    <ul className="menu-list menu-right">{rightNavbarItems}</ul>
// 	  </div>)
// 	}
// }


// export default class NavBar extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			selected: null,
// 			sources: props.sources,
// 			currentSource: props.currentSource,
// 			schema: props.schema,
// 			currentTable: props.currentTable
// 		}
// 	}

// 	componentWillReceiveProps(nextProps) {
// 		this.setState({
// 			sources: nextProps.sources,
// 			currentSource: nextProps.currentSource,
// 			schema: nextProps.schema,
// 			currentTable: nextProps.currentTable
// 		})
// 	}

// 	render() {
// 		var navbarItems = [];

// 		var sources = [];
// 		if (this.state.sources && this.state.selected == 'src') {
// 			for (var x = 0; x < this.state.sources.length; x++) {
// 				sources.push({id: this.state.sources[x][0], label: this.state.sources[x][0]})
// 			}
// 		}
// 		navbarItems.push(<NavBarMenuItem
// 			label="Sources"
// 			meta={this.state.sources ? this.state.sources.length : null}
// 			key="src"
// 			id="src"
// 			clickHandler={ (sel) => { this.state.selected == "src" ? this.setState({selected: null}) : this.setState({selected: sel}) } }
// 			subMenuItems={sources}
// 			subClickHandler={this.props.fetchSchema} />)

// 		var schema = [];
// 		if (this.state.currentSource && this.state.schema && this.state.selected == 'src-' + this.state.currentSource) {
// 			for (var x = 0; x < this.state.schema.length; x++) {
// 				schema.push({id: this.state.schema[x][0], label: this.state.schema[x][0]})
// 			}
// 		}

// 		if (this.state.currentSource) {
// 			navbarItems.push(<NavBarMenuItem
// 				label={this.state.currentSource}
// 				meta={this.state.schema ? this.state.schema.length : null}
// 				key={"src-" + this.state.currentSource}
// 				id={"src-" + this.state.currentSource}
// 				clickHandler={ (sel) => { this.state.selected == "src-" + this.state.currentSource ? this.setState({selected: null}) : this.setState({selected: "src-" + this.state.currentSource}) } }
// 				subMenuItems={schema}
// 				subClickHandler={this.props.fetchData} />)

// 			if (this.state.currentSource) {
// 				navbarItems.push(<NavBarMenuItem
// 						label="Query"
// 						key="query"
// 						id="query"
// 						clickHandler={ () => { this.props.toggleParentState('queryBox') } }
// 					/>)
// 			}
// 		}

// 		var rightNavbarItems = [];
// 		rightNavbarItems.push(<NavBarMenuItem label="Admin" key="adm" />);
// 	  rightNavbarItems.push(<NavBarMenuItem label="Logout" key="lot" />);

// 		return (<div id="top-menu">
// 	    <ul className="menu-list">{navbarItems}</ul>
// 	    <ul className="menu-list menu-right">{rightNavbarItems}</ul>
// 	  </div>)
// 	}
// }