import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AuthService from './../service/AuthService'

import { Switch, Route, Redirect } from 'react-router-dom'

import EventList from './events/EventList/EventList'
import EventDetails from './events/EventDetails/EventDetails'
import Navigation from './UI/Navbar/Navbar'
import Home from './home/Home'
import SignupForm from './auth/SignupForm'
import LoginForm from './auth/LoginForm'
import Profile from './profile/Profile'


class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: null
    }
    this.AuthService = new AuthService()
  }

  setTheUser = user => this.setState({loggedInUser: user}, () => console.log('El estado de App ha cambiado', this.state))

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }

  render() {

    this.fetchUser()
    
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser}/>
  
  
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/eventList" render={() => <EventList loggedInUser={this.state.loggedInUser}/>} />
          <Route path="/eventDetails/:id" render={props => <EventDetails {...props} />} />
          <Route path="/signup" render={props => <SignupForm {...props} setTheUser={this.setTheUser}/>} />
          <Route path="/login" render={props => <LoginForm {...props} setTheUser={this.setTheUser} />} />
          <Route path="/profile" render={props =>
            this.state.loggedInUser
              ?
              <Profile {...props} loggedInUser={this.state.loggedInUser} />
              :
              <Redirect to='/signup' />} />
          
        </Switch>
      </>
    )

  }
}

export default App
