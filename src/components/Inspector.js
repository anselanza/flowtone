import React, { Component } from 'react';

const loadOrUseDefaultValues = (input, widgetValues) => {
  if (widgetValues === undefined || widgetValues.length === 0) {
    return input.default;
  }
  let alreadySet = widgetValues.find(v => v.id === input.id);
  if (alreadySet !== undefined) {
    return alreadySet.value;
  } else {
    return input.default;
  }
}

class Inspector extends Component {

  render = () =>
    <div className="inspector">
        <h3>#{this.props.widget.id}: {this.props.widget.name}</h3>
        <form>
          {this.props.schema && this.props.schema.inputs.map(input => 
              <input 
                key={input.id}
                type="number" name={input.name} 
                value={loadOrUseDefaultValues(input, this.props.widget.values)}
                onChange={(e) => { 
                  this.props.updateValue(this.props.widget.id, input, e.target.value) 
                }}
              />
          )}
        </form>
    </div>

}

export default Inspector;