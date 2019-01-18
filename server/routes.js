const authController = require('./controllers/authController')
const authCtrPolicy = require('./policies/authCtrPolicy')
const blogController = require('./controllers/blogController')
const visitController = require('./controllers/visitorController')
const projectController = require('./controllers/projectController')
const isAuth = require('./middleWare/isAuth')
const isAdmin = require('./middleWare/isAdmin')

const {body} = require('express-validator/check')

module.exports = (app)=>{
    //Authentication
    app.post('/register',authCtrPolicy.register, authController.register) 
    app.post('/login',authController.login)
    app.get('/profile',isAuth,authController.getProfile)


    //fetch single or multiple blogs
    app.get('/blogs/:blogId',blogController.getBlog)
    app.get('/blogs',blogController.getAllBlogs) 

    //ADD, EDIT a blog
    app.post('/blogs', isAuth, isAdmin,
    [
        body('title')
        .trim()
        .isLength({min:5})
    ], blogController.addBlog) 

    app.put('/blogs/edit-blog',isAuth, isAdmin,
    [
        body('title')
        .trim()
        .isLength({min:5})
    ], blogController.editBlog)

    //DELETE a blog
    app.delete('/blogs/:blogId', isAuth, isAdmin, blogController.deleteBlog) 
    
    //add a blog comment
    app.post('/blogs/add-blog-comment',isAuth, blogController.addBlogComment)

    app.post('/visitor', visitController.addVisit)


    app.get('/projects/:projectId',projectController.getSingleProject)
    app.get('/projects',projectController.getProjects) 
    app.post('/projects/add-project', projectController.addProject)
    app.delete('/projects/:projectId', isAuth, isAdmin, projectController.deleteProject) 


}