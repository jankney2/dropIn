import React, { Component } from 'react'
import axios from 'axios'
import Papa from 'papaparse'





export default class ListUpload extends Component {
  constructor() {
    super()
    this.state = {
      newListName: '',
      newListData: []
    }
  }


  //ok i am stuck - i need to get the file through the parser, and then set that data to a post request 

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
      }
    }
    )

    axios.post('/api/addList', {
      listName: this.state.newListName,
      properties: this.state.newListData,
    }).catch(err=>console.log(err, 'add list failed'))

  }

  render() {
    return (
      <div>

        <div className="csvContainer">

          <h1>Create New Property List</h1>
          <p>Please Upload a CSV file in the following format:</p>
          {/* <table>
            <th>Owner Name</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip code</th>

            <tr>
              <td>John Smith</td>
              <td>123 Pleasant Way</td>
              <td>Provo</td>
              <td>UT</td>
              <td>84601</td>
            </tr>
          </table>
 */}

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




      </div>
    )
  }

}