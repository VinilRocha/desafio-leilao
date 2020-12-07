import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import LogIn from '../pages/LogIn';
import Dashboard from '../pages/Dashboard';
import DashboardForm from '../pages/Dashboard/Form';
import Detail from '../pages/Dashboard/Detail';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LogIn} />
    <Route path="/leiloes" exact component={Dashboard} isPrivate />
    <Route path="/leiloes/cadastro" exact component={DashboardForm} isPrivate />
    <Route
      path="/leiloes/cadastro/:id"
      exact
      component={DashboardForm}
      isPrivate
    />
    <Route path="/leiloes/:id" exact component={Detail} isPrivate />
  </Switch>
);

export default Routes;
