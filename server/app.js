const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

app.post('/register',(req,res,next)=>{
    res.send({
        message:`Hello ${req.body.email} ! Your user is registered ,have fun!`
    })
})

app.listen(process.env.PORT || 8081)