import React, {Component} from 'react'
import axios from 'axios'


class ListUpload extends Component {
  constructor() {
    super()
    this.state= {
      newListName: '', 
      newListData: []
    }
  }


  render() {
    return(
      <div>

        <div className="csvContainer">
        
        <h1>Create New Property List</h1>
        <p>Please Upload a CSV file in the following format:</p>
        <table>
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

        <input type="text" placeholder="List Name" onChange={(e)=> {
          this.setState({
            newListName: e.target.value
          })
        }}/>

        <button>Click to Upload CSV</button>
        
        
        </div>




      </div>
    )
  }

}