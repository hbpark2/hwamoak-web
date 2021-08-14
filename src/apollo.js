import {
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const TOKEN = 'token';
const DARK_MODE = 'DARK_MODE';

//SEEDUSER
export const SEED_USER = ['jake', 'tonny', 'baek', 'stitch'];

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

//로그인
export const logUserIn = token => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

//로그아웃
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, 'enabled');
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

// For Put the Token in Request Header
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql',
// });

// uri: 'http://localhost:4000/graphql',
// uri: process.env.REACT_APP_LOCAL_HWAMOAK_BACKEND,

const link = createUploadLink({
  uri: process.env.REACT_APP_LOCAL_HWAMOAK_BACKEND,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(link),

  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: obj => `User:${obj.username}`,
      },
    },
  }),
});
