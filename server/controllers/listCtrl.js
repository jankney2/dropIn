const axios= require('axios')


module.exports = {




  addList: (req, res) => {
    //maybe make what we pull off the request a bit more robust- later
    let { properties, listName } = req.body
    let { session } = req
    let dbInstance = req.app.get('db')


    //connect the userid to the database insert
    //add the property list
    
    


    dbInstance.create_list([session.user.user_id, listName]).catch(err=>console.log(err, "first one failed"))
    //make call to geolocation api to get individual address geolocation 
    properties.forEach((el) => {
      
      dbInstance.add_property([el["Property Street"],
       el['Property City'],
        el['Property State'],
         el['Property Zip'].toString(),
          el.Price.toString(),
           el['Bathrooms Full'].toString(), el.Bedrooms.toString(),
            el.Seller, listName])
            .catch(err=>console.log(err)) 
          })
          
          res.sendStatus(200)
    




  },

getLists: (req, res)=> {
  let dbInstance= req.app.get('db')
  let {id}= req.params

  dbInstance.get_list_by_user_id([id]).then(response=>{
    res.status(200).send(response)
  }).catch(err=>res.send(err))

},

getProperties: (req, res)=> {
  let dbInstance= req.app.get('db')
  let {listId}= req.params

  dbInstance.get_properties_by_list_id(listId).then(response=> {

    res.status(200).send(response)
  }).catch(err=>{
    console.log('issue with backend property get', err)
    res.sendStatus(500)
  })


}, 

  deleteList: (req, res) => {
    let dbInstance = req.app.get('db')
    let {listId} = req.params
    console.log(listId)
    dbInstance.delete_list_by_list_id([listId]).then(response=>{
      console.log("delete res", response)
      res.status(200).send(response)
    }).catch(err=>res.status(500).send(err))


  }
}