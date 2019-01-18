// alias: {
//     '@': path.join(__dirname, '..', dir)
//     }

import api from './api'

export default {
    getBlogs(){
        return api().get('blogs')
    },
    addBlog(blog){
        return api().post('blogs',blog,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
    },
    getBlog(blogId){
        return api().get(`blogs/${blogId}`)
    },
    editBlog(updatedBlog){
        return api().put('blogs/edit-blog',updatedBlog,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
    },
    deleteBlog(blogId){
        return api().delete(`blogs/${blogId}`,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
    },
    addBlogComment(comment){
        return api().post('blogs/add-blog-comment',comment,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
    }
}
