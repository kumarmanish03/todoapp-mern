import React from 'react';
import './Header.css';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const [{ init, loading: authLoading, loggedIn }, syncAuth] = useAuth();

  const logout = async () => {
    localStorage.removeItem('loginToken');
    syncAuth();
  };

  return (
    <header id="header">
      <h1 className="app-name">nTasks Advanced</h1>

      {authLoading ||
        (init && loggedIn && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        ))}
    </header>
  );
};

export default Header;
