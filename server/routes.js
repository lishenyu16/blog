const authController = require('./controllers/authController')
const authCtrPolicy = require('./policies/authCtrPolicy')
const blogController = require('./controllers/blogController')
module.exports = (app)=>{
    //Authentication
    app.post('/register',authCtrPolicy.register, authController.register) 
    app.post('/login',authController.login)

    //fetch single or multiple blogs
    app.get('/blogs/:blogId',blogController.getBlog)
    app.get('/blogs',blogController.getAllBlogs) 

    //ADD, EDIT a blog
    app.post('/blogs',blogController.addBlog) 
    app.post('/blogs/edit-blog',blogController.editBlog)

    //DELETE a blog
    app.post('/blogs/delete-blog',blogController.deleteBlog)   
}