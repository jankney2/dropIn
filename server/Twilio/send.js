require('dotenv').config()

const {TWILIO_SID, TWILIO_AUTH_TOKEN}= process.env

const client=require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN)


module.exports= {

textAlert: (distance, street, city)=>{

  client.messages.create({
    body:`you are ${distance} away from ${street} ${city}`,
    from:"+13852175119", 
    to:'+17572025877' 
  }).then(message=>console.log("the message worked you're a genius"))


}



}




//logic

//something listens for the user's location and compares it to the location of the closest data point on the map. when the distance becomes less than a predetermined amount, a function will fire that executes the code to send the text. 

//the body of the text will contain a message that says "you are .1 miles away from {address}. drop in and get the listing!" maybe a link for more details of the property(later). The phone number is pulled from the user database by looking up each individual user- this will probably require a massive connection to look up the user, return their data, and then paste in the phone number. 

