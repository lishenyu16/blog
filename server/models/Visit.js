const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitSchema = new Schema({
  ip:{type:String,required:false},
  city:{type:String,required:false},
  region:{type:String,required:false},
  country:{type:String,required:false},
  time:{type:String,required:false}
})
//mongoose provides a built-in save method so that we dont need to define it ourself
module.exports = mongoose.model('Visit', visitSchema)

