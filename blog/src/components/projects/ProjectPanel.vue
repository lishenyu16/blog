<template>
    <div class="panel">
        <div class="title-bar">
            <div class='project-title'>{{project.title}}</div>
            <div class='project-info' @click="showModal">&#9432;</div>            
        </div>
        <transition name="modal-fade">
            <div class="modal-backdrop" v-if="isModalVisible" @click="closeModal"> 
                <div class="modal" @click.stop> 
                    <div class="modal-header"> 
                        <div class="modal-header-title">
                            {{project.title}}
                        </div>
                        <div>
                            <button type="button" class="btn-close" @click="closeModal">X</button>
                        </div>
                    </div>
                    <div class="modal-body"> 
                        {{project.desc}}
                    </div> 
                    <div class="modal-footer"> 
                        <a :href='project.srcUrl' target='_blank' v-if="!isSrcUrlNull">Source Code</a>
                        <!-- <router-link to="project.desc">Source Code</router-link> -->
                        <button type="button" class="btn-green" @click="closeModal">Close</button> 
                        <button v-if="isLoggedInAdmin" type="button" class="btn-red" @click="deleteProject">Delete</button> 
                    </div> 
                </div> 
            </div>
        </transition>
        <div class="youtube">
            <youtube :video-id="project.youtubeId" :fitParent='true' :resize='true' 
            :resizeDelay='0' ref="youtube"></youtube>
        </div>
    </div>
</template>
<script>
import projectAPI from '../../services/projectAPI'
export default {   
    props:[
        'project'
    ],
    data() {
        return {
            isModalVisible: false,
            playerVars: {
                origin: window.location.origin // or http(S)://your.domain.com
            }
        }
    },
    methods: {
        playVideo() {
            this.player.playVideo()
        },
        showModal(){
            this.isModalVisible = true
        },
        closeModal(){
            this.isModalVisible = false
        },
        deleteProject(){
            if(confirm('Remove this project?')){
                projectAPI.deleteProject(this.project._id)
                    .then(result=>{
                        alert('This project has been removed successfully!')
                        this.closeModal()
                        const projects = this.$store.getters.projects
                        const newProjects = projects.filter(element=>element._id != this.project._id)
                        this.$store.commit('SET_PROJECTS',newProjects)
                        // this.$router.replace('/projects')
                    })
                    .catch(err=>{
                        console.log('err:',err)
                        if(err.response.status==401){
                            alert('Your authentication expired, please log in')
                            this.$router.replace('/login')
                        }
                        else if(err.response.status==403){
                            alert('Unauthorized operation')
                            this.$router.replace('/home')
                        }
                        else if(err.response.status==404){
                            alert('Project Not Found!')
                            this.$router.replace('/blog')
                        }
                        else{
                            alert('An internal error occured, please try again')
                        }
                    })
            }
            else{
                return
            }
        },
        goToSource(){
            return this.project.srcCode
        }
    },
    computed: {
        isSrcUrlNull(){
            return this.project.srcUrl == 'null'
        },
        isLoggedInAdmin(){
            if(this.$store.getters.isLoggedIn && this.$store.getters.currentUser.isAdmin){
            return true
            }
            return false
        },
        player() {
            return this.$refs.youtube.player
        }
    },
}
</script>


<style scoped>
.modal-fade-enter, 
.modal-fade-leave-active { 
    opacity: 0; 
} 
.modal-fade-enter-active, 
.modal-fade-leave-active {
    transition: opacity .5s ease 
}
.modal-backdrop{
    position: fixed; 
    display: flex; 
    justify-content: center; 
    align-items: center;
    z-index:11; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal { 
    width:60%;
    background-color: #fff; 
    box-shadow: 2px 2px 20px 1px; 
    overflow-x:auto; 
    display: flex; 
    flex-direction: column; 
    font-size:1rem;
}

.modal-header{
    padding: 10px; 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    font-size:1rem;  
    border-bottom: 1px solid #eee; 
	color: #4aae9b; 
	justify-content: space-between; 
}
.modal-footer { 
    padding: 15px; 
    display: flex; 
    justify-content: space-between;
    align-items: center;
	border-top: 1px solid #eee; 

} 
.modal-body { 
	position: relative; 
	padding: 20px 10px; 
    overflow:scroll;
    max-height: 5rem;
} 
.btn-close { 
	border: none 0; 
	font-size: 1rem; 
	cursor: pointer; 
	font-weight: bold; 
	color: #4aae9b; 
	background-color: transparent; 
} 
.btn-green { 
    font-size: 1rem; 
	color: #fff; 
	background-color: #4aae9b; 
	border: 1px solid #4aae9b; 
    border-radius: 5px; 
    cursor: pointer; 
}
.btn-red { 
    font-size: 1rem; 
	color: #fff; 
	background-color: #d43232; 
	border: 1px solid #0bf7cb; 
    border-radius: 5px; 
    cursor: pointer; 
}
/* https://github.com/anteriovieira/vue-youtube */
/* iframe {
  width: 100%;
  max-width: 650px;
} */
.panel{
    width:65%;
    padding:0;
    margin:1rem auto;
}
@media  screen and (min-width: 640px) {
  .panel{
    width:40%;
    padding:0;
    margin:1rem auto;
    }
} 
.title-bar{
    width:100%;
    height:2.5rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background-color:cyan;
    text-align:left;
    font-size:1rem;
    padding:0.2rem;
}
.project-title{
    width:70%;
    height:100%;
    overflow: auto;
}
.project-info{
    width:28%;
    text-align:center;
    font-weight: bolder;
    cursor: pointer;
}
.project-info:hover{
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    color:rgb(252, 0, 218);
}
.youtube{
    width:100%;
    
}
</style>

