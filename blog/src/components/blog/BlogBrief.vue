<template>
    <!-- <div class="col-md-4 hover-effect">
        <div class="card mb-4 shadow-sm" @click="goToDetail(blog)">
            <h3>{{blog.title}}</h3>               
            <div class="card-body">
                <p class="card-text" v-html="blog.brief"></p>......
            </div>
        </div>
    </div>   -->
    <!-- <div class="card hover-effect" @click="goToDetail(blog)">
      <div class="card-body">
        <h5 class="card-title">{{blog.title}}</h5>
        <p class="card-text" v-html="blog.brief"></p>
        <p class="card-text"><small class="text-muted">{{blog.title}}</small></p>
      </div>
    </div> -->
    <div class="card hover-effect border-info mb-3" @click="goToDetail(blog)">
      <div class="card-header"><h3>{{blog.title}}</h3></div>
      <div class="card-body">
        <p class="card-text" v-html="blog.brief" id="blog-brief"></p>
        <p class="card-text"><small class="text-muted">{{blog.date}}</small></p>
      </div>
    </div>
    
</template>
<script>
    export default {
        props:['blog'],
        methods: {
          goToDetail(blog) {
            this.$store.commit('CURRENT_BLOG',blog)
            this.$router.push({path: "/blogdetail", query:{blog: blog}})
          }
        },
    }

</script>


<style scoped>
#blog-brief{
  font-size:1.2rem;
}
.card:hover{
  background-color: antiquewhite !important;
}
.card{
  border-radius: 0.8rem;
}

/* .card-text{
  font-size:1.5rem;
}

.card:hover{
  background-color: antiquewhite !important;
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
} */


</style>
