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
      numberOfPages: 0,
      isIncidentOpen: false,
      openIncident: [],
      isLoading: true,
      selectedPage: 1,
    }
  }

  componentDidMount() {
    axios.get('/api/now/table/incident')
         .then(res => this.setState({ 
            incidents: res.data.result, 
            numberOfIncidents: res.data.result.length, 
            numberOfPages: Math.ceil(res.data.result.length / 10),
            isLoading: false,
          }));
  };

  openIncident(i) {
    this.setState({ isIncidentOpen: !this.state.isIncidentOpen, openIncident: i });
  }

  closeIncident() {
    this.setState({ isIncidentOpen: !this.state.isIncidentOpen, openIncident: [] })
  }

  pageButtons() {
    let buttons = [];
    for(let i = 0; i < this.state.numberOfPages; i++) {
      buttons.push(i + 1);
    };

    return buttons.map(i => <button key={i} value={i} className={this.state.selectedPage == i ? 'selected-page-button' : 'page-button'} onClick={(e) => this.selectPage(e)}>{i}</button>);
  }

  selectPage(e) {
    this.setState({ selectedPage: e.target.value });
  }

  showIncidents() {
    let incidents = [];

    for(let i = ((this.state.selectedPage * 10) - 9); i <= this.state.selectedPage * 10; i++) {
      if(!this.state.incidents[i]) break;
      incidents.push(this.state.incidents[i]);
    }

    return incidents.map(i => <li key={i.sys_id} onClick={() => this.openIncident(i)}>{i.number}: {i.short_description}</li>);
  }

  render() {
    return (
      <div className='container'>
        {
          this.state.isLoading == true ? '' :
          this.state.isIncidentOpen == false && this.state.isLoading == false ? 
          <h2 className='header'>All Incidents</h2> :
          ''
        }
        {
          this.state.isLoading == true ? '' :
          this.state.incidents.length > 0 && this.state.isIncidentOpen == false && this.state.isLoading == false ? 
          <div>
            {this.state.numberOfPages > 1 ? this.pageButtons() : <button className='selected-page-button'>1</button>}
            <ul>
              {this.showIncidents()}
            </ul>
          </div> :
          <Incident incident={this.state.openIncident} closeIncident={() => this.closeIncident()} />
        }
      </div>
    )
  }
}

export default App;
