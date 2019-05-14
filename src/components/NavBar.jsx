import React, { Component } from 'react'
import axios from "axios"
import { Link, withRouter } from 'react-router-dom'
import store, { LOGOUT, GET_SESSION_REG } from '../redux/store'
import '../Css/navbar.css'


class NavBar extends Component {

  constructor(props) {
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

  loginHandler = async (e) => {
    e.preventDefault()
    
    try {
      let reduxState=store.getState()
      let response = await axios.post('/auth/login', {
        phone: this.state.phone,
        pass: this.state.pass
      })

      store.dispatch({
        type: GET_SESSION_REG, 
        payload: response.data.user
      })


      this.props.history.push('/userHome')
      this.setState({
        isLoggedIn:true
      })
    
    }
    catch{
      throw new Error(403)
    }


  }


componentDidMount() {
  let reduxState=store.getState()
  this.setState({
    isLoggedIn:reduxState.isLoggedIn
  })

  
}


  render() {


if(this.state.isLoggedIn){

    return (
      <div className="navBar">
        <div>logo</div>


        <div>Dropin</div>
       
       
       
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
        <div>logo</div>


        <div>Dropin</div>
       


      <div className="navLinkHolder">



      <input type="text" placeholder="phone number" name='phone' onChange={this.handleChange} />




      <input type="password" placeholder="password" name='pass' onChange={this.handleChange} />




    <Link to='/userHome'>
      <button onClick={this.loginHandler}>Login</button>
    </Link>
    </div>

</div>
    )


  }
  }
}

export default withRouter(NavBar)

