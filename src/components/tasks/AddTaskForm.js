import React, { useState } from 'react';
import server from '../../app/server';
import Loader from '../Loader';

const AddTask = ({ setTaskAdded }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const reset = () => {
    setLoading(false);
    setTitle('');
    setDescription('');
    setError(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await server.post('tasks', { title, description });
      reset();
      setTaskAdded(true);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <form className="app-form" onSubmit={handleSubmit} autoComplete="off">
      {error && <div className="form-row form-error-row">{error}</div>}

      <div className="form-row">
        <input
          name="title"
          className="form-field"
          placeholder="Add Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <textarea
          name="description"
          className="form-field"
          placeholder="Add Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row form-submit-row">
        <button type="submit" className="form-submit-button" disabled={loading}>
          {loading ? <Loader /> : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default AddTask;
