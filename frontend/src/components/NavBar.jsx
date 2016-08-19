import React, { PropTypes } from 'react'


export const shapeNavBarSub = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  meta: PropTypes.string,
  active: PropTypes.bool
}

export const NavBarSub = ({index, label, onClick, meta, active}) => <li className={active ? "menu-item active": "menu-item"}>
  { active ? <span
    onClick={ onClick ? onClick : null }><span className="circle"></span>
    {label} { meta ? <span className="meta">({meta})</span> : null }
  </span> : <a href="#" className="menu-link"
    onClick={ onClick ? onClick : null }>
    {label} { meta ? <span className="meta">({meta})</span> : null }
  </a> }
</li>

NavBarSub.propTypes = shapeNavBarSub