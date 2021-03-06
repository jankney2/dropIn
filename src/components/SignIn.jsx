import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import store, {REG_LOGIN} from '../redux/store'
// import '../Css/signIn.css'




class SignIn extends Component {
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

      let response = await axios.post('/auth/login', {
        phone: this.state.phone,
        pass: this.state.pass
      })
      console.log("login Res", response)

      store.dispatch({
        type:REG_LOGIN, 
        payload: true
      })

      this.props.history.push('/userHome')
    }
    catch{
      throw new Error(403)
    }


  }



  render() {
    return (
      <div className="signIn">

        <h1>Welcome to DropIn!</h1>
        <h3>Proximity Alerts for Future Listings</h3>

        <label htmlFor="phone"> Phone:
          <input type="text" placeholder="phone number" name='phone' onChange={this.handleChange} />

        </label>

        <label htmlFor="pass"> Password:
          <input type="password" placeholder="password" name='pass' onChange={this.handleChange} />

        </label>


        <Link to='/userHome'>
          <button onClick={this.loginHandler}>Login</button>
        </Link>


        {/* add a link below  */}
        <p>New to DropIn? <Link to='/register'>
          Register Here
        </Link></p>
      </div>
    )
  }
}


export default withRouter(SignIn)