import React from 'react';

const Select = ({options, ...props}) => {
  return (
    <div>
      <input {...props}/>
    </div>
  )
};

export default Select;
