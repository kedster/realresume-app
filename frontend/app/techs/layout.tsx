import React from 'react';

const TechsLayout = ({ children }) => {
  return (
    <div>
      <h2>Techs Section</h2>
      <div>{children}</div>
    </div>
  );
};

export default TechsLayout;