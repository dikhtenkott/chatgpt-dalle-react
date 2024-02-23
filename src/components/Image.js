import React from 'react';

const Image = (props) => {
  return (
    <div className='message-wrap'>
      <img
        src={props.url}
        alt='image'
        loading='lazy'
      />
      {props.message ? <div className='caption'>{props.message}</div> : null}
    </div>
  );
};

export default Image;
