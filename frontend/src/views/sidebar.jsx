import React from 'react'


const SidebarMenuIteam = (props) => {
	return (<li className="pure-menu-item">
		<a href="#" className="pure-menu-link"
			onClick={ props.clickHandler ? (e) => { e.preventDefault(); props.clickHandler() } : null }>
			{props.label} { props.meta ? <span className="sources-count">({props.meta})</span> : null }
		</a>
	</li>)
}


export default (props) => <div className="pure-u">
    <div className="nav-inner">
      <div className="pure-menu">
        <ul className="pure-menu-list">
          <SidebarMenuIteam label="Sources" meta={props.sources.length} clickHandler={props.fetchSources} />
          { props.sources.map((sc) => <SidebarMenuIteam label={sc.id} key={sc.id} />) }
          <SidebarMenuIteam label="Admin" />
          <SidebarMenuIteam label="Logout" />
        </ul>
      </div>
    </div>
  </div>
