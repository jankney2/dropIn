import React, {Component} from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'
import store, {LOGOUT} from '../redux/store'

export default class NavBar extends Component{


  render(){
    let reduxState=store.getState()
    return(
      <div>
<div>logo</div>
<div>Dropin</div>

<Link to='/'>
<button onClick={()=>{
  axios.get('auth/logout').then(()=>{
    store.dispatch({
      action:LOGOUT 
      
    })
  })
}}>Logout</button>
</Link>
      </div>
    )
  }
}



