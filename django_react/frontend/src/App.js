import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'

import  LeadsList from './LeadsList'
import  LeadCreateUpdate  from './LeadCreateUpdate'
import './App.css';



let crtStyle = {
		backgroundColor: '#51B3AA'
	}
let lstStyle = {
  backgroundColor: '#289694'
}
const BaseLayout = () => (
  <div className="container-fluid">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand"   href="#">Django React </a>
  <button className="navbar-toggle navbar-toggler  navbar-toggler-right" type="button"  data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon icon-bar"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" style={lstStyle} href="/">USERS</a>
      <a className="nav-item nav-link" style={crtStyle} href="/leads">CREATE USER</a>

    </div>
  </div>
</nav>

    <div className="content">
      <Route path="/" exact component={LeadsList} />
      <Route path="/leads/:id"  component={LeadCreateUpdate} />
      <Route path="/leads/" exact component={LeadCreateUpdate} />

    </div>

  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;