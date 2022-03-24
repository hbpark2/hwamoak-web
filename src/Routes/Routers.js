import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';
import { isLoggedInVar } from 'apollo';
import { useReactiveVar } from '@apollo/client';
import routes from './routes';
// import SHashLoader from 'Components/common/SHashLoader';
import { CurrentContext } from 'Context/ContextStore';
import Feed from 'Screens/Feed/Feed';
import Login from 'Screens/Auth/Login';
import PlantDetailContainer from 'Screens/Plant/PlantDetail/PlantDetailContainer';
import Profile from 'Screens/Profile/Profile';
import PlantsFeedContainer from 'Screens/Plant/PlantsFeed';
import Modify from 'Screens/Auth/Modify';
import UploadPhotoPresenter from 'Screens/Photo/UploadPhoto';
import UploadPlantContainer from 'Screens/Administrator/UploadPlant';
import EditPlantContainer from 'Screens/Administrator/EditPlant';

import SignUp from 'Screens/Auth/SignUp';

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

      {/* <Route component={() => <SHashLoader screen />} /> */}
    </Switch>
  );
};

export default Routers;
