import React, { Component } from 'react';
import { Col, Container} from 'react-bootstrap';

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
    <Col>
      <Container>
        <h4>#{this.props.widget.id}: {this.props.widget.name}</h4>
        <form>
          {this.props.schema && this.props.schema.inputs.map(input => 
            <div key={input.id}>
              {input.name}: 
              <input 
                type="number" name={input.name} 
                value={loadOrUseDefaultValues(input, this.props.widget.values)}
                onChange={(e) => { 
                  this.props.updateValue(this.props.widget.id, input, e.target.value) 
                }}
              />
              {this.props.types.find(t => t.id === input.type).postfix}
            </div>
          )}
        </form>
      </Container>
    </Col>

}

export default Inspector;