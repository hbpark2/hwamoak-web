/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Route, Switch } from 'react-router';
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
import EditPlantContainer from '../../screens/Administrator/EditPlant';
import PlantsFeedContainer from '../../screens/Plant/PlantsFeed';
import Modify from '../../screens/Auth/Modify';
import UploadPhoto from '../../screens/Photo/UploadPhoto';
import HashLoader from '../HashLoader';

const Routers = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { seedLoggedIn } = useContext(CurrentContext);

  return (
    <Switch>
      <Route exact path={routes.home} component={isLoggedIn ? Home : Login} />
      {!isLoggedIn && <Route path={routes.signUp} component={SignUp} />}
      <Route path={`/plants/:plantId`} component={PlantDetailContainer} />
      <Route path={`/users/:username`} component={Profile} />
      <Route path="/plant_feed" component={PlantsFeedContainer} />
      <Route path="/edit/:username" component={Modify} />
      <Route path="/photo/upload" component={UploadPhoto} />

      {seedLoggedIn && <Route path="/plant/upload" component={uploadPlant} />}
      {seedLoggedIn && (
        <Route path="/plant/edit/:plantId" component={EditPlantContainer} />
      )}

      <Route component={() => <HashLoader screen />} />
    </Switch>
  );
};

export default Routers;
