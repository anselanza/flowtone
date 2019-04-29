import React, { Component } from 'react';
import { Container, Form, Row } from 'react-bootstrap';

class Toybox extends Component {
  render = () => (
    <div className="toybox">

      <Container>
        <Form>
            <Form.Group as={Row} controlId="searchToybox">
              <Form.Control size="sm" type="text" placeholder="search" />
            </Form.Group>
    
            {this.props.widgets && this.props.widgets.map(widget => (
              <div key={widget.id}>
                <span>{widget.name}</span> 
              </div>
            ))}
    
            </Form>
      </Container>

    </div>
  )
}

export default Toybox;