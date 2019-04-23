import React, { Component } from 'react';

class Inspector extends Component {

  render = () =>
    <div className="inspector">
        <h3>#{this.props.widget.id}: {this.props.widget.name}</h3>
        <form>
          {this.props.schema && this.props.schema.inputs.map(input => 
              <input type="number" name={input.name} />
          )}
        </form>
    </div>

}

export default Inspector;