import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Switch, Route } from 'react-router-dom'

import EventList from './events/EventList/EventList'

function App() {
  return (
    <Switch>
      <Route path="/eventList" render = {() => <EventList />} />
    </Switch>
  )
}

export default App
