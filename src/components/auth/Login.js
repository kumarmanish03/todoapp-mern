import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import server from '../../app/server';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const reset = () => {
    setLoading(false);
    setUsername('');
    setPassword('');
    setError(null);
  };

  const [, syncAuth] = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await server.post('user/login', { username, password });
      reset();
      syncAuth();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <form
      className="app-content app-form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h2>Login here</h2>

      <div className="app-content-body">
        {error && <div className="form-row form-error-row">{error}</div>}

        <div className="form-row">
          <input
            type="text"
            name="username"
            className="form-field"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <input
            type="password"
            name="password"
            className="form-field"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-row form-submit-row">
          <button
            type="submit"
            className="form-submit-button"
            disabled={loading}
          >
            {loading ? <Loader /> : 'Login'}
          </button>
        </div>
      </div>

      <div className="form-foot">
        <div className="form-foot-link-cont">
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
