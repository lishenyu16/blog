<template>
    <div>
        <div class="background">

        </div>
        <h1>Life Style</h1>
    </div>
   
</template>
<script>
export default {
    
}
</script>
<style scoped>

div{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
    margin-top:8rem;
    min-height: calc(100vh - 11rem);
}
.background{
    background:url('./shared/bgimage.jpg') center/cover ;
    position:fixed;
    top: -11rem;
    left:0;
    width:100%;
    height:100%;
    z-index: -1;

}
</style>
