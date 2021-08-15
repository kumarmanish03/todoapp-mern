import React, { useState } from 'react';
import './Header.css';
import useAuth from '../hooks/useAuth';
import server from '../app/server';
import Loader from './Loader';

const Header = () => {
  const [{ init, loading: authLoading, loggedIn }, syncAuth] = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);

    try {
      await server.get('user/logout');
      syncAuth();
      setLoggingOut(false);
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <header id="header">
      <h1 className="app-name">nTasks Advanced</h1>
      {init && loggedIn && (
        <button className="logout-btn" onClick={logout}>
          {authLoading || loggingOut ? <Loader /> : 'Logout'}
        </button>
      )}
    </header>
  );
};

export default Header;
