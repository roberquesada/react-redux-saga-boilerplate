import React, { Component, PropTypes } from 'react'

const App = ({ children }) =>
<div>
  <header>
  </header>
    { children }
  <footer>
  </footer>
</div>

App.propTypes = {
    children: PropTypes.object
};

export default App;
