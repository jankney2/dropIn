const axios = require("axios");
require("dotenv").config();
const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;

module.exports = {
  addList: async (req, res) => {
    //maybe make what we pull off the request a bit more robust- later
    let { properties, listName } = req.body;
    let { session } = req;
    let dbInstance = req.app.get("db");

    dbInstance
      .create_list([session.user.user_id, listName])
      .catch(err => console.log(err, "first one failed"));

    let dbUser = await dbInstance.get_user([session.user.user_id]);

    properties.forEach(async el => {
      //geocode the address

      // console.log('for each running')
      //geocoding

      let geoCodeRes = await axios.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          el["Property Street"]
        }+${el["Property City"].replace(",", "")}+${el["Property State"]}+${el[
          "Property Zip"
        ].toString()}&key=${REACT_APP_GOOGLE_MAPS_KEY}`
      );

      let latitude = geoCodeRes.data.results[0].geometry.location.lat.toString();

      let longitude = geoCodeRes.data.results[0].geometry.location.lng.toString();

      //property adder

      dbInstance
        .add_property([
          el["Property Street"],
          el["Property City"],
          el["Property State"],
          el["Property Zip"].toString(),
          el.Price.toString(),
          el["Bathrooms Full"].toString(),
          el.Bedrooms.toString(),
          el.Seller,
          listName,
          latitude,
          longitude,
          "t",
          "f"
        ])
        .catch(err => {
          res.send(err, "database error");
          console.log(err);
        });
    });

    setTimeout(async () => {
      let trackedProps = await dbInstance.get_total_tracked([
        session.user.user_id
      ]);

      console.log("trackedProps", trackedProps);

      if (trackedProps[0].count > dbUser[0].allowable_tracking_num) {
        let userProps = await dbInstance.get_properties_by_user_id([
          session.user.user_id
        ]);

        for (let i = 20; i < userProps.length; i++) {
          dbInstance.bash_status(userProps[i].property_id);
        }
      }
    }, 5000);

    res.sendStatus(200);
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
      price, 

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

      res.sendStatus(200);
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
  }
};
