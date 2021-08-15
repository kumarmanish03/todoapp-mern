import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import AddTaskForm from './AddTaskForm';
import TaskAddedPopup from './TaskAddedPopup';

const AddTask = () => {
  const [taskAdded, setTaskAdded] = useState(false);

  return (
    <div id="add-task-cont" className="app-content">
      <h2>
        <Link to="/">
          <ChevronLeft />
        </Link>
        Add Tasks
      </h2>

      <div className="app-content-body">
        <AddTaskForm setTaskAdded={setTaskAdded} />
        {taskAdded && <TaskAddedPopup setTaskAdded={setTaskAdded} />}
      </div>
    </div>
  );
};

export default AddTask;
