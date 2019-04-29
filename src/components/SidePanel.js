import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Inspector from './Inspector';

class SidePanel extends Component {
  render = () => (
    <Container className="side-panel">
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
    
      <Row>
          <Col>
            <div className="controls">
              <button onClick={() => this.startAll()}>Start</button>
              <button onClick={() => this.stopAll()}>Stop</button>
            </div>
          </Col>
      </Row>
  </Container>
  )
}

export default SidePanel;