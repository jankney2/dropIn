import React, {Component} from 'react'
import store, { GET_USER_PROP_LISTS, GET_SESSION } from '../redux/store'
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
    userLocation: {}, 
    activeLat:'', 
    activeLong:''
  }
}
//this is where you'll grab the lists for the user based off of the user's id (which you can pull off of the user object on state)
componentDidMount() {

  //active location grab? untested. 
// navigator.geolocation.watchPosition((position)=>{
//   this.setState({
//     activeLat: position.coords.latitude, 
//     activeLong: position.coords.longitude
//   })
// })


axios.get('/api/userSession').then(res=>{
 
 console.log(res.data.user)
  store.dispatch(
   {
     type: 'REFRESH_SESSION', 
     payload: res.data.user
   }
   )

   let reduxState= store.getState()

   this.setState({
     user: reduxState.user
   })

}).catch(err=>console.log('error on session request', err))


  axios.get(`/api/userTotal/${this.state.user.user_id}`).then(res=> {
    this.setState({
      userTotal:res.data.count
    })
  })

  // axios.get(`/api/userLists/${this.state.user.user_id}`).then(res=>{

  //   store.dispatch({
  //     type: GET_USER_PROP_LISTS, 
  //     payload: res.data
  //   })
  // }).catch(err=>console.log(err, 'frontend get failed'))


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
        <Link to='/listDisplay'>Display My properties
        </Link>
      
         </li>
      
      <li>
        <Link to='/userEdit'>Edit My Info
        </Link>
      
         </li>


    </ul>


<button onClick= {()=>{

setInterval(
()=>{

  axios.post(`/api/test/${this.state.user.user_id}`, this.state.userLocation ).then(res=>console.log(res)).catch(err=>alert(err))
}, 1000)

}}>Click me to make location request</button>


    </div>
  )
}

}