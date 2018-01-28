import React from 'react';

import logo from 'logo.svg';
import 'App.css';
import TopNav from 'views/TopNav';
import SideNav from 'views/SideNav';
import Grid from 'views/Grid';
// import DetailView from 'containers/DetailView';


export default _ => <div>
  <TopNav />

  <div className="container-fluid">
    <div className="row">
      <div className="col-3"><SideNav /></div>
      <div className="col-9"><Grid /></div>
    </div>
  </div>
</div>;