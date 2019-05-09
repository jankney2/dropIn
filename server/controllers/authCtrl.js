const bcrypt = require('bcryptjs')


module.exports = {
  login: async (req, res) => {
    console.log('hit login')
    //check for user by phone number against database
    //do not destructure password! 
    let { phone: passPhone } = req.body
    let dbInstance = req.app.get('db')
    const { session } = req
    passPhone = +passPhone



    try {
      let phone = await dbInstance.find_user_by_phone([passPhone])
      // console.log(phone)
      session.user = phone[0]

      const authenticated = bcrypt.compareSync(req.body.pass, phone[0].pass_hash)



      if (authenticated) {
        // console.log('if hit')

        res.status(200).send(session)
        // console.log(session)
      } else {
        throw new Error(401)
      }

    } catch  {
      res.sendStatus(500)
      console.log(res)
    }


    //send error if password doesn't match


    //attach userID to session


  },

  register: async (req, res) => {
    let dbInstance = req.app.get('db')
    let { phone, firstName, email, lastName } = req.body
    const { session } = req
    phone = +phone
    let exists = await dbInstance.find_by_phone(phone)
    exists = +exists[0].count
    console.log(exists)
    //if user does not exist
    if (exists !== 0) {
      return res.sendStatus(409)
    }


    let salt = bcrypt.genSaltSync(10)
    let hashedPass = bcrypt.hashSync(req.body.pass, salt)


    const user = await dbInstance.create_user([firstName, lastName, email, phone, hashedPass])

    console.log(user)
    //log in user automatically

    session.user = {
      phone,
      hashedPass,
      id: exists.user_id
    }

    res.sendStatus(200)

  },

  logout: (req, res) => {
    req.session.destroy()

    res.sendStatus(200)
  }
}