
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUp from './components/SignUp';
import ListUpload from './components/ListUpload';
import Home from './components/Home'
import UserHome from './components/UserHome'
import ListDisplay from './components/ListDisplay'
import GM from './components/GM'
import UserDetails from './components/UserDetails'


export default (

  <Switch >


<Route exact path='/' component={Home}/>


    <Route exact path='/1' component={GM} />
    <Route path='/register' component={SignUp} />
    <Route path='/userHome' component={UserHome} />
    <Route exact path='/userEdit' component={UserDetails} />
    <Route exact path='/listDisplay' component={ListDisplay} />
    <Route exact path='/addList' component={ListUpload} />





  </Switch>


)