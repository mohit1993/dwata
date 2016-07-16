import React from 'react'


const SidebarMenuIteam = (props) => {
	return (<li className="pure-menu-item">
		<a href="#" className="pure-menu-link"
			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler() } : null }>
			{props.label} { props.meta ? <span className="sources-count">({props.meta})</span> : null }
		</a>
	</li>)
}


export default (props) => {
	var sidebar_items = [
		<SidebarMenuIteam label="Sources" meta={props.sources.length} clickHandler={props.fetchSources} key="src" />
	];
	for (var i = 0; i < props.sources.length; i++) {
		var sc = props.sources[i];
		sidebar_items.push(
			<SidebarMenuIteam label={sc.id} key={sc.id} clickHandler={() => props.fetchSchema(sc.id)} />
		);
		if (props.current_source == sc.id && props.schema != null && Object.keys(props.schema).length) {
			for (var j in props.schema) {
				sidebar_items.push(
					<SidebarMenuIteam label={j} key={j} clickHandler={() => props.fetchData(j)} />
				);
			}
		}
	}
	sidebar_items.push(<SidebarMenuIteam label="Admin" key="adm" />);
  sidebar_items.push(<SidebarMenuIteam label="Logout" key="lot" />);

	return (<div className="pure-u">
    <div className="nav-inner">
      <div className="pure-menu">
        <ul className="pure-menu-list">{sidebar_items}</ul>
      </div>
    </div>
  </div>)
}