require('dotenv').config()



const express= require('express')
const app= express()
const session= require('express-session')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING, STRIPE_SAMPLE }= process.env
const stripe= require('stripe')(STRIPE_SAMPLE)
const massive= require('massive')
const userCtrl= require('./controllers/userCtrl')
const listCtrl= require('./controllers/listCtrl')
const authCtrl=require('./controllers/authCtrl')
const distanceCalc= require('./controllers/distanceCalc')


app.use( express.static( `${__dirname}/../build` ) )


massive(CONNECTION_STRING).then((database)=> {
  app.set('db', database)
  console.log('database connected')
})



app.use(express.json())
app.use(session({
  secret: SESSION_SECRET, 
  saveUninitialized:false, 

  resave: false, 
  cookie: {
    maxAge:1000*60*60*24,
      }
}))

app.post(`/api/test/:userId`, distanceCalc.calcDist)


app.put('/properties/:id', listCtrl.changeTracking)
app.post(`/api/refer/:userId`, userCtrl.addReferral)

app.put('/properties/changeMobile/:propertyId', listCtrl.changeMobileTracking)

app.get('/api/userSession', (req, res)=>{

  // delete req.session.user.pass_hash

  res.status(200).send(req.session)
})
app.get('/api/userTotal/:userId', userCtrl.getTotal)
app.get(`/api/getUser/:id`, userCtrl.getUser)
app.get('/api/userLists/:id', listCtrl.getLists)
app.get('/api/properties/:listId', listCtrl.getProperties)
app.get('/auth/logout', authCtrl.logout)
app.get('/api/userProperties/:id', listCtrl.getProperties)


app.post(`/api/addList`, listCtrl.addList)


app.post("/charge", async (req, res) => {
  app.use(require('body-parser').text())
  try {
    // console.log(req.body)
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });
    console.log(status)
    res.json({status});
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
});



app.post(`/api/addListIndividual`, listCtrl.addIndividual)
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.put('/properties/addNote/:noteId', listCtrl.editNote)

//fix this one to send as response the new lsit 
app.delete('/api/userLists/:listId', listCtrl.deleteList)
app.delete('/properties/deleteProperty/:deleteId', listCtrl.deleteProperty)

app.listen(SERVER_PORT, ()=> console.log('listening on ', SERVER_PORT))