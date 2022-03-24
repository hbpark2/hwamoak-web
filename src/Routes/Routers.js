/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Route, Switch } from 'react-router';
import Feed from 'Screens/Feed/Feed';
import Login from 'Screens/Auth/Login';
import SignUp from 'Screens/Auth/SignUp';
import routes from 'Routes/routes';

import Profile from 'Screens/Profile/Profile';
import { isLoggedInVar } from 'apollo';
import { useReactiveVar } from '@apollo/client';
import { useContext } from 'react';
import { CurrentContext } from 'Context/ContextStore';
import uploadPlant from 'Screens/Administrator/UploadPlant';
import PlantDetailContainer from 'Screens/Plant/PlantDetail/PlantDetailContainer';
import EditPlantContainer from 'Screens/Administrator/EditPlant';
import PlantsFeedContainer from 'Screens/Plant/PlantsFeed';
import Modify from 'Screens/Auth/Modify';
import UploadPhoto from 'Screens/Photo/UploadPhoto';
import HashLoader from 'Components/common/HashLoader';

const Routers = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { seedLoggedIn } = useContext(CurrentContext);

  return (
    <Switch>
      <Route exact path={routes.home} component={isLoggedIn ? Feed : Login} />
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