import React from 'react';
import { Router } from 'react-router-dom';

import history from 'base/history';
import Dwata from 'views/Dwata';


export default () => (<Router history={ history }>
  <Dwata />
</Router>);
