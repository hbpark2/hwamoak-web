import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, GlobalStyles } from 'styles';
import { HelmetProvider } from 'react-helmet-async';
import { client, darkModeVar } from 'apollo';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'Context/ContextStore';

import Routers from './Routers';
import Header from '../Components/Layout/Header';

const App = () => {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <HelmetProvider>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <BrowserRouter>
              <Header />
              <Routers />
            </BrowserRouter>
          </ThemeProvider>
        </HelmetProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
