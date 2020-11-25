const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('../config/config')
const router = require('./routes/tasks')
const app = express()


app.use(morgan('combined'))
app.use(bodyParser.json)
app.use(cors)
app.use(router)


mongoose.Promise = global.Promise
mongoose.connect(config.dbURL, config.dbOptions)

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))

app.listen(process.env.PORT || config.port,
    () => console.log(`Server is running on port ${config.port} ...`))
  
