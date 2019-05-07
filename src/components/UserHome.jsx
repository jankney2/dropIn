import React, {Component} from 'react'
import store, { GET_USER_PROP_LISTS } from '../redux/store'
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

  axios.get(`/api/userLists/${this.state.user.user_id}`).then(res=>{
    // console.log(res.data)
    store.dispatch({
      type: GET_USER_PROP_LISTS, 
      payload: res.data
    })
  }).catch(err=>console.log(err, 'frontend get failed'))

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