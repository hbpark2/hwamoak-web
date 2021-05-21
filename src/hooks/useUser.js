import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    // There is a token LocalStorage but the token did not work on the backend
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data };
};
export default useUser;
