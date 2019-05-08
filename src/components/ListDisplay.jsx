import React, { Component } from 'react'
import store from '../redux/store'
import List from './List'
import axios from 'axios'


export default class ListDisplay extends Component {
  constructor() {
    const reduxState = store.getState()
    super()
    this.state = {
      user: reduxState.user,
      userLists: reduxState.userPropLists
      // userLists: [1,2,3,4,5]
    }
  }

  componentDidMount() {




    axios.get(`/api/userLists/${this.state.user.user_id}`).then(res => {

      this.setState({
        userLists: res.data
      })
    }).catch(err => console.log(err, 'frontend get failed'))
  }


    
    
    render() {
      var map, infoWindow;
      
    let listMap = this.state.userLists.map(el => {
      return <List key={el.list_id} name={el.list_name} deleteId={el.list_id} />
    })

    return (
      <div>

        <div>

          <h1>Property Lists</h1>

          {listMap}
        </div>

      </div>
    )
  }
}