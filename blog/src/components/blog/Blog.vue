<template>
  <main role="main">
    <div class="card-columns">
      <blog-brief v-for="(blog,index) in blogs" :blog="blog" :key="blog._id" class="card"></blog-brief>
      <div class="card" v-if="isLoggedInAdmin">
        <div class="add-blog">
          <h3><router-link to='/addblog'><a>Add Blog</a></router-link></h3>  
        </div>
      </div> 
    </div>
  </main>
</template>

<script>
  import BlogBrief from './BlogBrief.vue'
  import blogAPI from '../../services/blogAPI'
  export default {
    mounted(){
      blogAPI.getBlogs().then((res)=>{
        this.$store.dispatch('setBlogs',res.data)
      })
      // this.$store.dispatch('initBlogs',)
    },
    components:{
      blogBrief:BlogBrief
    },
    computed: {
      blogs() {
        return this.$store.getters.blogs
      },
      isLoggedInAdmin(){
        if(this.$store.getters.isLoggedIn && this.$store.getters.currentUser.isAdmin){
          return true
        }
        return false
      }  
    },
  }
</script>


<style scoped>

main{
  margin-top:8rem;
  margin-bottom:1rem;
  min-height: calc(100vh - 12rem);
}
@media  screen and (min-width: 640px) {
  main{
    margin-top:9rem;
  }
}

.card-columns{
  width:100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap:wrap;
  color: #2c3e50;
}
.card{
    width:70%;
    position: relative;
    display: flex;
    flex-direction: column;
    margin:1rem auto;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .8rem;
}
@media  screen and (min-width: 640px) {
  .card{
      width:30%;
  }
} 

.add-blog{
  height:5rem;
  margin:auto;
}
.add-blog h3{
  margin-top:2rem;
}
a{
  text-decoration: none;
}


</style>
