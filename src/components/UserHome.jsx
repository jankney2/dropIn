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
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        activeLat: position.coords.latitude,
        activeLong: position.coords.longitude
      })
    })


    axios.get('/api/userSession').then(res => {

      if (!res.data.user) {
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


        <ul>

          <li>
            <Link to='/addList'>
              <div>
                <i className="fas fa-plus-circle fa-5x"></i>
              </div>
              <p>Add Properties</p>

            </Link>
          </li>

          <li>
            <Link to='/listDisplay'>

              <div>
                <i className="fas fa-list-ul fa-5x"></i>
              </div>

              <p>
                Display My properties
  </p>


            </Link>
          </li>

          <li>
            <Link to='/referral'>

              <div>
                <i className="fas fa-user-friends fa-5x"></i>
              </div>



              <p>
                Refer A Friend
  </p>

            </Link>
          </li>


        </ul>







        <div className='userHomeGreeter'>
        <h1>You are at Lat {this.state.activeLat} Long: {this.state.activeLong}</h1>


          <h1>Welcome back {this.state.user.first_name}</h1>
          <button onClick={() => {
            //static location
            // setInterval(
            //   () => {

            //     axios.post(`/api/test/${this.state.user.user_id}`, this.state.userLocation).then(res => console.log(res)).catch(err => alert(err))
            //   }, 10000)

            //active location grab
            setInterval(
              () => {

                navigator.geolocation.watchPosition((position) => {
                  this.setState({
                    activeLat: position.coords.latitude,
                    activeLong: position.coords.longitude
                  })
                })

                axios.post(`/api/test/${this.state.user.user_id}`, {
                  userLat:this.state.activeLat, 
                  userLong: this.state.activeLong
                }).then(res => console.log(res)).catch(err => alert(err))
              }, 10000)

          }}>Start Tracking</button>




          <p>You currently have {this.state.userTotal} properties in your database.</p>



        </div>









      </div>
    )
  }

}