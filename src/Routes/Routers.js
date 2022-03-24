import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';
import { isLoggedInVar } from 'apollo';
import { useReactiveVar } from '@apollo/client';
import routes from './routes';
import SHashLoader from 'components/common/SHashLoader';
import { CurrentContext } from 'Context/ContextStore';
import Feed from 'screens/Feed/Feed';
import Login from 'screens/Auth/Login';
import PlantDetailContainer from 'screens/Plant/PlantDetail/PlantDetailContainer';
import Profile from 'screens/Profile/Profile';
import PlantsFeedContainer from 'screens/Plant/PlantsFeed';
import Modify from 'screens/Auth/Modify';
import UploadPhotoPresenter from 'screens/Photo/UploadPhoto';
import UploadPlantContainer from 'screens/Administrator/UploadPlant';
import EditPlantContainer from 'screens/Administrator/EditPlant';

import SignUp from 'screens/Auth/SignUp';

const Routers = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { seedLoggedIn } = useContext(CurrentContext);

  return (
    <Switch>
      <Route exact path={routes.home} component={isLoggedIn ? Feed : Login} />
      {!isLoggedIn && <Route path={routes.signUp} component={SignUp} />}
      <Route path={`/plants/:plantId`} component={PlantDetailContainer} />
      <Route path="/plant_feed" component={PlantsFeedContainer} />
      <Route path="/photo/upload" component={UploadPhotoPresenter} />
      <Route path={`/users/:username`} component={Profile} />
      <Route path="/edit/:username" component={Modify} />

      {seedLoggedIn && (
        <Route path="/plant/upload" component={UploadPlantContainer} />
      )}
      {seedLoggedIn && (
        <Route path="/plant/edit/:plantId" component={EditPlantContainer} />
      )}

      <Route component={() => <SHashLoader screen />} />
    </Switch>
  );
};

export default Routers;
