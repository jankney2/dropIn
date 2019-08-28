const axios = require("axios");
require("dotenv").config();
const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;
const texter = require("../Twilio/send");
let iteration = 0;
let textSent = false;
module.exports = {
  calcDist: async (req, res) => {
    //currently this function has a loophole- a user can manually put in more properties to track from the assignment page and they will be tracked. Somehow i'll have to limit that.

    //right now i just limit it to the first 20 responses from the db that are tracking/true

    ++iteration;

    if (iteration === 2) {
      textSent = false;
      iteration = 0;
    }

    let { userId } = req.params;
    let { userLat, userLong } = req.body;
    //get address from database
    let dbInstance = req.app.get("db");
    let dbUser = await dbInstance.get_user(userId);

    let dbResponse = await dbInstance.get_properties_by_user_id(userId);
    let newDb = [];

    for (let i = 0; i < dbResponse.length; i++) {
      if (
        dbResponse[i].is_tracked &&
        newDb.length < dbUser[0].allowable_tracking_num
      ) {
        newDb.push(dbResponse[i]);
      }
    }

    //for each item in the dbResponse array, run the distance matrix. if distanceVal is less than 1600, send text
    if (!textSent) {
      //stack filter and foreach to determine
      //only search 20 properties at a time-

      newDb.forEach(async el => {
        if (el.is_tracked) {
          try {
            // let distMatrixRes = await axios.post(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLat},${userLong}&destinations=${el.latitude},${el.longitude}&key=${REACT_APP_GOOGLE_MAPS_KEY}`)

            // let distanceText = distMatrixRes.data.rows[0].elements[0].distance.text

            // let distanceVal = distMatrixRes.data.rows[0].elements[0].distance.value

            let distanceVal = await dbInstance.distance_calculator_postgis([
              userLat,
              userLong,
              el.latitude,
              el.longitude
            ]);
            console.log(distanceVal[0].st_distancesphere, "DISTANCEVAL");
            // 1600 meters in a mile
            if (distanceVal[0].st_distancesphere < 10000) {
              let distanceText =
                (+distanceVal[0].st_distancesphere / 1000) * 0.62137;

              console.log(`
                          ============
              
              you are ${distanceText.toFixed(2)} miles away from ${el.street} ${
                el.city
              }
              
                          ============
              
              `);

              texter.textAlert(distanceText, el.street, el.city)
            } else {
              console.log("no properties in range");
              res.sendStatus(200);
            }
          } catch (err) {
            console.log(err);
          }
        }
      });

      textSent = true;
    }

    res.sendStatus(200);
  }
};
