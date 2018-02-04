import React from 'react';
import { Route } from 'react-router-dom';

import logo from 'logo.svg';
import 'App.css';
import TopNav from 'views/TopNav';
import { Tables, Sources } from 'containers/Selector';
import { Grid } from 'containers/Grid';
// import DetailView from 'containers/DetailView';


const Selector = () => <div className="container-fluid">
  <div className="row">
    <div className="col-3">
      <Route path="/source" exact component={ Sources } />
      <Route path="/source/:db" exact component={ Sources } />
    </div>
    <div className="col-9">
      <Route path="/source/:db" exact component={ Tables } />
    </div>
  </div>
</div>


const Browser = () => <div className="container-fluid">
  <div className="row">
    <div className="col-12">
      <Route path="/records/:db/:schema" exact component={ Grid } />
    </div>
  </div>
</div>


export default _ => <div>
  <TopNav />

  <Route path="/source" component={ Selector } />

  <Route path="/records" component={ Browser } />
</div>;