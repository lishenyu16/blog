const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongodbURI = require('./key')
const mongoose  = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(morgan('combined'))

app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const router  = require('./routes')
router(app)

app.use((error, req, res, next) => {
    // console.log("error in app.js middleware:", error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

// app.use(history());  // in order to use this module, the static file needs to be used twice
mongoose.connect(mongodbURI)
    .then(app.listen(3000))
    .catch(err=>{
        console.log(err)
    })