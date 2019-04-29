import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './redux/store'
import Schema from './data/Schema';
import './App.css';
import Board from './components/Board';
import Toybox from './components/Toybox';


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Board />
          <Toybox widgets={Schema.nodes} />
        </div>
      </Provider>
    );
  }
}

export default App;
