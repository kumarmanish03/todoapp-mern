import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import server from '../../app/server';
import Loader from '../Loader';
import TaskAddedPopup from './TaskAddedPopup';

const AddTask = () => {
  const [taskAdded, setTaskAdded] = useState(false);

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
    <div className="app-content">
      <h2>
        <Link to="/">
          <ChevronLeft />
        </Link>
        Add Tasks
      </h2>

      <form
        className="app-content-body app-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {error && <div className="form-row form-error-row">{error}</div>}

        <div className="form-row">
          <input
            name="title"
            className="form-field"
            placeholder="Add Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
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
          <button
            type="submit"
            className="form-submit-button"
            disabled={loading}
          >
            {loading ? <Loader /> : 'Add Task'}
          </button>
        </div>
      </form>

      {taskAdded && <TaskAddedPopup setTaskAdded={setTaskAdded} />}
    </div>
  );
};

export default AddTask;
