const nodemailer= require('nodemailer')
const {GOOGLE}=process.env

module.exports = {
  getUser: (req, res) => {
    let dbinstance = req.app.get('db')
    let { id } = req.params
    dbinstance.get_user(id).then(response => {
      res.status(200).send(response)
      // console.log(response)
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
  }, 

  addReferral: async (req, res)=> {

    let dbinstance=req.app.get('db')
    let {userId}= req.params
    let {telephoneInput, firstNameInput, lastNameInput, emailInput}= req.body 
console.log('hit addreferral')

try {
  
  console.log('hit try')
  await dbinstance.add_referral_lead([firstNameInput, lastNameInput, +telephoneInput, emailInput, userId])
  
  
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dropinappinfo@gmail.com',
      pass: GOOGLE
    }
  });
  
  var mailOptions = {
    from: 'dropinappinfo',
    to: 'dropinappinfo@gmail.com',
    subject: 'New Referral Lead! Call ASAP!',
    text: `New lead! Contact them ASAP
    
    Name: ${firstNameInput} ${lastNameInput}
    Phone: ${telephoneInput}
    Email: ${emailInput}
    Referring Agent Id: ${userId}
    `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  res.sendStatus(200)

} catch (error) {
  res.send(error)
}
    




  }
}