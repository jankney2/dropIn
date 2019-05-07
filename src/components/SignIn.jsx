import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import store, {GET_SESSION} from '../redux/store'
import {Route} from 'react-router-dom'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      pass: ''
    }
  }

  handleChange = (e) => {
    let name = e.target.name

    this.setState({
      [name]: e.target.value
    })
  }

  loginHandler = (e) => {
    e.preventDefault()


    axios.post('/auth/login', {
      phone: this.state.phone,
      pass: this.state.pass
    }).then((response)=> {

      store.dispatch({
        type: GET_SESSION, 
        payload: response.data
      })
      
    })
    
    
    .catch((err => console.log(err)))
    //set session to redux store 
    


  }

  render() {
    return (
      <div>

        <h1>Welcome to DropIn! Please Login</h1>

        <label htmlFor="phone">
          <input type="text" placeholder="phone number" name='phone' onChange={this.handleChange} />

        </label>

        <label htmlFor="pass">
          <input type="password" placeholder="password" name='pass' onChange={this.handleChange} />

        </label>

        <button onClick={this.loginHandler}>Login</button>


        {/* add a link below  */}
        <p>New to DropIn? <Link to='/register'>
          Register Here
        </Link></p>
      </div>
    )
  }
}