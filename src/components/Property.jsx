import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import axios from 'axios';

class Property extends Component {

  constructor() {
    super()
    this.state = {
      edit: false, 
      newNoteInput:''
    }
  }


changeHandler=(e)=>{

this.setState({
  [e.target.name]:e.target.value
})


}




  render() {

    if (!this.state.edit) {


      return (
        <div style={{
          display: 'flex',
          margin: '10px',

        }}>

          <p>Tracking: <input type="checkbox" /> </p>
          <p>Seller:{this.props.seller}</p>
          <p>Price:{this.props.price}</p>
          <p>Address:{this.props.street} {this.props.city} {this.props.state} {this.props.zip}</p>
          <p>Bedrooms:{this.props.bedrooms} Bathrooms: {this.props.bathrooms}</p>
          <p>{this.props.userNotes}</p>

          <button onClick={() => {
            this.setState({
              edit:true
            })
          }}>Add Note</button>





          <button onClick={() => { this.props.deleter(this.props.deleteId, this.props.userId) }}>Delete</button>

        </div>



      )
    } else {
      return (
        
        <div style={{
          display: 'flex',
          margin: '10px',

        }}>

          <p>Tracking: <input type="checkbox" /> </p>
          <p>Seller:{this.props.seller}</p>
          <p>Price:{this.props.price}</p>
          <p>Address:{this.props.street} {this.props.city} {this.props.state} {this.props.zip}</p>
          <p>Bedrooms:{this.props.bedrooms} Bathrooms: {this.props.bathrooms}</p>
          
          
          <input type="text" required  name="newNoteInput" onChange={this.changeHandler}/>

          <button onClick={() => {
            
            this.props.updating(this.state.newNoteInput, this.props.deleteId)
            this.setState({
              edit:false
            })

          }}>save note!</button>

          <button onClick={()=>{
            this.setState({
              edit: false
            })
          }}>Cancel</button>



          <button onClick={() => { this.props.deleter(this.props.deleteId, this.props.userId) }}>Delete</button>

        </div>



      )
    }



  }
}


export default withRouter(Property)