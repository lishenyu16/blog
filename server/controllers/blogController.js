const Blog = require('../models/Blog')
const BlogComment = require('../models/BlogComment')
const { validationResult } = require('express-validator/check')

module.exports = {

    //throw error : in a then(means async) block, it will exit then block and  pass error info to outer catch block. Then in the catch block,
    // error will be passed to error handle middleware located in app.js
    //next(err) : err will be handled by middleware in app.js

    //get all blogs
    getAllBlogs(req,res,next){
        Blog.find()
        .populate('comments')//expand details from _id reference
        .then((blogs)=>{
            res.status(201).json(blogs)
        })
        .catch(err=>{
          if(!err.statusCode){
            err.statusCode = 500
          }
          next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
        })
    },
    getBlog(req,res,next){
      Blog.findById(req.params.blogId)
      // .select('title brief -_id -date')  //select the fields you wanna to fetch from db
      .populate('comments')
      .then((blog)=>{
        if(!blog){
          const error = new Error('Could not find blog')
          error. statusCode = 404
          throw error  //this will exit this block and reach to out-most catch block and pass this error to it.
        }
        res.status(201).json(blog)
        // res.send(blog)
      })
      .catch(err=>{
        if(!err.statusCode){
          err.statusCode = 500
        }
        next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
      })
    },
    //post blog
    addBlog(req,res,next){
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        //since it's sync func here, throw can be used 
        const error = new Error("Entered data is incorrect!")
        error.statusCode = 422
        throw error
      }

      const title = req.body.title
      const brief = req.body.brief
      const contents = req.body.contents
      const date = req.body.date
      const comments = req.body.comments
      const imgURL = req.body.imgURL

      const blog = new Blog({
        title:title,
        brief:brief,
        contents:contents,
        date:date,
        comments:comments,
        imgURL:imgURL
      })
      blog.save()
        .then((result)=>{
          res.status(201).json({
            message:"blog is added",
            blog:result
          })
        })
        .catch(err=>{
          if(!err.statusCode){
            err.statusCode = 500
          }
          next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
        })
    },
    editBlog(req,res,next){
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        //since it's sync func here, throw can be used 
        const error = new Error("Entered data is incorrect!")
        error.statusCode = 422
        throw error
      }

      const updated_title = req.body.title
      const updated_brief = req.body.brief
      const updated_contents = req.body.contents
      const updated_date = req.body.date
      // const updated_comments = req.body.comments
      const updated_imgURL = req.body.imgURL
      const _id = req.body._id

      Blog.findById(_id)
        .then((blog)=>{
          if(!blog){
            const error = new Error('Could not find blog to edit')
            error.statusCode = 404
            throw error  //this will exit this block and reach to out-most catch block and pass this error to it.
          }
          blog.title = updated_title
          blog.brief = updated_brief
          blog.contents = updated_contents
          blog.date = updated_date
          // blog.comments  = updated_comments
          blog.imgURL = updated_imgURL
          return blog.save()
        })
        .then((result)=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          if(!err.statusCode){
            err.statusCode = 500
          }
          next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
        })
    },
    deleteBlog(req,res,next){
      Blog.findById(req.params.blogId)
        .then((blog)=>{
          if(!blog){
            const error = new Error('Could not find blog to delete')
            error.statusCode = 404
            throw error  //this will exit this block and reach to out-most catch block and pass this error to it.
          }
          return Blog.findByIdAndRemove(req.params.blogId)
        })
        .then(result=>{
          console.log(result)
          res.status(200).json({
            message:'Blog is deleted!'
          })
        })
        .catch(err=>{
          if(!err.statusCode){
            err.statusCode = 500
          }
          next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
        })
    },
    addBlogComment(req,res,next){
      const blogComment = new BlogComment({
        userId:req.body.userId,
        username:req.body.username,
        blogId:req.body.blogId,
        comment:req.body.comment,
        date:req.body.date
      })
      Blog.findById(req.body.blogId)
        .then((blog)=>{
          if(!blog){
            const error = new Error('Blog not found, unable to add comment')
            res.statusCode = 404
            throw error  //though this is in a then block(meaning in an async code snipped), here it will pass this error
                         //to out-most catch block to handle the error
          }
          blog.comments.push(blogComment)
          blog.save()
            .then(()=>{
              blogComment.save()
              .then(()=>{
                res.status(200).send(blog)
              })
            })
            .catch(err=>{
              console.log(err)
            })
        })
        .catch(err=>{
          if(!err.statusCode){
            err.statusCode = 500
          }
          next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
        })
    }
}