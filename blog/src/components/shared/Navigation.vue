<template>
    <!-- Navigation -->
    <div class="container">
        <router-link to="/home" class="nav-list-item">Home</router-link>
        <router-link to="/blog"  class="nav-list-item">Blog</router-link>
        <router-link to="/life"  class="nav-list-item">Life</router-link>
        <router-link to="/cooking"  class="nav-list-item">Cooking</router-link>
      <!-- <b-nav justified tabs fill class="font-italic">
        <b-nav-item to="/home">Home</b-nav-item>
        <b-nav-item to="/blog">Blog</b-nav-item>
        <b-nav-item to="/life">Life</b-nav-item>
        <b-nav-item to="/cooking">Cooking</b-nav-item>
      </b-nav> -->
    </div>

      
</template>
<script>

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Courgette');
  .container{
    position: fixed;
    top:6rem;
    left:0;
    z-index: 1;
    width:60%;
    margin-left:20%;
    height:5rem;
    background:rgba(204, 248, 214, 0.842);
    display:flex;
    justify-content: space-around;
    align-items: center;

  }
  .nav-list-item {
    font-size:1.5rem;
    font-family: 'Courgette', cursive;
  }
  .nav-list-item:hover, .nav-list-item:focus, .nav-list-item:active {
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    text-decoration: none;
  }
 @media (min-width: 40rem) {
  .nav-list-item {
    font-size:2rem;
  }
} 
</style>

