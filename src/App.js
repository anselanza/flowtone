import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './redux/store'
import './App.css';
import Toybox from './components/Toybox';


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Toybox />
        </div>
      </Provider>
    );
  }
}

export default App;
