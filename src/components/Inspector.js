import React, { Component } from 'react';

class Inspector extends Component {

  render = () =>
    <div className="inspector">
        <h3>#{this.props.widget.id}: {this.props.widget.name}</h3>
        <form>
          {this.props.schema && this.props.schema.inputs.map(input => 
              <input 
                key={input.id}
                type="number" name={input.name} 
                onChange={(e) => { 
                  // console.log('onChange:', e.target.value);
                  this.props.updateValue(this.props.widget.id, input, e.target.value) 
                }}
              />
          )}
        </form>
    </div>

}

export default Inspector;