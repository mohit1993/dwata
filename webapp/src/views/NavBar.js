import React from 'react';
import { Link } from 'react-router-dom';


export default ({ index, label, link, onClick, meta, active }) => <li className={ active ? "menu-item active": "menu-item"}>
  { active ? <span><span className="circle"></span>
    { label } { meta ? <span className="meta">( { meta } )</span> : null }
  </span> : link !== undefined ? <Link href="#" className="menu-link" to={ link }>
    { label } { meta ? <span className="meta">({meta})</span> : null }
  </Link> : null }
</li>