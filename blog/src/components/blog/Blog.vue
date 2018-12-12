<template>
  <main role="main">
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="card-columns">
            <blog-brief v-for="(blog,index) in blogs" :blog="blog" :key=index></blog-brief>
            <!-- <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <h3><router-link to='/addblog'>Add Blog.</router-link></h3>               
                </div>
            </div> -->
            <div class="card">
              <div class="card-body">
                <h3><router-link to='/addblog'>Add Blog.</router-link></h3>  
              </div>
            </div> 
          </div>
        </div>
      </div>
  </main>
</template>

<script>
  import BlogBrief from './BlogBrief.vue'
  export default {
    created(){
      this.$store.dispatch('initBlogs')
    },
    components:{
      blogBrief:BlogBrief
    },
    computed: {
      blogs() {
        return this.$store.getters.blogs
      }
    },
  }
</script>


<style scoped>
main{
  margin-top:12rem;
  min-height: calc(100vh - 17rem);
}
.card-text{
  font-size:1.5rem;
}
:root {
  --jumbotron-padding-y: 3rem;
}

.jumbotron {
  padding-top: var(--jumbotron-padding-y);
  padding-bottom: var(--jumbotron-padding-y);
  margin-bottom: 0;
  background-color: #fff;
}
@media (min-width: 768px) {
  .jumbotron {
    padding-top: calc(var(--jumbotron-padding-y) * 2);
    padding-bottom: calc(var(--jumbotron-padding-y) * 2);
  }
}

.jumbotron p:last-child {
  margin-bottom: 0;
}

.jumbotron-heading {
  font-weight: 300;
}

.jumbotron .container {
  max-width: 40rem;
}


</style>
