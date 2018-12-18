const Blog = require('../models/Blog')
const mongoDb = require('mongodb')
const config = require('../config/config')


module.exports = {
    //get all blogs
    getAllBlogs(req,res){
        Blog.fetchAllBlogs()
        .then((blogs)=>{
            res.send(blogs)
        })
        .catch(err=>{
            res.status(500).send({err:'An error has occured to get blogs!'})
        })
    },
    getBlog(req,res){
      Blog.findById(req.params.blogId)
      .then((blog)=>{
        res.send(blog)
      })
      .catch()
    },
    //post blog
    addBlog(req,res){
      const title = req.body.title
      const brief = req.body.brief
      const contents = req.body.contents
      const date = req.body.date
      const comments = req.body.comments
      const imgURL = req.body.imgURL

      const blog = new Blog(title,brief,contents,date,comments,imgURL)
      blog.save().then((result)=>{
        res.send({message:"blog is added but iam too lazy to return this blog object"})
      })
      .catch(err=>{
        console.log("err to add blog: ", err)
        res.send({err:'Unable to add this blog!'})
      })
    },
    editBlog(req,res){
      const title = req.body.title
      const brief = req.body.brief
      const contents = req.body.contents
      const date = req.body.date
      const comments = req.body.comments
      const imgURL = req.body.imgURL
      const _id = req.body._id

      const blog = new Blog(title,brief,contents,date,comments,imgURL,new mongoDb.ObjectId(_id))
      blog.save()
        .then((result)=>{
          res.send(result)
        })
        .catch(err=>{
          console.log("err to edit blog: ", err)
        })

    },
    deleteBlog(req,res){
      Blog.deleteById(req.body._id)
        .then(()=>{
          console.log("Deleted")
          res.send({message:"Deleted"})
        })
        .catch(err=>{
          console.log(err)
        })
    }

 
}