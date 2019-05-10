import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import store from '../redux/store'

class Property extends Component {


  

  render() {
    return(
      <div style={{display:'flex'}}>

      <p>Tracking: <input type="checkbox"  /> </p>
      <p>Seller:{this.props.seller}</p>
      <p>Price:{this.props.price}</p>
      <p>Address:{this.props.street} {this.props.city} {this.props.state} {this.props.zip}</p>
      <p>Bedrooms:{this.props.bedrooms} Bathrooms: {this.props.bathrooms}</p>
      
      <button onClick={()=> {this.props.deleter(this.props.delteId, this.props.userId)}}>Delete</button>
      
      </div>
    )
  }
}


export default withRouter(Property)