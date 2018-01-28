import React from 'react';
import { Link } from 'react-router-dom';

import * as constants from 'base/constants';
import defaultContainer from 'base/container';
import NavBarView from './NavBar';


const Tables = defaultContainer(({ dataList, onClick }) => <div>
  { dataList.size ?
    <div><div className="head">Tables</div>
    <ul className="list">{ dataList.map((nav, i) => (<NavBarView
      key={i} {...nav} onClick={e => { e.preventDefault(); onClick(nav.index)}} />)) }</ul></div>
    : null }
</div>, { entity: constants.ENTITY_TYPE_TABLE , mode: constants.CONTAINER_MODE_LIST });


const Sources = defaultContainer(({ dataList, onClick }) => {
    dataList = dataList.toJS();

    return <div className="data-sources">
      <h5>Data sources ({ dataList.length })</h5>
      <div className="list-group">
        { dataList.map((nav, i) => <Link to={ `/source/${nav[0]}/` } key={ `dt-src-${i}` } className="list-group-item list-group-item-action">{ nav[1].database }</Link>) }
      </div>
    </div>
  },
  { entity: constants.ENTITY_TYPE_DATA_SOURCE, mode: constants.CONTAINER_MODE_LIST }
);


export default defaultContainer(({ dataItem, onClick }) => {
    // let { isVisible } = dataItem.toJS();

    return <div>
      <Sources />
      <Tables />
    </div>
  },
  { entity: constants.ENTITY_TYPE_SIDENAV, mode: constants.CONTAINER_MODE_ITEM }
);