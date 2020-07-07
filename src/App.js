import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Incident from'./Incident.js';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      incidents: [],
      numberOfIncidents: 0,
      isIncidentOpen: false,
      openIncident: [],
      isLoading: true
    }
  }

  componentDidMount() {
    axios.get('/api/now/table/incident')
         .then(res => this.setState({ incidents: res.data.result, numberOfIncidents: res.data.result.length, isLoading: false }));
  };

  openIncident(i) {
    this.setState({ isIncidentOpen: !this.state.isIncidentOpen, openIncident: i });
  }

  closeIncident() {
    this.setState({ isIncidentOpen: !this.state.isIncidentOpen, openIncident: [] })
  }

  render() {
    return (
      <div>
        {
          this.state.isLoading == true ? '' :
          this.state.isIncidentOpen == false && this.state.isLoading == false ? 
          <h2 className='header'>All Incidents</h2> :
          ''
        }
        <ul>
          {
            this.state.isLoading == true ? '' :
            this.state.incidents.length > 0 && this.state.isIncidentOpen == false && this.state.isLoading == false ? 
            this.state.incidents.map(i => <li key={i.sys_id} onClick={() => this.openIncident(i)}>{i.number}: {i.short_description}</li>) :
            <Incident incident={this.state.openIncident} closeIncident={() => this.closeIncident()}/>
          }
        </ul>
      </div>
    )
  }
}

export default App;
