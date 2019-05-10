import React, { Component } from 'react'
import store from '../redux/store'
import axios from 'axios'


export default class ListDisplay extends Component {
  constructor() {
    const reduxState = store.getState()
    super()
    this.state = {
      user: reduxState.user,
      userProperties:[]
      
    }
  }

  componentDidMount() {




    axios.get(`/api/userProperties/${this.state.user.user_id}`).then(res => {

      this.setState({
        userProperties: res.data
      })
    }).catch(err => console.log(err, 'frontend get failed'))
  }


    
    
    render() {
      
   let propertyMap= this.state.userProperties.map(el=>{
     return <div>Barf</div>
   })

    return (
      <div>

        <div>

          <h1>Property Lists</h1>
          {propertyMap}

        </div>

      </div>
    )
  }
}