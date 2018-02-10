import React from 'react';
import { Link } from 'react-router-dom';

import * as constants from 'base/constants';
import { LeftNavContainer, RightNavContainer } from 'containers/TopNav';


const NavItem = ({ label, link, meta, active }) => <li className={ active ? "menu-item active": "menu-item"}>
  { active ? <span><span className="circle"></span>
    { label } { meta ? <span className="meta">( { meta } )</span> : null }
  </span> : link !== undefined ? <Link to={ link } className="menu-link">
    { label } { meta ? <span className="meta">({meta})</span> : null }
  </Link> : null }
</li>


const LeftNav = ({ dataList }) => {
  dataList = dataList.get('data').toJS();

  return <ul className="navbar-nav mr-auto">
    { dataList.map((nav, index) => <NavItem key={ `tn-left-${index}` } {...nav} />) }
  </ul>
}

const ConnectedLeftNav = LeftNavContainer(LeftNav);


const RightNav = ({ dataList }) => {
  dataList = dataList.get('data').toJS();

  return <ul className="navbar-nav mr-auto">
    { dataList.map((nav, index) => <NavItem key={ `tn-right-${index}` } {...nav} />) }
  </ul>
}

const ConnectedRightNav = RightNavContainer(RightNav);


export default ({}) => <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">Dwata</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ConnectedLeftNav />
    <ConnectedRightNav />

    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>;