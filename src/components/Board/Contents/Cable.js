
import React from 'react';
import { Arrow } from 'react-konva';

import { CABLES } from '../../../data/Constants';
import { getWidget } from '../Board';




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
});

class Cable extends React.Component {
  render() {
    return (
      <Arrow
        key={`cable-${this.props.cable.from.id}-${this.props.cable.to.id}`}
        points={this.props.points}
        tension={CABLES.TENSION}
        pointerWidth={CABLES.POINTER_WIDTH}
        pointerLength={CABLES.POINTER_LENGTH}
        stroke={CABLES.COLOR}
        strokeWidth={CABLES.THICKNESS}
        opacity={this.props.dragging ? 0.05 : 1}
        onMouseEnter={(e) => this.props.hover({
          cable: getCableInfo(this.props.cable, this.props.widgets),
            position: { 
              left: `${e.evt.clientX}px`,
              top: `${e.evt.clientY}px`
            }
        })}
        // onMouseLeave={() => setTimeout(() => this.props.hover(null), 1000)}
      />

    )

  }
}

export default Cable;



//