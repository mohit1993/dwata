import React from 'react'


const SidebarMenuIteam = (props) => {
	return (<li class="pure-menu-item">
		<a href="#" class="pure-menu-link">
			{props.label} { props.meta ? <span class="sources-count">({props.meta})</span> : null }
		</a>
	</li>)
}


export default (props) => {
	return (<div class="pure-u">
    <a href="#" class="nav-menu-button">Menu</a>
    <div class="nav-inner">
      <div class="pure-menu">
        <ul class="pure-menu-list">
          <SidebarMenuIteam label="Sources" meta="2" />
        </ul>
      </div>
    </div>
  </div>)
}
