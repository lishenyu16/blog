<template>
    <div class="projects">
        <div style="width:100%;">
            <button class="btn-green" v-if="isLoggedInAdmin" @click="showModal">Add Project</button>
        </div>  
        <div class="brief">
            Below are the demo videos of my perojects I have worked on. <br>
            They are hosted on github pages, to get the source code, simply click on<b> &#9432; </b> in the title bar of each panel. <br>
            I could have also host them on AWS like this website, but I have to pay for EC2 fee, after some considerations,
            I decide to just put them on github pages as it's free and most of my projects will be static websites.
        </div>  
        <project-panel v-for="(project,index) in projects" :project="project" :key="project._id"/>
        <transition name="modal-fade">
            <div class="modal-backdrop" v-if="isModalVisible" @click="closeModal"> 
                <div class="modal" @click.stop> 
                    <div class="modal-body"> 
                        <input class="modal-body-input" type="text" v-model="title" placeholder="enter title here">
                        <input class="modal-body-input" type="text" v-model='youtubeId' placeholder="enter youtubeId here">  
                        <textarea  class="modal-body-input-textarea" v-model='desc' placeholder="enter description here"></textarea>
                        <input class="modal-body-input" type="text" v-model='srcUrl' placeholder="enter source URL here">                     
                    </div> 
                    <div class="modal-footer"> 
                        <button type="button" class="btn-green" @click="closeModal">Close</button> 
                        <button type="button" :class="{'btn-grey':addDisabled,'btn-green':!addDisabled}" @click="addProject" :disabled="addDisabled">Submit</button> 
                    </div> 
                </div> 
            </div>
        </transition>
    </div>
   
</template>
<script>
import ProjectPanel from './ProjectPanel.vue'
import projectAPI from '../../services/projectAPI'
export default {
    components:{
        'project-panel':ProjectPanel
    },
    data() {
        return {
            isModalVisible: false,
            title: '',
            youtubeId:'',
            desc:'',
            srcUrl:''
        }
    },
    created(){
      projectAPI.getProjects()
        .then((res)=>{
            this.$store.dispatch('setProjects',res.data)
        })
        .catch(err=>{
            alert('Internal error occured, please try again')
        })
    },
    methods: {
        showModal(){
            this.isModalVisible = true
        },
        closeModal(){
            this.isModalVisible = false
        },
        addProject(){
            const project = {title:this.title, youtubeId:this.youtubeId, desc: this.desc, srcUrl:this.srcUrl}
            projectAPI.addProject(project)
                .then(result=>{
                    this.$store.dispatch('addProject',result.data.project)
                    .then(()=>{
                        this.closeModal()
                        this.$router.replace('/projects')
                    })
                })
                .catch(err=>{
                    if(err.response.data.status==401){
                        alert('Your authentication expired, plz login')
                        console.log('Not authenticated operation, plz login')
                        this.$router.replace('/login')
                    }else if(err.response.data.status==403){
                        alert('You have no authorization')
                    }
                    else{ //500
                        alert('Internal error occured, please try again')
                    }
                })
        }
    },
    computed: {
        projects() {
            return this.$store.getters.projects
        },
        isLoggedInAdmin(){
            if(this.$store.getters.isLoggedIn && this.$store.getters.currentUser.isAdmin){
            return true
            }
            return false
        },
        addDisabled(){
            return this.title.trim()=='' || this.youtubeId.trim()==''
        }
    },    
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Courgette');
.projects{
    width:100%;
    margin-top:8rem;
    min-height: calc(100vh - 11rem);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-family: 'Courgette', cursive;
}
.brief{
    text-align:left;
    width:100%;
    margin:0;
    padding:0.5rem 10rem;
}

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
    width:70%;
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
    padding: 1rem; 
    display: flex; 
    justify-content: space-between;
    align-items: center;
	border-top: 1px solid #eee; 

} 
.modal-body { 
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
	padding: 1rem 1rem; 
    overflow:scroll;
    width:100%;
    max-height: 15rem;
} 
.modal-body-input{
    width:90%;
    margin:0.2rem auto;
    font-size:1rem;
    border: 1px solid grey;
}
.modal-body-input-textarea{
    width:90%;
    border:1px solid grey;
    height:5rem;
    font-size:1rem;
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
.btn-grey { 
    font-size: 1rem; 
	color: rgb(238, 205, 15); 
	background-color: #bdc0c0; 
	border: 1px solid #152e29; 
    border-radius: 5px; 
    cursor: pointer; 
}
</style>
