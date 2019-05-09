module.exports = {
  getUser: (req, res) => {
    let dbinstance = req.app.get('db')
    let { id } = req.params
    dbinstance.get_user(id).then(response => {
      res.status(200).send(response)
      console.log(response)
    })
  },

  getTotal: (req, res) => {
    let dbInstance = req.app.get('db')
    let { userId } = req.params

    dbInstance.get_total(userId).then(response => {

      res.status(200).send(response[0])
    }).catch(err => {
      res.status(500).send(err)
      console.log(err)
    })
  },

  updateUserInfo: (req, res) => {
    let dbinstance = req.app.get('db')
    let { telephoneInput, firstNameInput, lastNameInput, emailInput } = req.body
    let { userId } = req.params



    dbinstance.update_user_info([firstNameInput, lastNameInput, emailInput, +telephoneInput, userId]).then(response => {
      res.status(200).send(response)
    }).catch(err => {console.log(err) 
    res.status(500).send(err)} )
  }
}