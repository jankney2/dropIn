module.exports= {
  getUser: (req, res)=> {
    let dbinstance= req.app.get('db')
    let {id}= req.params
    dbinstance.get_user(id).then(response=>{
      res.status(200).send(response)
      console.log(response)
    })
  }
}