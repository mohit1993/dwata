import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheckCircleOff from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import faCheckCircleOn from '@fortawesome/fontawesome-free-solid/faCheckCircle';

import * as constants from 'base/constants';
import { LeftNavContainer, RightNavContainer } from 'containers/TopNav';


const NavItem = ({ label, link, meta, active }) => <li className={ active ? "menu-item active": "menu-item"}>
  { active ? <span><span className="circle"></span>
    { label } { meta ? <span className="meta">( { meta } )</span> : null }
  </span> : link !== undefined ? <Link to={ link } className="menu-link">
    { label } { meta ? <span className="meta">({meta})</span> : null }
  </Link> : null }
</li>


const LeftNav = ({ dataList, grid }) => {
  dataList = dataList.get('data').toJS();

  return <ul className="navbar-nav mr-auto">
    { dataList.map((nav, index) => <NavItem key={ `tn-left-${index}` } {...nav} />) }
  </ul>
}

const ConnectedLeftNav = LeftNavContainer(LeftNav);


const RightNav = ({ dataList, grid, columns }) => {
  dataList = dataList.get('data').toJS();
  grid = grid.get('data').toJS();
  columns = columns.get('data').toJS();

  return <ul className="navbar-nav">
    { dataList.map((nav, index) => <NavItem key={ `tn-right-${index}` } {...nav} />) }
    { columns.length > 0 ? <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Columns
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        { columns.map(column => <a className="dropdown-item" href="#">
          { column._isOn === true ? <FontAwesomeIcon icon={ faCheckCircleOn } /> : <FontAwesomeIcon icon={ faCheckCircleOff } /> }
        &nbsp;{ column.name }</a>) }
      </div>
    </li> : null }
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