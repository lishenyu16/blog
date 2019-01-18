const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogCommentSchema  = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  username:String,
  blogId:{
    type:Schema.Types.ObjectId,
    ref:'Blog'
  },
  comment:String,
  date:String
},{timestamps:true})
module.exports = mongoose.model('BlogComment', blogCommentSchema)
