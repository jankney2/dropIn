import React, { Component } from 'react'
import store, {UPDATE_USER_INFO} from '../redux/store'
import axios from 'axios';


export default class UserDetails extends Component {

  constructor() {
    super()

    const reduxState = store.getState()
    this.state = {

      user: reduxState.user,
      userFirstName: reduxState.user.first_name,
      userLastName: reduxState.user.last_name,
      userEmail: reduxState.user.user_email,
      userPhone: reduxState.user.user_phone,
      telephoneInput: '',
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      edit: false,
    }
  }


  changeHandler= (e)=> {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  submitHandler=()=> {
    axios.put(`/api/users/updateInfo/${this.state.user.user_id}`, {
      telephoneInput:this.state.telephoneInput,
      firstNameInput: this.state.firstNameInput, 
      lastNameInput: this.state.lastNameInput, 
      emailInput: this.state.emailInput 
      
    }).then(res=>{
      store.dispatch({
        //update user on store
        action: UPDATE_USER_INFO, 
        payload: res.data
      })
      const reduxState= store.getState()
      this.setState({
        telephoneInput:'',
        firstNameInput:'', 
        lastNameInput:'', 
        emailInput:'',
        user: reduxState.user,
        userFirstName: reduxState.user.first_name,
        userLastName: reduxState.user.last_name,
        userEmail: reduxState.user.user_email,
        userPhone: reduxState.user.user_phone,
        
      })
    })
  }

  render() {

//maybe turn this first one into a "re-enter your password- if password is true, then display the second part. "
if(!this.state.edit){
    return (
      <div>

        <h3>First Name:{this.state.userFirstName}</h3>
        <h3>Last Name:{this.state.userLastName}</h3>
        <h3>Email: {this.state.userEmail}</h3>
        <h3>Phone: {this.state.userPhone}</h3>

        <button onClick={() => {
          this.setState({
            edit: true
          })
        }}>edit Info</button>
      </div>
    )
  }
else{
  return(
    <div>
<h1>Update Your info Below</h1>

     <label htmlFor="newFirstName">New First name: 
    <input onChange={this.changeHandler} type="text" placeholder={this.state.userFirstName} name="firstNameInput"/>
    </label>


     <label htmlFor="newLastName">New Last name: 
    <input onChange={this.changeHandler} type="text" placeholder={this.state.userLastName} name="lastNameInput"/>
    </label>


     <label htmlFor="newEmail">New Email: 
    <input onChange={this.changeHandler} type="email" placeholder={this.state.userEmail} name="emailInput"/>
    </label>


     <label htmlFor="newPhone">New Phone: 
    <input onChange={this.changeHandler} type="text" placeholder={this.state.userPhone} name="telephoneInput"/>
    </label>

    <button>Save! </button>

    </div>
  )
}

}


}