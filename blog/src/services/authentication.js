// alias: {
//     '@': path.join(__dirname, '..', dir)
//     }

import api from './api'

export default {
    register(credentials){
        //make a POST requst to the express server which handles '/post'
        return api().post('register',credentials)
    },
    login(credentials){
        return api().post('login',credentials)
    },
    getProfile(){
        return api().get('profile',{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
    }
}
