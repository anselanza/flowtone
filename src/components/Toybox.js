import React, { Component } from 'react';
import { Container, Form, Row, ListGroup } from 'react-bootstrap';

import MasterControls from './MasterControls';

class Toybox extends Component {

  state = {
    searchString: ''
  }

  handleSearch = (event) => {
    this.setState({ searchString: event.target.value });
  }

  widgetList = () => this.state.searchString === ''
    ? this.props.widgets
    : this.props.widgets.filter(w => 
      w.name.toLowerCase().includes(this.state.searchString.toLowerCase())
    );

  render = () => (
    <div className="toybox">

      <Container>

        <MasterControls
          startOrStopAll={this.props.startOrStopAll}
        />

        <Form>
            <Form.Group as={Row} controlId="searchToybox" >
              <Form.Control 
                size="sm" 
                type="text" 
                placeholder="search" 
                value={this.state.searchString} 
                onChange={this.handleSearch}
              />
            </Form.Group>
    
            <ListGroup className="add-widget">
              {this.widgetList().map(widget => (
                <ListGroup.Item 
                  onClick={() => this.props.addWidget(widget)} 
                  key={"add-widget"+widget.id} 
                >
                  <span>+{' '}</span>
                  <span>{widget.name}</span> 
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Form>
      </Container>

    </div>
  )
}

export default Toybox;