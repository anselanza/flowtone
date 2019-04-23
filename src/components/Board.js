import React, { Component } from 'react';
import { connect } from "react-redux";
import { Stage, Layer, Group, Rect, Text, Line } from 'react-konva';
import Konva from 'konva';
import Tone from 'tone';

const mapStateToProps = state => state;

const size = 100;

let nodes = [];

const isMaster = widget => widget.type === 'Tone.Master';

const getWidget = (widgets, id) => widgets.find(w => w.id === id);

const widgetPosition = (widget, index) =>
  widget.position !== undefined
    ? widget.position
    : ( {x: size/2 + index * size*1.5, y: size/2 } )


class Board extends Component {

  drawWidget = (w, index) =>
    <Group 
      key={w.id}
      position= {widgetPosition(w, index)}
      draggable
      onDragStart={(event => {
        event.target.setAttrs({
          scaleX: 1.1,
          scaleY: 1.1
        });
      })}
      onDragEnd={(event) => {
        // console.log(event);
        event.target.to({
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          scaleX: 1,
          scaleY: 1,
        });
        const { x, y } = event.currentTarget.attrs;
        this.props.dispatch({ 
          type: 'WIDGET_MOVE', 
          id: w.id, 
          position: { x, y } 
        });
      }}
      >
      <Rect 
        width={size} height={size} 
        cornerRadius={10}
        fill={"#2F80ED"} 
      />
      <Text
        text={w.name}
        fill={"#ffffff"}
        align="center"
        verticalAlign="middle"
        height={size}
        width={size}
      />
    </Group>

  drawCable = (fromWidget, toWidget) => 
      <Line
        points={[fromWidget.position.x, fromWidget.position.y, toWidget.position.x, toWidget.position.y]}
        stroke={"red"}
      />

  componentDidMount= () => {
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

    this.props.cables.forEach(cable => {
      const source = { 
        widget: this.props.widgets.find(w => w.id === cable.from.id),
        node: nodes.find(n => n.id === cable.from.id)
      }
      const destination = {
        widget: this.props.widgets.find(w => w.id === cable.to.id),
        node: nodes.find(n => n.id === cable.to.id)
      }

      if (isMaster(destination.widget)) {
        console.log('destination master; connect', source.widget, 'to Tone.Master');
          source.node.toneRef.connect(Tone.Master);
      } else {
        console.log('destination node; connect', source.widget, 'to', destination.widget);
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
    <div className="board">
      <h2>Board</h2>

      <Stage width={window.innerWidth} height={window.innerHeight} >
        <Layer>
          {this.props.widgets && this.props.widgets.map( (w, index) => this.drawWidget(w, index)) }
          {this.props.cables && this.props.cables.map( c => this.drawCable(
            getWidget(this.props.widgets, c.from.id),
            getWidget(this.props.widgets, c.to.id)
          ))}
        </Layer>
      </Stage>

      <div>
        <button onClick={() => this.startAll()}>Start</button>
        <button onClick={() => this.stopAll()}>Stop</button>
      </div>
    </div>

}

export default connect(mapStateToProps)(Board);
