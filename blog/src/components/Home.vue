<template>
  <div class="container">
      <div class="clock">
        <clock :time="clock" border="none" bg="radial-gradient(circle, #ecffe5, #fffbe1, #38ff91)"></clock>
      </div>
      <div class="intro">
        <div v-if="isLoggedIn">Good {{time_status}} <i>{{user.username}}</i> & welcome to my blog !</div>
        <div v-if="!isLoggedIn">Good {{time_status}} & welcome to my blog !</div><br>
        <div>If you checked out the “About Me” page then you know my name is Shenyu.  Looking at the front page, you probably saw that 
this is a computer science blog(or maybe some other articles about my life? lol).</div><br>
        <div>Glad you came by.  I wanted to welcome you and let you know I appreciate you spending time here at the blog very much.  
Everyone is so busy and life moves pretty fast,  so I really do appreciate you taking time out of your busy day to check out
my blog. Thanks.</div><br>
        <div> Another thing I will always appreciate is your feedback to the blog.  If you have any comments or suggestions I welcome them
and would love to hear them.  Always.  Not that all criticism is a fun thing but I think honest criticism given in an honest
positive manner is something we can all learn and grow from if we are open to hearing it.  I will always listen to your ideas.
So I do welcome your suggestions for the blog...</div><br>
        <div>Always.</div><br>
        <div>I will always do my best to bring you content that will interest, inspire, motivate and maybe even have you walking away
thinking about and seeing things in a different way than before you came.  I want to blog about more than just computer science
and…  Life is so much more than that and I want to touch on everything because I think our lives are more than just sitting in front of screens.</div>
        <div>This blog will always be changing because I am.  You are.  The world is.  So don’t get too comfortable.  I like to surprise
from time to time, I just might throw you a curve ball every now and then.  😉</div><br>
        <div>Thanks for letting me,</div><br>
        <div>Shenyu 🙂</div>
      </div>
  </div>
</template>
<script>
   import Clock from 'vue-clock2';
    export default {
      components: { Clock },
      data () {
        return {
            clock: this.time,
            user:this.$store.getters.currentUser,
            // isLoggedIn: this.$store.getters.isLoggedIn
        }
      },
      computed: {
        isLoggedIn(){
          return this.$store.getters.isLoggedIn
        },
        time() {
          let d = new Date();
          let h = d.getHours();
          let m = d.getMinutes();
          let s = d.getSeconds();
          return h + ":" + m + ":"+s
        },
        time_status(){
          // Good Morning
          // 5:00 AM — 12:00 PM

          // Good Afternoon
          // 12:00 PM — 5:00 PM

          // Good Evening
          // 5:00 PM — 5:00 AM
          let d = new Date();
          let h = d.getHours();
          if(h>=5 && h<12){
            return "morning"
          }
          else if(h>=12 && h<17){
            return "afternoon"
          }
          else{
            return "evening"
          }
        }
      },
    }
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Courgette');
.container{
  margin-top:8rem;
  min-height: calc(100vh - 11rem);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
@media  screen and (min-width: 600px) {
  .container{
    margin-top:9rem;
  }
}
.intro{
  width:80%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem 1.5rem;
}

.intro div{
  text-indent:1cm;
  text-align:left;
  font-size:1rem;
  font-family: 'Courgette', cursive;
}
</style>

