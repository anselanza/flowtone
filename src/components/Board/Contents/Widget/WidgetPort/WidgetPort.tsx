import React from 'react';
import { Group, Text, Circle, Rect } from 'react-konva';

export enum WidgetPortType {
  input, output
}

interface IWidgetPortProps {
  label: string,
  index: number,
  numPorts: number,
  boxSize: {
    width: number,
    height: number
  },
  type: WidgetPortType,
  debug: boolean,
}

class WidgetPort extends React.PureComponent<IWidgetPortProps> {
  render = () => {
    const isInput = this.props.type === WidgetPortType.input;
    const spacing = 10;

    const box = {
      x: -this.props.boxSize.width / 2,
      y: -(this.props.numPorts + this.props.index * spacing),
      width: this.props.boxSize.width,
      height: this.props.boxSize.height
    }
    return (
      <Group>
        {this.props.debug &&
          <Rect {...box} stroke={'#ff0000'} />
        }
        <Text 
          text={this.props.label}
          y={box.y + this.props.index * spacing}
          fill={'#fff'}
          fontSize={8}
          align={'left'}
          {...box}
        />        
      </Group>
    )
  }
}

export default WidgetPort;