import React, { Component } from 'react'
import store, {REG_LOGIN} from '../redux/store'
import axios from 'axios';
import '../Css/referral.css'

export default class Referral extends Component {

  constructor() {
    super()


    this.state = {

      user: '',
      telephoneInput: '',
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      referralSubmit: false,
    }
  }


  changeHandler= (e)=> {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  submitHandler=(e)=> {
    e.preventDefault()
    
    axios.post(`/api/refer/${this.state.user.user_id}`, {
      telephoneInput:this.state.telephoneInput,
      firstNameInput: this.state.firstNameInput, 
      lastNameInput: this.state.lastNameInput, 
      emailInput: this.state.emailInput 
      
    }).then(res=>{
      let inputs= document.getElementsByTagName('input')

      for(let i=0; i<inputs.length; i++) {
        inputs[i].value=''
      }
      
      this.setState({
        telephoneInput:'',
        firstNameInput:'', 
        lastNameInput:'', 
        emailInput:'',
        referralSubmit:true
      })



    }).catch(err=>console.log(err))
  }


componentDidMount() {
  axios.get('/api/userSession').then(res=>{
    if(!res.data.user){
      this.props.history.push('/')
      alert("it looks like you aren't logged in. Please log in to continue.")
    }

    store.dispatch({
      type: REG_LOGIN, 
      payload: true
    })

    this.setState({
      user:res.data.user
    })
  })

}

componentDidUpdate(prevProps, prevState) {
  if(prevState.referralSubmit!==this.state.referralSubmit){
    setTimeout(() => {
      this.props.history.push('/userHome')
    }, 5000);
    
  }
}




  render() {

if(!this.state.referralSubmit)
{
return (
  <div className="referral">

  <div className="referralInfo refCol">
    <h1>Get a discount</h1>
    <p>Real estate is built on referrals. Refer us a friend and we'll discount your rate when your friend signs up for a paid account.</p>
  </div>

    <div className="referralForm refCol" >
    
    
    <div>
    Referral First Name
    
    <input type="text" name="firstNameInput" placeholder="First Name" onChange={this.changeHandler} required />
    </div>
    
    <div> Referral Last Name
    <input type="text" name="lastNameInput" placeholder="Last Name" onChange={this.changeHandler} required /></div>
    <div>
    Referral Phone
    <input type="number" name="telephoneInput"  placeholder="Phone" onChange={this.changeHandler} required /></div>

      <div>Referral Email
      <input type="email" name="emailInput" placeholder="Email" onChange={this.changeHandler} required /></div>

    
    <button  onClick={this.submitHandler}>Submit</button>
    </div>
  </div>
)
}if(this.state.referralSubmit){
 
 
   return (
     <div className="thankYou">
 
     <h1>Thank You!</h1>
     <p>We appreciate you giving us a referral. We'll reach out if your friend signs up for DropIn</p>
     <p>This page will redirect you back to your homepage in 5 seconds</p>
     </div>
   )
   
}



}


}
