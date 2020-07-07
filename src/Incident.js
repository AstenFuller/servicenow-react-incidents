import React, { Component } from 'react';

export default class Incidents extends Component {
  constructor(props) {
    super(props);
    
  };

  componentDidMount() {
    console.log(this.props.incident);
  }

  render() {
    return (
      <div>
        <button className='back' onClick={this.props.closeIncident}>Go Back</button>
        <h2 className='header'>Incident: {this.props.incident.number}</h2>
      </div>
    );
  }
}