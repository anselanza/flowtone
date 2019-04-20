import React, { Component } from 'react';
import Tone from 'tone';

let network = {};

class Toybox extends Component {
  render() {
    return (
      <div className="Toybox">
        Toybox
        <code>widgets: {JSON.stringify(this.props.widgets)}</code>
        <code>connections {JSON.stringify(this.props.connections)}</code>
      </div>
    );
  }
}

export default Toybox;
