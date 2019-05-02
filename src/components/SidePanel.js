import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Inspector from './Inspector';

class SidePanel extends Component {
  render = () => (
    <div className="side-panel">
      <Container>
        <Row>
          <Col>
              <Inspector 
                widget={this.props.widget} 
                schema={this.props.schema}
                types={this.props.types}
                updateValue={this.props.changeValue}
              />
          </Col>
        </Row>
      
      </Container>
  </div>
  )
}

export default SidePanel;