const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

app.get('/status',(req,res,next)=>{
    res.send({
        message:'Hello world!'
    })
})

app.listen(process.env.PORT || 8081)