import React from 'react';

const Button = ({ color, width, children, ...props }: any) => (
  <button
    className={`f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-${color} w-${width}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
