import React, { Component } from 'react';
import { Group, Rect, Text } from 'react-konva';
import Konva from 'konva';

import { WIDGETS } from '../../../data/Constants';

class Widget extends Component {

  state = {
    hover: false
  }

  render = () =>
    <Group 
      key={this.props.widget.id}
      position= {this.props.widget.position}
      draggable
      onMouseEnter={ () => this.setState({ hover: true }) }
      onMouseLeave={ () => this.setState({ hover: false }) }
      onMouseDown={ () => this.props.inspectWidget(this.props.widget.id) }
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
        this.props.moveWidget(this.props.widget.id, { x, y });
      }}
      >
      <Rect 
        width={WIDGETS.SIZE} height={WIDGETS.SIZE} 
        position={ { x: -WIDGETS.SIZE/2, y: -WIDGETS.SIZE/2 }}
        cornerRadius={10}
        fill={this.state.hover === true ? "#00FF00" : "#2F80ED"} 
      />
      <Text
        text={this.props.widget.name}
        fontFamily="monospace"
        fill={"#ffffff"}
        fontSize={10}
        align="center"
        verticalAlign="middle"
        position={ { x: -WIDGETS.SIZE/2, y: -WIDGETS.SIZE/2 }}
        height={WIDGETS.SIZE}
        width={WIDGETS.SIZE}
      />
      {this.state.hover &&
        <Text
          text={JSON.stringify(this.props.schema)}
        />
      }
    </Group>
}

export default Widget;