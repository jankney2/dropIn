import React, {Component} from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'


export default class NavBar extends Component{


  render(){
    return(
      <div>
<div>logo</div>
<div>Dropin</div>

<Link to='/'>
<button onClick={()=>{
  axios.get('auth/logout').then(alert('See you again soon!'))
}}>Logout</button>
</Link>
      </div>
    )
  }
}



