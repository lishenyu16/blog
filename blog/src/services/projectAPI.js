// alias: {
//     '@': path.join(__dirname, '..', dir)
//     }

import api from './api'

export default {
    getProjects(){
        return api().get('projects')
    },
    getProject(projectId){
        return api().get(`projects/${projectId}`)
    },
    addProject(project){
        return api().post('projects/add-project',project,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    },
    deleteProject(projectId){
        return api().delete(`projects/${projectId}`,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    // editBlog(updatedBlog){
    //     return api().put('blogs/edit-blog',updatedBlog,{
    //         headers: {
    //           Authorization: 'Bearer ' + localStorage.getItem('token')
    //         }
    //       })
    // },

}
