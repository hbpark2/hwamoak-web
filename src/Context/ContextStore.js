import React from 'react';

import { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { SEED_USER } from 'apollo';
import useUser from 'Hooks/useUser';

export const CurrentContext = createContext();

export const StoreProvider = ({ children }) => {
  const [seedLoggedIn, setSeedLoggedIn] = useState(false);
  const { data: userData } = useUser();

  const isSeedUser = SEED_USER.filter(name => {
    return name === userData?.me?.username;
  });

  useEffect(() => {
    if (isSeedUser.length > 0) {
      setSeedLoggedIn(true);
    }
  }, [isSeedUser]);

  const value = { seedLoggedIn };
  return (
    <CurrentContext.Provider value={value}>{children}</CurrentContext.Provider>
  );
};
