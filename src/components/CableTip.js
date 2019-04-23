import React, { Component } from 'react';

class CableTip extends Component {
  render = () => (
    <div className="cable-tip" style={this.props.style}>
      from {this.props.info.from.widget.name} to {this.props.info.to.widget.name}
    </div>
  )
}

export default CableTip;