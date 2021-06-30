/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Route, Switch } from 'react-router';
import NotFound from 'screens/NorFound';
import Home from 'screens/Home/Home';
import Login from 'screens/Auth/Login';
import SignUp from 'screens/Auth/SignUp';
import routes from 'components/Routes/routes';

import Profile from 'screens/Profile/Profile';

import { isLoggedInVar } from 'apollo';
import { useReactiveVar } from '@apollo/client';
import { useContext } from 'react';
import { CurrentContext } from 'Context/ContextStore';
import uploadPlant from 'screens/Administrator/UploadPlant';
import PlantDetailContainer from 'screens/Plant/PlantDetail/PlantDetailContainer';

const Routers = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { seedLoggedIn } = useContext(CurrentContext);

  return (
    <Switch>
      <Route exact path={routes.home} component={isLoggedIn ? Home : Login} />
      {!isLoggedIn && <Route path={routes.signUp} component={SignUp} />}
      <Route path={`/plants/:plantId`} component={PlantDetailContainer} />
      <Route path={`/users/:username`} component={Profile} />
      {seedLoggedIn && <Route path="/upload_plant" component={uploadPlant} />}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routers;