require('dotenv').config()

const express = require('express')
const mongoDB = require('mongoose')
const routes = require('./routes/index')

//Express App
const app = express()

//Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/overview', routes)

//Connect to MongoDB
mongoDB.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })