import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    this.state = {
      complete: false
    }
  }

  async submit(ev) {
    // User clicked submit

    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await axios.post("/charge",{
      source: token.id
    } );

    if (response.ok) {

      console.log("Purchase Complete!")

      this.setState({
        complete: true,
      })


    }





  }

  render() {

    if (this.state.complete) {
      return (
        <div className="checkout">
            <h1>Purchase Complete! </h1>
        </div>

      )
    }

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);