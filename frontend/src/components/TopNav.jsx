import React, { PropTypes } from 'react'
import { NavBarSub, shapeNavBarSub } from './NavBar.jsx'


const TopNav = ({ leftNav, rightNav, onClick }) => (<div id="top-nav">
  <ul className="menu-list">
    {leftNav.map(nav => <NavBarSub key={nav.index} {...nav} onClick={(e) => { e.preventDefault(); onClick(nav.index) }} />)}
  </ul>
  <ul className="menu-list menu-right">
    {rightNav.map(nav => <NavBarSub key={nav.index} {...nav} onClick={(e) => { e.preventDefault(); onClick(nav.index) }} />)}
  </ul>
</div>)

TopNav.propTypes = {
  leftNav: PropTypes.arrayOf(PropTypes.shape(shapeNavBarSub)),
  rightNav: PropTypes.arrayOf(PropTypes.shape(shapeNavBarSub)),
  onClick: PropTypes.func
}

export default TopNav
