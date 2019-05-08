import React, {Component} from 'react'
import store, { GET_USER_PROP_LISTS } from '../redux/store'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class UserHome extends Component {

constructor() {
  super()
 const reduxState= store.getState()
  this.state= {
    user: reduxState.user,
    userLists: reduxState.userPropLists,
    userTotal:0, 
    userLocation: {}
  }
}
//this is where you'll grab the lists for the user based off of the user's id (which you can pull off of the user object on state)
componentDidMount() {
//this doesn't work for some reason when you refresh the page
  axios.get(`/api/userTotal/${this.state.user.user_id}`).then(res=> {
    this.setState({
      userTotal:res.data.count
    })
  })

  axios.get(`/api/userLists/${this.state.user.user_id}`).then(res=>{

    store.dispatch({
      type: GET_USER_PROP_LISTS, 
      payload: res.data
    })
  }).catch(err=>console.log(err, 'frontend get failed'))


  navigator.geolocation.getCurrentPosition((position)=>{
    let pos= {
      userLat:position.coords.latitude,
      userLong:position.coords.longitude
    }

    this.setState({
      userLocation:pos
    })
  })

}


render() {

  return(
    <div>

    <h1>Welcome Back {this.state.user.first_name}</h1>

    <p>You currently Have {this.state.userTotal} of your 2000 properties in your database.</p>

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


<button onClick= {()=>{
  axios.post(`/api/test/${this.state.user.user_id}`, this.state.userLocation ).then(res=>console.log(res.body)).catch(err=>alert(err))
}}>Click me to make location request</button>


    </div>
  )
}

}