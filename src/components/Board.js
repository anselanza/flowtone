import React, { Component } from 'react';
import { connect } from "react-redux";
import { Stage, Layer, Group, Rect, Text, Arrow } from 'react-konva';
import Konva from 'konva';
import Tone from 'tone';

import Schema from '../data/Schema';
import { WIDGETS, CABLES } from '../data/Constants';
import Inspector from './Inspector';
import CableTip from './CableTip';

let nodes = [];

const mapStateToProps = state => state;

const moveWidget = (id, position) => ({ 
  type: 'WIDGET_MOVE', 
  id,
  position
});

const changeNodeValue = (node, inputId, value) => {
  if (node !== undefined) {
    console.log('update value for', inputId, 'on node', node);
    node[inputId].value = value;
  } else {
    console.error('changeValue requested, but no matching ToneJS Node found in', nodes);
  }
}

const getNode = (id) => nodes.find(n => n.id === id);

const getCableInfo = (cable, widgets) => ({
  ...cable,
  from: {
    ...cable.from,
    widget: getWidget(widgets, cable.from.id)
  },
  to: {
    ...cable.to,
    widget: getWidget(widgets, cable.to.id)
  }
})

const changeValue = (widgetId, input, value) => {
  // Side effect...
  let node = nodes.find(n => n.id === widgetId);
  changeNodeValue(node.toneRef, input.id, value);

  // State update...
  return {
    type: 'WIDGET_SET_VALUE',
    id: widgetId,
    value: {
      id: input.id,
      value
    }
  };
};

const actionCreators = {
  moveWidget,
  changeValue
};





const isMaster = widget => widget.type === 'Tone.Master';

const getWidget = (widgets, id) => widgets.find(w => w.id === id);

const getSchema = (widget) => Schema.nodes.find(node => node.type === widget.type);

const widgetPosition = (widget, index) =>
  widget.position !== undefined
    ? widget.position
    : ( {x: WIDGETS.SIZE/2 + index * WIDGETS.SIZE*1.5, y: WIDGETS.SIZE/2 } )

const getWidgetCables = (widget, cables) => ({
  in: cables.filter(c => c.to.id === widget.id),
  out: cables.filter(c => c.from.id === widget.id)
});

const indexOfCable = (cable, cables) => 
  cables.reduce( (result, c, index) =>
  c.id === cable.id ? index : result,
undefined)

const calculateLinePoints = (cable, widgets, cables) => {
  let fromWidget = widgets.find(w => w.id === cable.from.id);
  let toWidget = widgets.find(w => w.id === cable.to.id);
  const cablesIn = getWidgetCables(toWidget, cables).in;
  const cablePosition = indexOfCable(cable,cablesIn);
  const outBend = {
    x: fromWidget.position.x + WIDGETS.SIZE/2 + WIDGETS.SIZE/CABLES.BEND_FACTOR,
    y: fromWidget.position.y
  }
  // const inBend = {
  //   x: toWidget.position.x - WIDGETS.SIZE/2 - WIDGETS.SIZE/CABLES.BEND_FACTOR ,
  //   y: toWidget.position.y
  // }
  const endPoint = {
    x: toWidget.position.x - WIDGETS.SIZE/2,
     y: toWidget.position.y + cablePosition * WIDGETS.SIZE/6
  }
  const inBend = {
    x: outBend.x,
    y: endPoint.y
  }

  return [
    fromWidget.position.x, fromWidget.position.y, 
    outBend.x, outBend.y,
    inBend.x, inBend.y,
    endPoint.x, endPoint.y
  ];
}


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
        width={WIDGETS.SIZE} height={WIDGETS.SIZE} 
        position={ { x: -WIDGETS.SIZE/2, y: -WIDGETS.SIZE/2 }}
        cornerRadius={10}
        fill={"#2F80ED"} 
      />
      <Text
        text={w.name}
        fontFamily="monospace"
        fill={"#ffffff"}
        fontSize="10"
        align="center"
        verticalAlign="middle"
        position={ { x: -WIDGETS.SIZE/2, y: -WIDGETS.SIZE/2 }}
        height={WIDGETS.SIZE}
        width={WIDGETS.SIZE}
      />
    </Group>

 
  drawCable = (cable) => 
      <Arrow
        key={`cable-${cable.from.id}-${cable.to.id}`}
        points={calculateLinePoints(cable, this.props.widgets, this.props.cables)}
        tension={CABLES.TENSION}
        pointerWidth={CABLES.POINTER_WIDTH}
        pointerLength={CABLES.POINTER_LENGTH}
        stroke={CABLES.COLOR}
        strokeWidth={CABLES.THICKNESS}
        opacity={this.state.dragging ? 0.05 : 1}
        onMouseOver={(e) => 
          this.setState({ 
            hover: {
              cable: getCableInfo(cable, this.props.widgets),
              position: { 
                left: `${e.evt.clientX}px`,
                top: `${e.evt.clientY}px`
              }
            } 
          })
        }
        onMouseLeave={() => setTimeout(() => this.setState({ hover: null }), 1000)}
      />

  componentDidMount = () => {
    this.props.widgets.forEach(widget => {

      let node;

      switch (widget.type) {
        case 'Tone.Master':
        node = Tone.Master;
        console.log('master; reference but do not instantiate');
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
        if (widget.values && widget.values.length > 0) {
          widget.values.forEach(v => changeNodeValue(node, v.id, v.value));
        }
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

    <div className="board-stage">
        <Stage width={window.innerWidth} height={window.innerHeight} >
          <Layer>
            {this.props.cables && this.props.cables.map( c => this.drawCable(c) )}      
            {this.props.widgets && this.props.widgets.map( (w, index) => this.drawWidget(w, index)) }
          </Layer>
        </Stage>
      </div>

      <div className="side-panel">
        {this.state.selectedWidgetId !== null &&
          <Inspector 
            widget={getWidget(this.props.widgets, this.state.selectedWidgetId)} 
            schema={getSchema(getWidget(this.props.widgets, this.state.selectedWidgetId))}
            types={Schema.types}
            updateValue={this.props.changeValue}
          />
        }
        <div className="controls">
          <button onClick={() => this.startAll()}>Start</button>
          <button onClick={() => this.stopAll()}>Stop</button>
        </div>
      </div>

      {this.state.hover &&
          this.state.hover.cable 
            ? <CableTip 
              info={this.state.hover.cable} 
              style={this.state.hover.position}
            /> 
            : null
        }


    </div>

}

export default connect(mapStateToProps, actionCreators)(Board);
