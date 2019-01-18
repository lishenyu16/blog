import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'
import Blog from '../components/blog/Blog.vue'
import BlogDetail from '../components/blog/BlogDetail.vue'
import AddBlog from '../components/blog/AddBlog.vue'
import EditBlog from '../components/blog/EditBlog.vue'
import Life from '../components/Life.vue'
import Cooking from '../components/Cooking.vue'
import Projects from '../components/projects/Projects.vue'
import Profile from '../components/shared/Profile.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/home', component: Home },
        { path: '/blog', component: Blog },
        { path: '/blogdetail/:_id', name:'blogdetail', component: BlogDetail },
        { path: '/addblog', component: AddBlog },
        { path: '/editblog', component: EditBlog },
        { path: '/life', component: Life },
        { path: '/cooking', component: Cooking },
        { path: '/projects', component: Projects },
        { path: '/login', component: Login },
        { path: '/signup', component: Signup },
        { path: '/profile', component: Profile },
        { path: '*', component: Home },
    ]
})
