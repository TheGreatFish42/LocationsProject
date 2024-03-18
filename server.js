const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb+srv://jacobifisher:ftn807Jul11!@cluster0.wwuui84.mongodb.net/Nomad',
  () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter.jsx'))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) // req.user
app.use('/api/post', require('./routes/postRouter.jsx'))
app.use('/api/comments', require('./routes/commentRouter.jsx'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log(`Server is running on local port 9000`)
})