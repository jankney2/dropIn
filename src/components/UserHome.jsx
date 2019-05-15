import React, { Component } from 'react'
import store from '../redux/store'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../Css/userHome.css'

export default class UserHome extends Component {

  constructor() {
    super()
    const reduxState = store.getState()
    this.state = {
      user: reduxState.user,
      userLists: reduxState.userPropLists,
      userTotal: 0,
      userLocation: {},
      activeLat: '',
      activeLong: ''
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


    axios.get('/api/userSession').then(res => {

      if(!res.data.user){
        this.props.history.push('/')
        alert("it looks like you aren't logged in. Please log in to continue.")
      }

      store.dispatch(
        {
          type: 'REFRESH_SESSION',
          payload: res.data.user
        }
      )



      this.setState({
        user: res.data.user
      })

      axios.get(`/api/userTotal/${res.data.user.user_id}`).then(response => {
        this.setState({
          userTotal: response.data.count
        })
      }).catch(err => console.log(err, "userTotal req failed"))


    }).catch(err =>




      console.log('error on session request', err)

    )



    navigator.geolocation.getCurrentPosition((position) => {
      let pos = {
        userLat: position.coords.latitude,
        userLong: position.coords.longitude
      }

      this.setState({
        userLocation: pos
      })
    })



  }


  render() {

    return (
      <div className="userHome">

        <h1>Welcome Back {this.state.user.first_name}</h1>
        <h3>What can we do for you today?</h3>

        <ul>

          <li>
            <Link to='/addList'>
            <div>
              <i className="fas fa-plus-circle fa-5x"></i>
            </div>
            Add Properties

        </Link>
          </li>

          <li>
            <Link to='/listDisplay'>

            <div>
              <i class="fas fa-list-ul fa-5x"></i>
            </div>

            Display My properties


        </Link>
          </li>

          <li>
            <Link to='/referral'>

            <div>
              <i class="fas fa-user-friends fa-5x"></i>
            </div>



            Refer A Friend

        </Link>
          </li>


        </ul>


        <button onClick={() => {
          
          setInterval(
            () => {
              
              axios.post(`/api/test/${this.state.user.user_id}`, this.state.userLocation).then(res => console.log(res)).catch(err => alert(err))
            }, 1000)
            
          }}>Click me to make location request</button>

          <p>You currently have {this.state.userTotal} of your 50 properties in your database.</p>



      </div>
    )
  }

}