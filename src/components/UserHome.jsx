import React, {Component} from 'react'
import store from '../redux/store'
import axios from 'axios'


export default class UserHome extends Component {

constructor() {
  super()
 const reduxState= store.getState()
  this.state= {
    user: reduxState.user
  }
}

componentDidMount() {
  // console.log(this)
  // axios.get(`/api/getUser/${}`)

}


render() {

  return(
    <div>

    <h1>Welcome Back {this.state.user.first_name}</h1>

    <ul>
      <li>add New List </li>
      <li>See Map </li>
      <li>Edit Profile Info </li>
    </ul>

    </div>
  )
}

}