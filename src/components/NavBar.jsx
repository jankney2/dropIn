import React, { Component } from 'react'
import axios from "axios"
import { Link, withRouter } from 'react-router-dom'
import store, { LOGOUT, REG_LOGIN } from '../redux/store'
import '../Css/navbar.css'


class NavBar extends Component {

  constructor(props) {
    super()
    this.state = {
      phone: '',
      pass: '',
      isLoggedIn: false
    }
  }

  handleChange = (e) => {
    let name = e.target.name

    this.setState({
      [name]: e.target.value
    })
  }

  loginHandler = async (e) => {
    e.preventDefault()
    
    try {

       await axios.post('/auth/login', {
        phone: this.state.phone,
        pass: this.state.pass
      })

      store.dispatch({
        type:REG_LOGIN, 
        payload: true
      })

let inputs=document.getElementsByTagName('input')

for(let i=0; i<inputs.length; i++) {
  inputs[i].value=''
}

this.setState({
  phone:'', 
  pass:''
})

      this.props.history.push('/userHome')
    
    }
    catch{

      alert('Incorrect Phone Number/password combination. Please try again.')
      // throw new Error(403)
    }


  }


componentDidMount() {

store.subscribe(()=>{
  const reduxState= store.getState()

  this.setState({
    isLoggedIn: reduxState.isLoggedIn
  })
})

}


  render() {


if(this.state.isLoggedIn){

    return (
      <div className="navBar">


<div id="logo">
<Link to='/'>
Dropin
</Link>
</div>
       
       
        <div className="navLinkHolder">

          <Link to='/'>
            <button onClick={() => {
              axios.get('auth/logout').then(() => {
                store.dispatch({
                  type: LOGOUT

                })

                this.setState({
                  isLoggedIn:false
                })
              })
            }}>Logout</button>
          </Link>

          <Link to='/userHome'>
            <button >Home</button>
          </Link>





        </div>

      
      </div>
    )

  }else {

    return (
      <div className="navBar">


<div id="logo">
<Link to='/'>
Dropin
</Link>
</div>
       


      <div className="navLinkHolder">


<Link to='/userHome'>
<button onClick={this.loginHandler}>Login</button>
</Link>

      <input type="text" placeholder="phone number" name='phone' onChange={this.handleChange} />




      <input type="password" placeholder="password" name='pass' onChange={this.handleChange} />




    </div>

</div>
    )


  }
  }
}

export default withRouter(NavBar)

