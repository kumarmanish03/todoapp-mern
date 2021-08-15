import React, { createContext, useState } from 'react';
import { SERVER_ERR } from '../app/consts';
import server from '../app/server';

const AuthContext = createContext();

const initState = {
  init: false,
  loading: false,
  error: null,
  loggedIn: false,
  data: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initState);

  const sync = async () => {
    setAuth({ ...auth, loading: true, error: null });

    try {
      const data = await server.get('user');
      setAuth({ ...initState, init: true, loggedIn: true, data });
    } catch (error) {
      if ([SERVER_ERR.ERR_CONN, SERVER_ERR.ERR_UNKNOWN].includes(error)) {
        setAuth({ ...auth, loading: false, error });
      } else {
        setAuth({ ...initState, init: true });
      }
    }
  };

  return (
    <AuthContext.Provider value={[auth, sync]}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
