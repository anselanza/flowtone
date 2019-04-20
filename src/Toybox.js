import React, { Component } from 'react';
import Tone from 'tone';

let nodes = [];

const isMaster = widget => widget.type === 'Tone.Master';

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

      if (node !== undefined) {
        console.log('adding node', node);
        nodes.push({ id: widget.id, toneRef: node });
      }
      
    });

    console.log('nodes list:', nodes);

    this.props.connections.forEach(connection => {
      const source = { 
        widget: this.props.widgets.find(w => w.id === connection.from.id),
        node: nodes.find(n => n.id === connection.from.id)
      }
      const destination = {
        widget: this.props.widgets.find(w => w.id === connection.to.id),
        node: nodes.find(n => n.id === connection.to.id)
      }

      if (isMaster(destination.widget)) {
        console.log('destination master; connect', source.id, 'to Tone.Master');
          source.node.toneRef.connect(Tone.Master);
      } else {
        console.log('connect', source, 'to', destination);
        source.node.toneRef.connect(destination.node.toneRef);
      }

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
