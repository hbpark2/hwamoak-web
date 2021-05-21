import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './screens/NorFound';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, GlobalStyles } from './styles';
import routes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import Layout from './components/Layout';
const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>

              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}

              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
