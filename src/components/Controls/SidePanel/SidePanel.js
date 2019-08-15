import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './SidePanel.scss';

import Inspector from '../Inspector/Inspector';
import MasterControls from '../MasterControls/MasterControls';
import Toybox from '../Toybox/Toybox';

import Schema from '../../../data/Schema';

class SidePanel extends Component {
  render = () => {
  
    const selected = this.props.selectedWidgetId !== null && this.props.schema !== null && this.props.widget !== undefined;

    return (
      <div className="SidePanel">
        <Container>
        
          <Row className="MasterControls">
            <MasterControls />
          </Row>

          <Row>
            <Toybox 
              widgets={Schema.nodes} 
              addWidget={this.props.addWidget} 
              startOrStopAll={this.props.startOrStopAll} 
            />
          </Row>

          <Row>
              {selected === true
                ? <Inspector 
                    widget={this.props.widget} 
                    schema={this.props.schema}
                    types={this.props.types}
                    updateValue={this.props.updateValue}
                  />
                
                : <Container>
                  Nothing selected.
                </Container>
              }
          </Row>

          </Container>
      </div>
    );
  }
}

export default SidePanel;