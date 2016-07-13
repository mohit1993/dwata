import React from 'react'


const SidebarMenuIteam = (props) => {
	return (<li className="pure-menu-item">
		<a href="#" className="pure-menu-link">
			{props.label} { props.meta ? <span className="sources-count">({props.meta})</span> : null }
		</a>
	</li>)
}


export default (props) => <div className="pure-u">
    <div className="nav-inner">
      <div className="pure-menu">
        <ul className="pure-menu-list">
          <SidebarMenuIteam label="Sources" meta={props.sources.length} />
          <SidebarMenuIteam label="Admin" />
          <SidebarMenuIteam label="Logout" />
        </ul>
      </div>
    </div>
  </div>
