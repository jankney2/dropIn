import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Css/Home.css'



export default class Home extends Component {
  render() {
    return (
      

        <div className="introText homePage">


          <div className="homeText">
          <h1>DropIn</h1>
          <h3>Proximity Alerts for Future Listings</h3>
          
          
          
          <p>New to DropIn? <Link to='/register'>
          Register Here
          
          </Link></p>

          <p>
            What is DropIn? <Link to='/info'>
              Find Out
            </Link>

          </p>
          
          </div>

          
        </div>

      
    )
  }
}