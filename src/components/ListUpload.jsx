import React, { Component } from 'react'
import axios from 'axios'
import Papa from 'papaparse'
import store from '../redux/store'
import '../Css/addList.css'
//known bug: keys in new list data have spaces in their names. 



export default class ListUpload extends Component {
  constructor() {
    super()
    this.state = {
      newListName: '',
      newListData: [],
      individualListName: '',
      individualListRows: [1]
    }
  }


componentDidMount() {
  axios.get('/api/userSession').then(res=>{
 
    console.log(res.data.user)
     store.dispatch(
      {
        type: 'REFRESH_SESSION', 
        payload: res.data.user
      }
      )
   
      let reduxState= store.getState()
   
      this.setState({
        user: reduxState.user
      })
   
   }).catch(err=>console.log('error on session request', err))
}



  changeHandlerIndividual = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }




//there are different submit handlers for the individual and csv data. 
  submitHandler = (e) => {
    e.preventDefault()
    let file = document.getElementById('fileUp')
    // console.log(file.files[0])


    if (!this.state.newListName) {
      return alert("please enter a name for this list")
    }

    Papa.parse(file.files[0], {
      header: true,
      complete: (res) => {
        this.setState({
          newListData: res.data
        })
        console.log('parsed')
      }
    }
    )

    setTimeout(() => {
      axios.post('/api/addList', {
        listName: this.state.newListName,
        properties: this.state.newListData,
      }).then(()=>this.routeToHome()).catch(err => console.log(err, 'add list failed'))
    }, 1000)


  }

  submitHandlerIndividual = () => {
    axios.post(`/api/addlistIndividual`, {
      bathrooms: this.state.bathroomsInput,
      bedrooms: this.state.bedroomsInput,
      newListName: this.state.individualListName,
      seller: this.state.sellerInput,
      street: this.state.streetInput,
      zip: this.state.zipInput,
      city: this.state.cityInput,
      state: this.state.stateInput, 
      price: this.state.priceInput
    }).then(()=>{
      this.setState({
        bathroomsInput:'', 
        bedroomsInput:'', 
        individualListName:'', 
        sellerInput:'', 
        zipInput:'', 
        cityInput:'', 
        stateInput:'', 
      })

      this.routeToHome()

    })

  }


  routeToHome=()=>{
    this.props.history.push('/userHome')
  }

  render() {

    let mapper= this.state.individualListRows.map((el, i)=> {
      return(
        <div key={i}>
        <input onChange={this.changeHandlerIndividual} type="text" name="streetInput" placeholder="Street"
          required
        />

        <input onChange={this.changeHandlerIndividual} type="text" placeholder="City"
          name="cityInput"
          required
        />

        <input onChange={this.changeHandlerIndividual} type="text" placeholder="State"
          name="stateInput"

          required
        />

        <input onChange={this.changeHandlerIndividual} type="text"
          name="zipInput"
          placeholder="Zip"
          required
        />

        <input onChange={this.changeHandlerIndividual} type="text"
          name="bathroomsInput"
          placeholder="Bathrooms"
          required
        />

        <input onChange={this.changeHandlerIndividual} type="text"
          name="bedroomsInput"
          placeholder="Bedrooms"
          required
        />

        <input onChange={this.changeHandlerIndividual} type="text"
          name="sellerInput"
          placeholder="Seller Name"
          required
        />

        <input onChange={this.changeHandlerIndividual} type="text"
          name="priceInput"
          placeholder="Price"
          required
        />
        
        </div>
      )
    })



    return (
      <div className='addListMaster'>

        <div className="csvContainer listCol">

          <h1>Create New Property List</h1>
          


          <div className="fileInputCont">
            <input type="text" placeholder="List Name" onChange={(e) => {
              this.setState({
                newListName: e.target.value
              })
            }} />

            <input type="file" id="fileUp" />

            <button onClick={(e) => {
              this.submitHandler(e)
            }}>click to Submit</button>
          </div>


        </div>

        <div className="listCol">

          <h1>Only have a few properties? upload them below</h1>

          <input onChange={this.changeHandlerIndividual} type="text" name="individualListName" placeholder="List Name"
            required
          />
         {mapper}
         

          <button onClick={this.submitHandlerIndividual}>Add List</button>

        </div>


      </div>
    )
  }

}