import React, { Component } from 'react';
import SignIn from './components/SignIn';
import Register from './components/Register'
import LoanApplication from './components/LoanApplication'
import LoanDashboard from './components/LoanDashboard'
import Nav from './components/Nav'

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      route:'signIn',
      user: null,
      lapplication:null,
      loan: null,
    }
  }
  changeRoute=( route )=>{
    let newstate = this.state
    if(this.state.user){
      console.log(this.state.user.applicationForm)
      if(this.state.user.applicationForm){
        newstate.route = 'LoanDashboard'
      }else{
        newstate.route = 'LoanApplication'
      }
    }else if(route === 'Register' || route === 'SignIn'){
      newstate.route = route
    }
    this.setState(newstate)       
  }
  setUser=(user)=>{
    let newstate = this.state
    newstate.user = user
    this.setState(newstate) 
  }
  logout=()=>{
    console.log('logout')
    let newstate = this.state
    newstate.user = null
    newstate.route='SignIn'
    this.setState(newstate) 
  }
  render() {
    let app = (<SignIn changeRoute={this.changeRoute} setUser={this.setUser}/>)
    switch(this.state.route){
      case 'Register':
        app = (<Register changeRoute={this.changeRoute}/>)
      break;
      case 'LoanApplication':
        app = (<LoanApplication changeRoute={this.changeRoute} 
        user={this.state.user} setUser={this.setUser}/>)
      break;
      case 'LoanDashboard':
        app = (<LoanDashboard changeRoute={this.changeRoute} user={this.state.user} setUser={this.setUser}/>)
      break;
      default:
        app = (<SignIn changeRoute={this.changeRoute} setUser={this.setUser}/>)
      break;      
    }
    return (
      <div className="">
        <Nav logout={this.logout}/>
        {app}
      </div>
    );
  }
}

export default App;
