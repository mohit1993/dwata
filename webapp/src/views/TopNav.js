import React from 'react';

import NavBarView from './NavBar';
import * as constants from 'base/constants';
import defaultContainer from 'base/container';


const LeftNav = defaultContainer(({ dataList, onClick }) => {
    dataList = dataList.toJS();

    return <ul className="navbar-nav mr-auto">
      { dataList.map((nav, index) => <NavBarView key={ `tn-left-${index}` } {...nav} onClick={ (e) => { e.preventDefault(); onClick(nav.index) } } />) }
    </ul>
  },
  { entity: constants.ENTITY_TYPE_TOPNAV_LEFT, mode: constants.CONTAINER_MODE_LIST }
);


const RightNav = defaultContainer(({ dataList, onClick }) => {
    dataList = dataList.toJS();

    return <ul className="navbar-nav mr-auto">
      { dataList.map((nav, index) => <NavBarView key={ `tn-right-${index}` } {...nav} onClick={(e) => { e.preventDefault(); onClick(nav.index) }} />) }
    </ul>
  },
  { entity: constants.ENTITY_TYPE_TOPNAV_RIGHT, mode: constants.CONTAINER_MODE_LIST }
);


export default ({}) => <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/">Dwata</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <LeftNav />
    <RightNav />
  </div>
</nav>;