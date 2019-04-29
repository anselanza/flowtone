import React, { Component } from 'react';
import { Container, Form, Row } from 'react-bootstrap';


class Toybox extends Component {

  state = {
    searchString: ''
  }

  handleSearch = (event) => {
    this.setState({ searchString: event.target.value });
  }

  widgetList = () => this.state.searchString === ''
    ? this.props.widgets
    : this.props.widgets.filter(w => w.name.toLowerCase().includes(this.state.searchString.toLowerCase()));

  render = () => (
    <div className="toybox">

      <Container>
        <Form>
            <Form.Group as={Row} controlId="searchToybox">
              <Form.Control 
                size="sm" 
                type="text" 
                placeholder="search" 
                value={this.state.searchString} 
                onChange={this.handleSearch}
              />
            </Form.Group>
    
            {this.widgetList().map(widget => (
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