import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
// import '../Css/propList.css'

class Property extends Component {

  constructor() {
    super()
    this.state = {
      edit: false,
      newNoteInput: '',


    }
  }


  changeHandler = (e) => {
    // console.log('1111111',document.getElementsByClassName('propEditInput')[this.props.deleteId].value)
    this.setState({
      [e.target.name]: e.target.value
    })

  }




  render() {
    //non edit state
    if (!this.state.edit) {


      return (
        <div className="property" >
          <p id='address'>{`${this.props.street}

            ${this.props.city}
             ${this.props.state} ${this.props.zip}`
            }</p>

          <p>Seller:{this.props.seller}</p>
          <p>Price:{this.props.price}</p>

          <p>Bedrooms:{this.props.bedrooms} Bathrooms: {this.props.bathrooms}</p>
          <p>Notes:{this.props.userNotes}</p>

<div className="propButtonHolder">
<button onClick={() => {
this.props.moveHandler(this.props.deleteId, this.props.tracker)
}}>{this.props.moverButton}</button>


<button onClick={() => {
this.setState({
edit: true
})
}}>Add Note</button>





<button onClick={() => { this.props.deleter(this.props.deleteId, this.props.userId) }}>Delete</button>
</div>

        </div>



      )
    } else 
    //edit state
    {
      return (

        <div className="property" >

          <p id='address'>{this.props.street} {this.props.city} {this.props.state} {this.props.zip}</p>
          <p>Seller:{this.props.seller}</p>
          <p>Price:{this.props.price}</p>
          <p>Bedrooms:{this.props.bedrooms} Bathrooms: {this.props.bathrooms}</p>


            {/* <textarea name="newNoteInput" className="propEditInput" required cols="30" rows="10" ></textarea> */}

            <input className="propEditInput" placeholder="add notes here" type="text"   required name="newNoteInput"  
            onChange={this.changeHandler}
            />


          <div className="propButtonHolder">
            <button onClick={() => {

              this.props.updating(this.state.newNoteInput, this.props.deleteId)
              this.setState({
                edit: false
              })

            }}>save note!</button>

            <button onClick={() => {
              this.setState({
                edit: false
              })
            }}>Cancel</button>



            <button onClick={() => { this.props.deleter(this.props.deleteId, this.props.userId) }}>Delete</button>
          </div>

        </div>



      )
    }



  }
}


export default withRouter(Property)