import React, {Component} from 'react'
import store from '../redux/store'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class UserHome extends Component {

constructor() {
  super()
 const reduxState= store.getState()
  this.state= {
    user: reduxState.user
  }
}
//this is where you'll grab the lists for the user based off of the user's id (which you can pull off of the user object on state)
componentDidMount() {
  // console.log(this)
  // axios.get(`/api/getUser/${}`)

}


render() {

  return(
    <div>

    <h1>Welcome Back {this.state.user.first_name}</h1>

    <ul>
      
      <li>
        <Link to='/addList'>add New List
        </Link>
      
         </li>
      
      <li>
        <Link to='/listDisplay'>Display My Lists
        </Link>
      
         </li>
      
      <li>
        <Link to='/userEdit'>Edit My Info
        </Link>
      
         </li>


    </ul>

    </div>
  )
}

}