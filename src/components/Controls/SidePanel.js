import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Inspector from './Inspector';

class SidePanel extends Component {
  render = () => {
  
    const selected = this.props.selectedWidgetId !== null && this.props.schema !== null && this.props.widget !== undefined;

    return (
      <div className="side-panel semi-trans-bg">
        <Container>

          <Row>
            <Col>
              {selected === true
                ? <Inspector 
                    widget={this.props.widget} 
                    schema={this.props.schema}
                    types={this.props.types}
                    updateValue={this.props.updateValue}
                  />
                
                : <div>
                  Nothing selected.
                </div>
              }
            </Col>
          </Row>
          </Container>
      </div>
    );
  }
}

export default SidePanel;