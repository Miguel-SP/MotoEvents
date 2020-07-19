import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Switch, Route } from 'react-router-dom'

import EventList from './events/EventList/EventList'
import EventDetails from './events/EventDetails/EventDetails'
import Navigation from './UI/Navbar/Navbar'
import Home from './home/Home'


function App() {
  return (
    <>
      <Navigation />


      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/eventList" render={() => <EventList />} />
        <Route path="/eventDetails/:id" render={props => <EventDetails {...props} />} />
      </Switch>
    </>
  )
}

export default App
