require('dotenv').config()


const express= require('express')
const app= express()
const session= require('express-session')
const connectRedis= require('connect-redis')

const massive= require('massive')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING}= process.env
const userCtrl= require('./controllers/userCtrl')
const listCtrl= require('./controllers/listCtrl')
const authCtrl=require('./controllers/authCtrl')
const distanceCalc= require('./controllers/distanceCalc')
const RedisStore=connectRedis(session)



massive(CONNECTION_STRING).then((database)=> {
  app.set('db', database)
  console.log('database connected')
})



app.use(express.json())
app.use(session({
  secret: SESSION_SECRET, 
  saveUninitialized:false, 
  // store: new RedisStore({}),
  resave: false, 
  cookie: {
    maxAge:1000*60*60*24,
      }
}))


app.post(`/api/test/:userId`, distanceCalc.calcDist)

app.put('/api/users/updateInfo/:userId', userCtrl.updateUserInfo)
app.get('/api/userTotal/:userId', userCtrl.getTotal)
app.get(`/api/getUser/:id`, userCtrl.getUser)
app.get('/api/userLists/:id', listCtrl.getLists)
app.get('/api/properties/:listId', listCtrl.getProperties)
app.get('/auth/logout', authCtrl.logout)



app.post(`/api/addList`, listCtrl.addList)
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)


//fix this one to send as response the new lsit 
app.delete('/api/userLists/:listId', listCtrl.deleteList)


app.listen(SERVER_PORT, ()=> console.log('listening on ', SERVER_PORT))