import React from 'react'


const NavbarMenuItemSub = (props) => <li className="menu-item">
		<a href="#" className="menu-link"
			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler(props.id) } : null }>
			{props.label} { props.meta ? <span className="meta">({props.meta})</span> : null }
		</a>
	</li>


const NavbarMenuItem = (props) => {
	var subMenu = null;
	if (props.subMenuItems) {
		subMenu = <ul className="menu-child">
			{ props.subMenuItems.map((item, i) => <NavbarMenuItemSub key={item.id} id={item.id}
				label={item.label} clickHandler={props.subClickHandler} />) }
		</ul>
	}

	return (<li className={subMenu ? "menu-item has-children" : "pure-menu-item"}>
		<a href="#" className="pure-menu-link"
			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler() } : null }>
			{props.label} { props.meta ? <span className="meta">({props.meta})</span> : null }
		</a>{subMenu}
	</li>)
}


export default (props) => {
	var navbarItems = [];

	if (props.sources) {
		var sources = [];
		for (var x in props.sources) {
			sources.push({id: x, label: x})
		}
		navbarItems.push(<NavbarMenuItem
			label="Sources"
			meta={props.sources ? props.sources.length : null}
			key="src"
			subMenuItems={sources}
			subClickHandler={props.fetchSchema} />)
	} else {
		navbarItems.push(<NavbarMenuItem
			label="Sources"
			meta={props.sources ? props.sources.length : null}
			clickHandler={props.fetchSources}
			key="src" />)
	}
	if (props.currentSource) {
		if (props.schema) {
			var schema = [];
			for (var x in props.schema) {
				schema.push({id: x, label: x})
			}
			navbarItems.push(<NavbarMenuItem
				label={props.currentSource}
				meta={props.sources ? props.sources.length : null}
				key={props.currentSource}
				subMenuItems={schema}
				subClickHandler={props.fetchData} />)
		} else {
			navbarItems.push(<NavbarMenuItem
				label={props.currentSource}
				meta={props.schema ? Object.keys(props.schema).length : null}
				clickHandler={props.fetchSchema}
				key={props.currentSource} />)
		}
	}

	navbarItems.push(<NavbarMenuItem label="Admin" key="adm" />);
  navbarItems.push(<NavbarMenuItem label="Logout" key="lot" />);

	return (<div id="top-menu">
    <ul className="menu-list">{navbarItems}</ul>
  </div>)
}