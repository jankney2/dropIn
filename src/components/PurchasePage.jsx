import React from 'react'
import '../Css/purchase.css'


function PurchasePage() {
  return (
    <div className="purchasePage">

      <div className="purchaseHeader">
        <h1> It's simple: upload an address, get a text when you're close</h1>

        <p>Drop in is a simple tool- Upload a CSV of addresses, activate the tracker, and then get a text when you're within a mile of a property.

        </p>
      </div>









      <div className="cardHolderPurchase">


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