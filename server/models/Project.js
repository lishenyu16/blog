const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  title:{type:String,required:false},
  youtubeId:{type:String,required:false},
  desc:{type:String,required:false},
  srcUrl:{type:String,required:false}
})
//mongoose provides a built-in save method so that we dont need to define it ourself
module.exports = mongoose.model('Project', projectSchema)