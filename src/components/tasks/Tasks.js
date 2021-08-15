import React, { useEffect } from 'react';
import './Tasks.css';
import useTasks from '../../hooks/useTasks';
import Loader from '../Loader';
import TaskItems from './TaskItems';

const Tasks = () => {
  const [{ init, loading, error }, syncTasks] = useTasks();

  useEffect(() => {
    syncTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div id="app-tasks" className="app-content">
      <h2>Tasks</h2>

      <div className="app-content-body">
        {loading ? (
          <Loader id="tasks-loader" />
        ) : error ? (
          <div className="tasks-error">
            {error} <button onClick={syncTasks}>Retry</button>
          </div>
        ) : (
          init && <TaskItems />
        )}
      </div>
    </div>
  );
};

export default Tasks;
