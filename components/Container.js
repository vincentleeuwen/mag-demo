import React from 'react';

const Container = ({ children }) => (
  <div style={{ maxWidth: 500, margin: '50px auto' }}>
    { children }
  </div>
);

export default Container;
