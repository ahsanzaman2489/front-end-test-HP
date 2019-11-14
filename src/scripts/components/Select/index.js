import React from 'react';

const Select = ({options, ...props}) => {
  const renderOptions = options => options.map(option => <option value={option} key={option}>{option}</option>);
  return (
    <div>
      <select {...props}>
        {renderOptions(options)}
      </select>
    </div>
  )
};

export default Select;
