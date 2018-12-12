<template>
  <div class="container">
      <div class="intro">
          <h1 class="display-4 font-italic">Title of a longer featured blog post</h1>
          <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
      </div>
      <div class="clock">
        <clock :time="time" border="none" bg="radial-gradient(circle, #ecffe5, #fffbe1, #38ff91)"></clock>
      </div>
      <!-- <div class="col-md-10 col-md-offset-1">
            <h1 class="display-4 font-italic">Title of a longer featured blog post</h1>
            <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
      </div> -->
      <!-- <div class="col-md-4 col-md-offset-4">
        <clock :time="time"></clock>
        https://vuejsexamples.com/a-simple-vue-clock-component/
        <clock :time="time" border="none" bg="radial-gradient(circle, #ecffe5, #fffbe1, #38ff91)"></clock>
      </div> -->
  </div>
</template>
<script>
   import Clock from 'vue-clock2';
    export default {
      components: { Clock },
      data () {
        return {
            time: this.time
        }
      },
      computed: {
        time() {
          let d = new Date();
          let h = d.getHours();
          let m = d.getMinutes();
          let s = d.getSeconds();
          return h + ":" + m + ":"+s
        }
      },
    }
</script>


<style scoped>
.container{
  margin-top:12rem;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: calc(100vh - 17rem);
}
.intro{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: cenger;
}
.clock{

}
</style>

