import React, { Component } from 'react';
import Tone from 'tone';

let nodes = [];

class Toybox extends Component {

  componentDidMount() {
    this.props.widgets.forEach(widget => {

      let node;

      switch (widget.type) {
        case 'Tone.Master':
        // created on initialisation by ToneJS
        console.log('master; ignore');
      break;

      case 'Tone.Oscillator':
          console.log('create oscillator');
          node = new Tone.Oscillator();
      break;

      case 'Tone.Noise':
        console.log('create noise');
        node = new Tone.Noise();
      break;

      case 'Tone.Filter':
        console.log('create filter');
        node = new Tone.Filter();
      break;

      default:
          console.error('unknown widget.type for:', widget);
        }

      console.log('adding node', node);
      nodes.push(node);
      
    });
  }

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
