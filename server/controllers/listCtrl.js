module.exports= {
  addList: (req, res)=> {
    let dbInstance= req.app.get('db')
    let {session, listName}= req.body 

    dbInstance.add_prop_list([session.id, listName]).then(response=> {
      res.status(200).send(response)
    }).catch(err=>{res.sendStatus(500)
      console.log(err)
    })

//when i know the shape of the data that will be passed in, i'll put the sql command in here to create each individual property in the properties table- the properties key on the body should be an array of objects that represent each individual portion of the property 

  }, 
  deleteList: (req, res)=> {
    let dbInstance= req.app.get('db')
    

    dbInstance.deleteList()
  }
}