import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'react-feather';
import './TaskAddedPopup.css';

const TaskAddedPopup = ({ setTaskAdded }) => {
  const timeout = useRef(null);

  const close = () => setTaskAdded(false);

  const handleClick = () => {
    clearTimeout(timeout.current);
    close();
  };

  useEffect(() => {
    timeout.current = setTimeout(close, 2000);
    return () => clearTimeout(timeout.current);
    // eslint-disable-next-line
  }, []);

  return (
    <div id="task-added-popup" onClick={handleClick}>
      <CheckCircle /> Task added!
    </div>
  );
};

export default TaskAddedPopup;
