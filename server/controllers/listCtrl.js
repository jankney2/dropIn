module.exports = {
  addList: (req, res) => {
    //maybe make what we pull off the request a bit more robust- later
    let { properties, listName } = req.body
    let { session } = req
    let dbInstance = req.app.get('db')


    //connect the userid to the database insert
    //add the property list
    
    dbInstance.create_list([session.user.user_id, listName]).catch(err=>console.log(err, "first one failed"))
    
    properties.forEach((el) => {
      console.log('foreach hit')
      
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
    

    // console.log(el['Square Feet'], listName, el['Property City'], el['Property State'], el["Property Street"], el["Property Zip"], el['Bathrooms Full'], el.price, el.Seller, el['Year Built'], el.Bedrooms)



    //do i need a "returning" in my sql file? 

    //when i know the shape of the data that will be passed in, i'll put the sql command in here to create each individual property in the properties table- the properties key on the body should be an array of objects that represent each individual portion of the property 

  },
  deleteList: (req, res) => {
    let dbInstance = req.app.get('db')


    dbInstance.deleteList()
  }
}