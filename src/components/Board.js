import React, { Component } from 'react';
import { connect } from "react-redux";
import { Stage, Layer, Group, Rect, Text, Line } from 'react-konva';
import Konva from 'konva';
import Tone from 'tone';

import Schema from '../redux/data/Schema';
import Inspector from './Inspector';

const mapStateToProps = state => state;

const moveWidget = (id, position) => ({ 
  type: 'WIDGET_MOVE', 
  id,
  position
});

const actionCreators = {
  moveWidget
};

const size = 100;

let nodes = [];

const isMaster = widget => widget.type === 'Tone.Master';

const getWidget = (widgets, id) => widgets.find(w => w.id === id);

const getSchema = (widget) => Schema.nodes.find(node => node.type === widget.type);

const widgetPosition = (widget, index) =>
  widget.position !== undefined
    ? widget.position
    : ( {x: size/2 + index * size*1.5, y: size/2 } )


class Board extends Component {

  state = {
    dragging: false,
    selectedWidgetId: null
  }

  drawWidget = (w, index) =>
    <Group 
      key={w.id}
      position= {widgetPosition(w, index)}
      draggable
      onMouseDown={ e => {
        this.setState({ selectedWidgetId: w.id });
      }}
      onDragStart={(e) => {
        this.setState({ dragging: true });
        e.target.setAttrs({
          scaleX: 1.1,
          scaleY: 1.1
        });
      }}
      onDragEnd={(e) => {
        this.setState({ dragging: false });
        e.target.to({
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          scaleX: 1,
          scaleY: 1,
        });
        const { x, y } = e.currentTarget.attrs;
        this.props.moveWidget(w.id, { x, y });
      }}
      >
      <Rect 
        width={size} height={size} 
        position={ { x: -size/2, y: -size/2 }}
        cornerRadius={10}
        fill={"#2F80ED"} 
      />
      <Text
        text={w.name}
        fill={"#ffffff"}
        align="center"
        verticalAlign="middle"
        position={ { x: -size/2, y: -size/2 }}
        height={size}
        width={size}
      />
    </Group>

  drawCable = (fromWidget, toWidget) => 
      <Line
        key={`cable-${fromWidget.id}-${toWidget.id}`}
        points={[fromWidget.position.x, fromWidget.position.y, toWidget.position.x, toWidget.position.y]}
        stroke={"grey"}
        opacity={this.state.dragging ? 0.05 : 1}
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

      <div className="board-stage">
        <Stage width={window.innerWidth} height={window.innerHeight} >
          <Layer>
          {this.props.cables && this.props.cables.map( c => this.drawCable(
              getWidget(this.props.widgets, c.from.id),
              getWidget(this.props.widgets, c.to.id)
            ))}
            {this.props.widgets && this.props.widgets.map( (w, index) => this.drawWidget(w, index)) }
          </Layer>
        </Stage>
      </div>

      <div className="side-panel">
        {this.state.selectedWidgetId !== null &&
          <Inspector 
            widget={getWidget(this.props.widgets, this.state.selectedWidgetId)} 
            schema={getSchema(getWidget(this.props.widgets, this.state.selectedWidgetId))}
          />
        }
        <div className="controls">
          <button onClick={() => this.startAll()}>Start</button>
          <button onClick={() => this.stopAll()}>Stop</button>
        </div>
      </div>

    </div>

}

export default connect(mapStateToProps, actionCreators)(Board);
