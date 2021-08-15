import React from 'react';
import './Loader.css';

const Loader = ({ id, className = '' }) => {
  return (
    <div id={id} className={'loader ' + className}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader;
