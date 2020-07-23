import React, { Component } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AuthService from './../service/AuthService'

import { Switch, Route, Redirect } from 'react-router-dom'

import EventList from './pages/events/EventList'
import EventDetails from './pages/events/EventDetails'
import Navigation from './UI/Navbar/Navbar'
import Home from './pages/home'
import SignupForm from './pages/auth/SignupForm'
import LoginForm from './pages/auth/LoginForm'
import Profile from './pages/profile'
import OurToast from './UI/Toast/Toast'


class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      toast: {
        text: ''
      }
    }
    this.AuthService = new AuthService()
  }

  setTheUser = user => this.setState({loggedInUser: user})

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }

  handleToast = (text) => toast.dark(text)


  render() {

    this.fetchUser()
    
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} handleToast={this.handleToast} />
  
  
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/eventList" render={() => <EventList loggedInUser={this.state.loggedInUser} handleToast={this.handleToast}/>} />
          <Route path="/eventDetails/:id" render={props => this.state.loggedInUser
            ? (<EventDetails {...props} loggedInUser={this.state.loggedInUser} />)
            : <Redirect to='/login' />}
          />
          <Route path="/signup" render={props => <SignupForm {...props} setTheUser={this.setTheUser} handleToast={this.handleToast}/>} />
          <Route path="/login" render={props => <LoginForm {...props} setTheUser={this.setTheUser} handleToast={this.handleToast}/>} />
          <Route path="/profile" render={props => this.state.loggedInUser 
            ? (<Profile {...props} loggedInUser={this.state.loggedInUser} />)
            : <Redirect to='/login' />} 
          />
          
        </Switch>

        <OurToast {...this.state.toast} handleToast={this.handleToast} />

      </>
    ) 
    

  }
}

export default App
