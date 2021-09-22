import React, { createContext, useState } from 'react';
import { SERVER_ERR } from '../app/consts';
import server from '../app/server';

const TasksContext = createContext();

const initState = {
  init: false,
  loading: false,
  error: null,
  data: null,
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initState);

  const sync = async () => {
    setTasks({ ...tasks, loading: true, error: null });

    try {
      const data = await server({
        method: 'get',
        path: 'tasks',
        passToken: true,
      });

      setTasks({ init: true, loading: false, error: null, data });
    } catch (error) {
      if ([SERVER_ERR.ERR_CONN, SERVER_ERR.ERR_UNKNOWN].includes(error)) {
        setTasks({ ...tasks, loading: false, error });
      } else {
        setTasks({ ...tasks, init: true, loading: false, error });
      }
    }
  };

  const del = id =>
    setTasks({ ...tasks, data: tasks.data.filter(task => task.id !== id) });

  const update = (id, key, val) => {
    setTasks({
      ...tasks,
      data: tasks.data.map(task =>
        task.id === id ? { ...task, [key]: val } : task
      ),
    });
  };

  return (
    <TasksContext.Provider value={[tasks, sync, { del, update }]}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
