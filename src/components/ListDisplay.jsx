import React, { Component } from 'react'
import store, { REG_LOGIN } from '../redux/store'
import axios from 'axios'
import Property from './Property';
import '../Css/propList.css'

export default class ListDisplay extends Component {
  constructor() {
    const reduxState = store.getState()
    super()
    this.state = {
      user: reduxState.user,
      userProperties: []

    }
  }


  moveHandler = async (propId, status) => {

    try {

      let response = await axios.put(`/properties/${propId}`, {
        trackingStatus: !status,
        userId: this.state.user.user_id
      })

      this.setState({
        userProperties: response.data
      })

    } catch (error) {
      console.log(error, "error with moveHandler")
    }


  }


  deleter = (deleteId, userId) => {
    axios.delete(`/properties/deleteProperty/${deleteId}`).then((res) => {

      // console.log(res)
      this.setState({
        userProperties: res.data
      })
    }).catch(err => console.log("deleter Err", err))
  }


  updating = (input, id) => {
    axios.put(`/properties/addNote/${id}`, {
      noteText: input
    }
    ).then((res) => {

      this.setState({
        // edit: false,
        userProperties: res.data
      })
    }).catch(err => console.log(err))

  }



  componentDidMount() {


    axios.get('/api/userSession').then(res => {

      if (!res.data.user) {
        store.dispatch({
          type: REG_LOGIN,
          payload: false
        })
        this.props.history.push('/')
        alert("it looks like you aren't logged in. Please log in to continue.")
      }

      store.dispatch(
        {
          type: 'REFRESH_SESSION',
          payload: res.data.user
        }
      )
      store.dispatch({
        type: REG_LOGIN,
        payload: true
      })
      let reduxState = store.getState()

      this.setState({
        user: reduxState.user
      })

      axios.get(`/CRM/${this.state.user.user_id}`).then(res => {

        this.setState({
          userProperties: res.data
        })
      }).catch(err => console.log(err, 'frontend get failed'))

    }).catch(err => console.log('error on session request', err))

  }




  render() {

    let trackedPropertyMap = this.state.userProperties.map(el => {
      // console.log(this.state)
      if (el.is_tracked) {
        return <Property
          className="property"
          owningUserId={this.state.user.user_id}
          moveHandler={this.moveHandler}
          moverButton='move to untracked'
          key={el.property_id}
          deleteId={el.property_id}
          price={el.price}
          street={el.street}
          seller={el.seller}
          state={el.state}
          zip={el.zip}
          city={el.city}
          userNotes={el.user_notes}
          tracker={el.is_tracked}
          bedrooms={el.bedrooms}
          bathrooms={el.bathrooms}
          deleter={this.deleter}
          updating={this.updating}
          user={this.state.user}
        />
      }

    })

    let untrackedPropertyMap = this.state.userProperties.map(el => {


        return <Property
          className="property"
          moveHandler={this.moveHandler}
          moverButton='move to tracked'
          key={el.property_id}
          deleteId={el.property_id}
          price={el.price}
          street={el.street}
          seller={el.seller}
          state={el.state}
          zip={el.zip}
          city={el.city}
          userNotes={el.user_notes}
          tracker={el.is_tracked}
          bedrooms={el.bedrooms}
          bathrooms={el.bathrooms}
          deleter={this.deleter}
          updating={this.updating}
          user={this.state.user}
        />


    })

    return (
      <div className="listDisplay">

        <div>

          <p>{untrackedPropertyMap.length}/50 Properties in DB</p>
          <div className='propertyHolder'>
            {untrackedPropertyMap}</div>

        </div>

      </div>
    )
  }
}