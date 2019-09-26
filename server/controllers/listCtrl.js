const axios = require("axios");
require("dotenv").config();
const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;

module.exports = {
  addList: async (req, res) => {
    //maybe make what we pull off the request a bit more robust- later
    let { properties } = req.body;
    let { session } = req;
    let dbInstance = req.app.get("db");

    properties.forEach(async el => {
      console.log(el, "for each");
      let geoCodeRes = await axios.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          el.street
        }+${el.city.replace(",", "")}+${
          el.state
        }+${el.zipcode.toString()}&key=${REACT_APP_GOOGLE_MAPS_KEY}`
      );

      let latitude = geoCodeRes.data.results[0].geometry.location.lat.toString();

      let longitude = geoCodeRes.data.results[0].geometry.location.lng.toString();

      try {
        await dbInstance.add_property([
          el.street,
          el.city,
          el.state,
          el.zipcode.toString(),
          el.price.toString(),
          el.bathrooms.toString(),
          el.bedrooms.toString(),
          el.seller,
          latitude,
          longitude,
          "f",
          el.phone,
          el.email, 
          +session.user.user_id
        ]);
      } catch (error) {
        console.log(error, 'faweoifjaweoij')
        res.status(500).send(error);
      }
    });
    res.status(200).send(session.user.user_id)
  },
  addListMobile: async (req, res) => {
    let { properties, userId } = req.body;
    let dbInstance = req.app.get("db");

    properties.forEach(async el => {
      console.log(el, "for each");
      let geoCodeRes = await axios.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          el.street
        }+${el.city.replace(",", "")}+${
          el.state
        }+${el.zipcode.toString()}&key=${REACT_APP_GOOGLE_MAPS_KEY}`
      );

      let latitude = geoCodeRes.data.results[0].geometry.location.lat.toString();

      let longitude = geoCodeRes.data.results[0].geometry.location.lng.toString();

      try {
        await dbInstance.add_property([
          el.street,
          el.city,
          el.state,
          el.zipcode.toString(),
          el.price.toString(),
          el.bathrooms.toString(),
          el.bedrooms.toString(),
          el.seller,
          latitude,
          longitude,
          "f",
          el.phone,
          el.email, 
          +userId
        ]);
      } catch (error) {
        console.log(error, 'faweoifjaweoij')
        res.status(500).send(error);
      }
    });
    res.status(200).send(userId)
  },

  getLists: (req, res) => {
    let dbInstance = req.app.get("db");
    let { id } = req.params;

    dbInstance
      .get_list_by_user_id([id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => res.send(err));
  },

  getProperties: (req, res) => {
    let dbInstance = req.app.get("db");
    let { id } = req.params;

    dbInstance
      .get_properties_by_user_id(id)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log("issue with backend property get", err);
        res.sendStatus(500);
      });
  },

  deleteList: (req, res) => {
    let dbInstance = req.app.get("db");
    let { listId } = req.params;
    console.log(listId);
    dbInstance
      .delete_list_by_list_id([listId])
      .then(response => {
        console.log("delete res", response);
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send(err));
  },

  addIndividual: async (req, res) => {
    let {
      seller,
      bathrooms,
      newListName,
      street,
      city,
      state,
      zip,
      bedrooms,
      price
    } = req.body;
    let { session } = req;
    let dbInstance = req.app.get("db");

    try {
      let newListres = await dbInstance.create_list([
        session.user.user_id,
        newListName
      ]);

      let geoCodeRes = await axios.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${city.replace(
          ",",
          ""
        )}+${state}+${zip.toString()}&key=${REACT_APP_GOOGLE_MAPS_KEY}`
      );

      let latitude = geoCodeRes.data.results[0].geometry.location.lat.toString();

      let longitude = geoCodeRes.data.results[0].geometry.location.lng.toString();

      let track = "t";

      let totalTracked = await dbInstance.get_total_tracked([
        session.user.user_id
      ]);

      let dbuser = await dbInstance.get_user([session.user.user_id]);

      if (totalTracked[0].count >= dbuser[0].allowable_tracking_num) {
        track = "f";
      }

      dbInstance.add_property([
        street,
        city,
        state,
        zip,
        price,
        bathrooms,
        bedrooms,
        seller,
        newListName,
        latitude,
        longitude,
        track
      ]);

      try {
        let userProperties = await dbInstance.get_properties_by_user_id(
          session.user.user_id
        );
        res.status(200).send(userProperties);
      } catch (error) {
        res.status(500).send(error);
      }
    } catch {
      throw new Error(405);
    }
  },

  deleteProperty: async (req, res) => {
    let dbInstance = req.app.get("db");
    let { deleteId } = req.params;
    let { user } = req.session;

    await dbInstance.delete_property_by_id(deleteId);

    try {
      let newProperties = await dbInstance.get_properties_by_user_id(
        user.user_id
      );

      res.status(200).send(newProperties);
    } catch {
      throw new Error(409);
      console.error();
    }
  },

  editNote: (req, res) => {
    let dbInstance = req.app.get("db");
    let { noteId: id } = req.params;
    let { user } = req.session;
    console.log(req.body, id);

    dbInstance
      .note_update([req.body.noteText, id])
      .then(() => {
        dbInstance
          .get_properties_by_user_id(user.user_id)
          .then(response => {
            res.status(200).send(response);
          })
          .catch(err => response.send(err));
      })
      .catch(err => res.send(err));
  },

  changeTracking: async (req, res) => {
    let { trackingStatus, userId } = req.body;
    let { id: propId } = req.params;
    let dbInstance = req.app.get("db");

    console.log("tracking USER ID", userId);

    try {
      await dbInstance.update_property_tracking_status([
        trackingStatus,
        propId
      ]);

      let response = await dbInstance.get_properties_by_user_id(userId);

      res.status(200).send(response);
    } catch (error) {
      res.send(error);
    }
  },
  changeMobileTracking: async (req, res) => {
    //wow this is ugly
    let { propertyId } = req.params;
    let { userId } = req.body;
    console.log("hithit");
    let db = req.app.get("db");

    try {
      let currentValue = await db.get_property_by_id(propertyId);
      currentValue = currentValue[0].is_tracked;
      console.log("current value", currentValue);
      try {
        await db.update_property_tracking_status([!currentValue, propertyId]);
      } catch (error) {
        res.status(500).send(error);
      }
    } catch (error) {
      res.status(500).send(error);
    }

    try {
      let newProps = await db.get_properties_by_user_id(+userId);
      res.status(200).send(newProps);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  toggleCrmStatus: async (req, res) => {
    let db = req.app.get("db");
    let { propId } = req.params;
    let { currentStatus, userId } = req.body;

    try {
      await db.toggle_crm_status([!currentStatus, propId]);

      try {
        let newProps = await db.get_properties_by_user_id(userId);

        res.status(200).send(newProps);
      } catch (err) {
        res.status(500).send(err);
      }
    } catch (error) {
      res.status(500).send(error, "error toggling property crm status");
    }
  },
  mobileDistCalc: async (req, res) => {
    let { userId } = req.params;
    let { latitude, longitude } = req.body;
    let db = req.app.get("db");

    try {
      let properties = await db.get_properties_by_user_id(userId);

      for (let i = 0; i < properties.length; i++) {
        let distanceVal = await db.distance_calculator_postgis([
          latitude,
          longitude,
          properties[i].latitude,
          properties[i].longitude
        ]);

        properties[i].distance = (
          (+distanceVal[0].st_distancesphere / 1000) *
          0.6213
        ).toFixed(2);
        console.log(properties[i].street, properties[i].distance, "distance");
      }
      res.status(200).send(properties);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
