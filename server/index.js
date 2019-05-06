require('dotenv').config()

const express= require('express')
const app= express()
const session= require('express-session')
const massive= require('massive')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING}= process.env
const userCtrl= require('./controllers/userCtrl')
const listCtrl= require('./controllers/listCtrl')

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



app.get(`/api/getUser/:id`, userCtrl.getUser)
app.post(`/api/addList`, listCtrl.addList)
// app.delete(`/api/deleteList`, listCtrl.deleteList)



app.listen(SERVER_PORT, ()=> console.log('listening on ', SERVER_PORT))