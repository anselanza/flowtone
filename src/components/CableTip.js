import React, { Component } from 'react';

class CableTip extends Component {
  render = () => (
    <div>
      from {this.props.info.from.widget.name} to {this.props.info.to.widget.name}
    </div>
  )
}

export default CableTip;