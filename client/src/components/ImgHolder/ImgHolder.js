import React from 'react';
import './ImgHolder.css';

function ImgHolder(props) {
  if (props.src) {
    return (
      <img className={props.className} src={props.src} width={props.width} height={props.height} alt={props.alt} />
    );
  }
  return (
    <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width={props.width} height={props.height} alt={props.alt} />
  );
}

export default ImgHolder;
