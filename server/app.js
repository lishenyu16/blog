const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// const {sequelize} = require('./models')
const app = express()
const config = require('./config/config')

const mongoConnnect = require('./util/database').mongoConnect
// const getDb = require('./util/database').getDb

app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

const router  = require('./routes')
router(app)

// sequelize.sync()
// .then(()=>{
//     app.listen(config.port)
//     console.log(`your app is running on ${config.port}`)
// })

mongoConnnect(()=>{
    app.listen(8081)
})
