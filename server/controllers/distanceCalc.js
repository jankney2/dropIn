const axios = require('axios')
require('dotenv').config()
const { REACT_APP_GOOGLE_MAPS_KEY } = process.env


module.exports= {

  calcDist: async (req, res)=> {

let {userId}= req.params

    //get address from database
let dbInstance= req.app.get('db')

let dbResponse= await dbInstance.get_properties_by_user_id(userId)



let dbLatitude= dbResponse[0].latitude
let dbLongitude= dbResponse[0].longitude

let dbLatitude2= dbResponse[4].latitude
let dbLongitude2= dbResponse[4].longitude




    //compare it to static address
let distMatrixRes= await axios.post(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${dbLatitude},${dbLongitude}&destinations=${dbLatitude2},${dbLongitude2}&key=${REACT_APP_GOOGLE_MAPS_KEY}`)

   // return if distance is less than 5 miles

let distance= distMatrixRes.data.rows[0].elements[0].distance.text  
 console.log(distMatrixRes.data.rows[0].elements[0])

 res.status(200).send(distance)



  }



}