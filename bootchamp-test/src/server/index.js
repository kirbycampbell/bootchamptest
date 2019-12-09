const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//Middleware
app.use(bodyParser.json())
app.use(cors())

const contributors = require('./routes/api/contributors')
app.use('/api/contributors/', contributors)

const topics = require('./routes/api/topics')
app.use('/api/topics/', topics)

const cities = require('./routes/api/cities')
app.use('/api/cities/', cities)

const resources = require('./routes/api/resources')
app.use('/api/resources/', resources)

const tags = require('./routes/api/tags')
app.use('/api/tags/', tags)

const meetups = require('./routes/api/meetups')
app.use('/api/meetups/', meetups)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'))

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port} `))
