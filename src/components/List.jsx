import React, {Component} from 'react'
import axios from 'axios'



export default class List extends Component{

constructor(){
  super()
  this.state={
    properties:[]
  }
}
//get all property information based off list id from the properties table

componentDidMount() {
  axios.get(`/api/properties/${this.props.deleteId}`).then(res=>{
    this.setState({
      properties: res.data
    })
  })
}

// componentDidUpdate(prevProps, prevState) {

// }


deleteHandler= () => {
axios.delete(`/api/userLists/${this.props.deleteId}`)



//remove list from table but also remove list_id from property
}

  render(){
    return(
      <div>
        <h1>I'm a list! {this.props.name} </h1>
{/* this one is the big one... */}
        <button>Display Me on Map</button>
        
        
        <button onClick={this.deleteHandler}>delete this list!</button>
      </div>
    )
  }
}