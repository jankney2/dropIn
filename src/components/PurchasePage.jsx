import React, { Component } from 'react'

import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';



class PurchasePage extends Component {


  render() {
    return (
      <div>

        <div>
          <h1>it's Simple. Upload Addresses, Get Texts When You're Close</h1>

          <p>Drop in is a simple tool- it's designed to take in sales data and ping you when you get close to an address. have you ever wanted to drop in on a client or potential listing, but never can remember where they live? Upload their address, then dropin will send you a text when you're close! </p>
        </div>


        <div>Stripe</div>



        <div>

          <h1>Pricing Plans</h1>

          <div>
            <div className="card">
              <h1>$9.99 Month</h1>
              <ul>
                <li>20 trackable addresses</li>
                <li>unlimited uploads</li>
                <li>billed Monthly</li>
              </ul>

              <div className="card">
                <h1>$14.99 Month</h1>
                <ul>
                  <li>40 trackable addresses</li>
                  <li>unlimited uploads</li>
                  <li>billed Monthly</li>
                </ul>

                <div className="card">
                  <h1>$24.99 Month</h1>
                  <ul>
                    <li>100 trackable addresses</li>
                    <li>Adjustable Tracking Radius</li>
                    <li>"Turf Dominance"</li>
                    <li>unlimited uploads</li>
                    <li>billed Monthly</li>
                  </ul>



                </div>

                <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                  <div className="example">
                    <h1>React Stripe Elements Example</h1>
                    <Elements>
                      <CheckoutForm />
                    </Elements>
                  </div>
                </StripeProvider>


              </div>
            </div>
          </div>
        </div>
      </div>
    )


  }

}



export default PurchasePage