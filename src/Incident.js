import React, { Component } from 'react';

export default class Incidents extends Component {

  render() {
    return (
      <div>
        <h2 className='header'>Incident: {this.props.incident.number}</h2>
        <button className='page-button' onClick={this.props.closeIncident}>Go Back</button>
        <div className='description'>
          <span className='title'>Status</span>: {this.props.incident.active == false ? 'Closed' : 'Open'}
        </div>
        <div className='description'>
          <span className='title'>Short Description</span>: {this.props.incident.short_description}
        </div>
        <div className='description'>
          <span className='title'>Description</span>: {this.props.incident.description}
        </div>
        <div className='description'>
          <span className='title'>Priority</span>: {this.props.incident.priority}
        </div>
        <div className='description'>
          <span className='title'>Opened at</span>: {this.props.incident.opened_at}
        </div>
      </div>
    );
  }
}