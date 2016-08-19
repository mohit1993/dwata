import React, { PropTypes } from 'react'
import { NavBarSub, shapeNavBarSub } from './NavBar.jsx'


const shapeSideNavItem = Object.assign({}, shapeNavBarSub, {
  tables: PropTypes.arrayOf(PropTypes.shape(shapeNavBarSub))
})

const SideNav = ({ sources, isVisible, onSelect, tables, onClick }) => (<div id="side-nav" className={ isVisible ? "visible" : "hidden" } >
  <div className="form-el-cont">
    <div className="label-cont"><label htmlFor="select-source">Sources</label></div>
    { sources ?
      <div className="el-cont"><select id="select-source" onChange={e => {onSelect(e.target.value)}} className="form-input">
        { sources.map((nav, i) => <option value={nav.index} key={i}>{nav.label}</option>) }
      </select></div>
      : null }
  </div>
  { tables.length ?
    <div><div className="head">Tables</div>
    <ul className="list">{ tables.map((nav, i) => (<NavBarSub
      key={i} {...nav} onClick={e => { e.preventDefault(); onClick(nav.index)}} />)) }</ul></div>
    : null }
</div>)

SideNav.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.shape(shapeSideNavItem)).isRequired,
  tables: PropTypes.arrayOf(PropTypes.shape(shapeSideNavItem)),
  isVisible: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SideNav