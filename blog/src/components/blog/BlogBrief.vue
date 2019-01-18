<template>
    <div @click="goToDetail(blog)" class="card-brief">
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

            this.$router.push({name:'blogdetail', params: { _id: blog._id }})
          }
        },
    }

</script>


<style scoped>
#blog-brief{
  font-size:1rem;
}
.card-brief:hover {
    background-color: #faebd7 !important;
}
.card-brief{
    height:15rem;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .8rem;
    overflow: auto;
}

@media  screen and (min-width: 640px) {
  .card-brief{
    height:12rem;
    overflow: auto;
  }
} 

.card-header:first-child {
    border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
}

.card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
    text-align: left;
    text-indent: 0.5cm;
}

p {
    margin: 0 0 1rem;
}

.card-text:last-child {
    margin-bottom: 0;
    text-align: center;
    text-indent: 0;
}
</style>
