import React, { useEffect } from 'react';
import './App.css';
import useAuth from './hooks/useAuth';
import Header from './components/Header';
import Loader from './components/Loader';
import AppRouter from './components/AppRouter';

const App = () => {
  const [{ init, loading, error }, syncAuth] = useAuth();

  useEffect(() => {
    syncAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <div id="app">
      <Header />
      <div id="app-body">
        {loading ? (
          <Loader />
        ) : error ? (
          <div id="app-error">
            <div className="error-wrp">
              {error} <button onClick={syncAuth}>Retry</button>
            </div>
          </div>
        ) : (
          init && <AppRouter />
        )}
      </div>
    </div>
  );
};

export default App;
