import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './redux/store'
import './App.css';
import Board from './components/Board';


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Board />
        </div>
      </Provider>
    );
  }
}

export default App;
