import React from 'react';


export default ({index, label, onClick, meta, active}) => <li className={active ? "menu-item active": "menu-item"}>
  { active ? <span
    onClick={ onClick ? onClick : null }><span className="circle"></span>
    {label} { meta ? <span className="meta">({meta})</span> : null }
  </span> : <a href="#" className="menu-link"
    onClick={ onClick ? onClick : null }>
    {label} { meta ? <span className="meta">({meta})</span> : null }
  </a> }
</li>