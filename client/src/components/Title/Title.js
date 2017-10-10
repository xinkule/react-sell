import React from 'react';
import './Title.css';

function Title({text})  {
  return (
    <div className="Title">
      <div className="line"></div>
      <div className="text">{text}</div>
      <div className="line"></div>
    </div>
  );
}

export default Title;
