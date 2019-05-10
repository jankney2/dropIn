const axios = require('axios')
require('dotenv').config()
const { REACT_APP_GOOGLE_MAPS_KEY } = process.env
const texter= require('../Twilio/send')
let iteration=0
let textSent=false
module.exports = {

  calcDist: async (req, res) => {
++iteration


console.log("IC:",iteration, "text status", textSent)
if(iteration===30){
  textSent=false
  iteration=0
}


    let { userId } = req.params
    let { userLat, userLong } = req.body
    //get address from database
    let dbInstance = req.app.get('db')

    let dbResponse = await dbInstance.get_properties_by_user_id(userId)

console.log(dbResponse)
    //for each item in the dbResponse array, run the distance matrix. if distanceVal is less than 1600, send text
if(!textSent) {

//stack filter and foreach to determine 
    dbResponse.forEach(async (el) => {

      //compare it to static address

      try {
        let distMatrixRes = await axios.post(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLat},${userLong}&destinations=${el.latitude},${el.longitude}&key=${REACT_APP_GOOGLE_MAPS_KEY}`)


        let distanceText = distMatrixRes.data.rows[0].elements[0].distance.text

        let distanceVal = distMatrixRes.data.rows[0].elements[0].distance.value

        //1600 meters in a mile
        if (distanceVal < 1600) {

          console.log(`
                          ============
              
              you are ${distanceText} away from ${el.street} ${el.city}
              
                          ============
              
              `)

              texter.textAlert(distanceText, el.street, el.city)

        }
        else {
          console.log("no properties in range")
          res.sendStatus(200)
        }
      }

      catch {
        throw new Error(403)
      }


    })

   textSent=true 
  }

    res.sendStatus(200)




  },



}