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
    <form
      className="app-content app-form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h2>Signup here</h2>

      <div className="app-content-body">
        {error && <div className="form-row form-error-row">{error}</div>}

        <div className="form-row">
          <input
            type="text"
            name="username"
            className="form-field"
            placeholder="Create Username"
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
      </div>

      <div className="form-foot">
        <div className="form-foot-link-cont">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
