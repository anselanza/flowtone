import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class Toybox extends Component {
  render = () => (
    <Container className="toybox">
      <h2>Toybox</h2>
      {this.props.widgets && this.props.widgets.map(widget => (
        <div key={widget.id}>
          <span>{widget.name}</span> 
        </div>
      ))}
    </Container>
  )
}

export default Toybox;