const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title:{type:String,required:true},
  brief:{type:String,required:true},
  contents:{type:String,required:true},
  date:{type:String,required:true},
  //alternative way to embed comments:
  comments:[
    { type: Schema.Types.ObjectId, ref: 'BlogComment' }
    // {
    //   type:Object,
    //   required:false
    // }
  ],
  // comments:[{
  //   type:Schema.Types.ObjectId,
  //   ref:'BlogComment'
  // }],
  imgURL:{type:String},
},{timestamps:true})

module.exports = mongoose.model('Blog', blogSchema)
