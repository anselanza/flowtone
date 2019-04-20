import React, { Component } from 'react';

import './App.css';
import Toybox from './Toybox';
import network from './data/DummyData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toybox widgets={network.widgets} connections={network.connections} />
      </div>
    );
  }
}

export default App;
