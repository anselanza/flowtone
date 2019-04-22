import React, { Component } from 'react';
import { connect } from "react-redux";
import { Stage, Layer, Group, Rect, Text } from 'react-konva';
import Tone from 'tone';

const mapStateToProps = state => state;

const size = 100;

let nodes = [];

const isMaster = widget => widget.type === 'Tone.Master';

const widgetPosition = (widget, index) =>
  widget.position !== undefined
    ? widget.position
    : ( {x: size/2 + index * size*1.5, y: size/2 } )

const drawWidget = (w, index) =>
  <Group 
    key={w.id}
    position= {widgetPosition(w, index)}
    draggable
    >
    <Rect 
      width={size} height={size} 
      fill={"red"} 
    />
    <Text
      text={w.name}
      align="center"
      verticalAlign="middle"
      height={size}
      width={size}
    />
    
  </Group>

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
        console.log('connect', source.widget, 'to', destination.widget);
        source.node.toneRef.connect(destination.node.toneRef);
      }

    });
  }

  startAll = () => {
    nodes.forEach(n => {
      if (n.toneRef.start !== undefined) {
        console.log('start', n);
        n.toneRef.start();
      }
    });
  }

  stopAll = () => {
    nodes.forEach(n => {
      if (n.toneRef.stop !== undefined) {
        n.toneRef.stop();
      }
    });

  }

  render = () => 
    <div className="Toybox">
      <h2>Toybox</h2>

      <Stage width={window.innerWidth} height={window.innerHeight} >
        <Layer>
          {this.props.widgets && this.props.widgets.map( (w, index) => drawWidget(w, index)) }
        </Layer>
      </Stage>

      <div>
        <button onClick={() => this.startAll()}>Start</button>
        <button onClick={() => this.stopAll()}>Stop</button>
      </div>
    </div>

}

export default connect(mapStateToProps)(Toybox);
