import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Inspector from './Inspector';
import MasterControls from './MasterControls';

class SidePanel extends Component {
  render = () => (
    <div className="side-panel">
      <Container>

        {this.props.selectedWidgetId !== null && this.props.schema !== null && this.props.widget !== undefined &&
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
        }

        <MasterControls
          startOrStopAll={this.props.startOrStopAll}
        />

      
      </Container>
  </div>
  )
}

export default SidePanel;