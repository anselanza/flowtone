import React, { Component } from 'react';

class Inspector extends Component {

    render = () =>
        <div className="inspector">
            <h3>#{this.props.widget.id}: {this.props.widget.name}</h3>
        </div>

}

export default Inspector;