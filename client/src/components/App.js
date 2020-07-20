import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Switch, Route } from 'react-router-dom'

import EventList from './events/EventList/EventList'
import EventDetails from './events/EventDetails/EventDetails'
import Navigation from './UI/Navbar/Navbar'
import Home from './home/Home'
import SignupForm from './auth/SignupForm'
import LoginForm from './auth/LoginForm'


function App() {
  return (
    <>
      <Navigation />


      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/eventList" render={() => <EventList />} />
        <Route path="/eventDetails/:id" render={props => <EventDetails {...props} />} />
        <Route path="/signup" render={props => <SignupForm {...props}/>} />
        <Route path="/login" render={props => <LoginForm {...props}/>} />
      </Switch>
    </>
  )
}

export default App
