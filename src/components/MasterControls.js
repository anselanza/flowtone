import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
 
class MasterControls extends Component {

  render = () => (
    <Row className="master-controls">
      <Col>
        <h4>Master Controls</h4>
        <div className="controls">
          <button onClick={() => this.props.startOrStopAll(true)}>Start</button>
          <button onClick={() => this.props.startOrStopAll(false)}>Stop</button>
        </div>
      </Col>
  </Row>
  )
}

export default MasterControls;
 