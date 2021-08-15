import { useContext } from 'react';
import TasksContext from '../contexts/TasksContext';

const useTasks = () => useContext(TasksContext);

export default useTasks;
