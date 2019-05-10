import React, {Component} from 'react'
import axios from 'axios'
import store, {  GET_SESSION } from '../redux/store';


export default class SignUp extends Component {
  constructor(){
    super()
    this.state={
      user_phone: '', 
      user_pass: '',
      first_name: '', 
      last_name: '', 
      user_email:'', 

    }
  }

handleChange= (e)=> {
  let name= e.target.name

  this.setState({
    [name]: e.target.value
  })
}

registerHandler= async (e)=> {

  e.preventDefault()
try{
let response= await axios.post('/auth/register', {
  phone: this.state.user_phone, 
  pass: this.state.user_pass, 
  firstName: this.state.first_name, 
  email: this.state.user_email, 
  lastName: this.state.last_name
})

    store.dispatch({
      type: GET_SESSION, 
      payload: response.data[0]
    })
    
    this.props.history.push('/userHome')
  }

catch {
  console.error();
  
}  

}

  render() {
    return (
      <div>

      <h1>Register for DropIn</h1>

      <label htmlFor="phone">
      <input type="text" placeholder="phone number" name='user_phone' onChange={this.handleChange} required/>

      </label>

      <label htmlFor="pass">
      <input type="password" placeholder="password" name='user_pass' onChange={this.handleChange} required/>

      </label>

      <label htmlFor="email">
      <input type="email" placeholder="email" name='user_email' onChange={this.handleChange} required/>

      </label>

      <label htmlFor="firstName">
      <input type="text" placeholder="first Name" name='first_name' onChange={this.handleChange} required/>

      </label>

      <label htmlFor="last Name">
      <input type="text" placeholder="Last Name" name='last_name' onChange={this.handleChange} required/>

      </label>

      <button onClick={this.registerHandler}>register!</button>



      </div>
    )
  }
}