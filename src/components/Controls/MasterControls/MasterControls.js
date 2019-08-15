import React, { Component } from 'react';
import { Col, Container } from 'react-bootstrap';
import './MasterControls.scss';
 
class MasterControls extends Component {

  render = () => (
        <Container>
          <h4>Master Controls</h4>
          <div className="controls">
            <button onClick={() => this.props.startOrStopAll(true)}>Start</button>
            <button onClick={() => this.props.startOrStopAll(false)}>Stop</button>
          </div>
        </Container>
  )
}

export default MasterControls;
 