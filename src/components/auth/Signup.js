import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import server from '../../app/server';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader';

const Signup = () => {
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
      await server.post('user/signup', { username, password });
      reset();
      syncAuth();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="app-content">
      <h2>Signup here</h2>

      <form
        className="app-content-body app-form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {error && <div className="form-row form-error-row">{error}</div>}

        <div className="form-row">
          <input
            type="text"
            name="username"
            className="form-field"
            placeholder="Create Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            required
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <input
            type="password"
            name="password"
            className="form-field"
            placeholder="Create Password"
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
            {loading ? <Loader /> : 'Signup'}
          </button>
        </div>
      </form>

      <div className="app-foot">
        <div className="app-foot-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
