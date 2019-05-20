import React from 'react'
import '../Css/purchase.css'


function PurchasePage() {
  return (
    <div className="purchasePage">

      <div className="purchaseHeader">
        <h1> It's simple: upload an address, get a text when you're close.</h1>

        <p>Upload a CSV of addresses, activate the tracker, and then get a text when you're within a mile of a property.

        </p>

      <p>
        Visting for sale by owners and expired listings has likely been part of your lead generation plan for some time. You've probably even paid a service like Landvoice or RedX to send you lists of these properties. 
      
      </p>
    <p>Getting face time with these leads is key to successfully converting them. DropIn is designed to track your location while you are out doing showings and/or appointments, and will notify you when you're within a mile of a for sale by owner or expired listing. </p>

    <p>Dropin is not meant to replace your CRM- it is set up to help you filter through leads and determine whether or not they need to be added to your CRM for follow up. </p>



      </div>









      <div className="cardHolderPurchase">

<h1>DropIn Tier List</h1>
        <div className="cardRow">


          <div className="card">


            <h1>Free!</h1>
            <ul>
              <li>20 trackable addresses</li>
              <li>20 uploads</li>
              <li>1 alert every hour</li>
            </ul>
          </div>


          <div className="card">


            <h1>$9.99 Month</h1>
            <ul>
              <li>20 trackable addresses</li>
              <li>unlimited uploads</li>
              <li>billed Monthly</li>
            </ul>
          </div>
        </div>


        <div className="cardRow">
          <div className="card">
            <h1>$14.99 Month</h1>
            <ul>
              <li>40 trackable addresses</li>
              <li>unlimited uploads</li>
              <li>billed Monthly</li>
            </ul>
          </div>

          <div className="card">
            <h1>$24.99 Month</h1>
            <ul>
              <li>100 trackable addresses</li>
              <li>Adjustable Tracking Radius</li>

              <li>unlimited uploads</li>
              <li>billed Monthly</li>
            </ul>

          </div>
        </div>


      </div>



    </div>

  )


}





export default PurchasePage