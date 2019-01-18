<template>
<div class="blog-detail">
    <div class="container">
        <h1 style = "text-shadow:4px 4px 8px blue;">{{title}}</h1>
        <p  class="date"><small>Last modified on {{date}}</small></p>
        <div v-html="contents" style = "text-align:left;" ></div>
    </div>
    <div class="container">
        <div>
            <radial-menu
                style="margin: 0 auto; background-color: white"
                :itemSize="50"
                :radius="120"
                :angle-restriction="180">
                <radial-menu-item 
                v-for="(item, index) in isLoggedInAdmin?adminItems:items" 
                :key="index" 
                style="background-color: orange" 
                @click="() => handleClick(item)">
                <span>{{item}}</span>
                </radial-menu-item>
            </radial-menu>
            <div style="color: rgba(0,0,0,0.6); margin-top: 16px;">{{ lastClicked }}</div>
        </div>
    </div>
    <transition name="modal-fade">
        <div class="modal-backdrop" v-if="isModalVisible" @click="closeModal"> 
            <div class="modal" @click.stop> 
                <div class="modal-header"> 
                    <div class="modal-header-title">
                        Write your comment here...
                    </div>
                    <div>
                        <button type="button" class="btn-close" @click="closeModal">X</button>
                    </div>
                </div>
                <div class="modal-body"> 
                    <div class="input-area">
                        <textarea v-model="input" class="comment-input" cols="60" rows="3" placeholder="Write your message here..."></textarea>
                    </div>
                </div> 
                <div class="modal-footer"> 
                    <button type="button" class="btn-green" @click="closeModal">Cancel</button> 
                    <button type="button" class="btn-green" @click="addComment">Submit</button> 
                </div> 
            </div> 
        </div>
    </transition>
    <div class="comment-area">
        <div class="comments-list-header">
            <div class="comment-area-title">
                What is on your mind?
            </div>
            <div class="comment-area-button">
                <button type="button" class="btn-pencil" @click="showModal">&#9998;</button> 
            </div>
        </div>
        <hr>
        <div class="comments-list">
            <ul class="comments-list-ul" v-for="comment in comments">
                <div class="user-date">
                    <div class="user-date-user">{{comment.username}}</div>
                    <div class="user-date-date">{{comment.date}}</div>
                </div>
                <li class="comments-list-item">
                    {{comment.comment}}
                </li>
                <hr>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
    import blogAPI from "../../services/blogAPI"
    //https://vuejsexamples.com/simple-radial-menu-for-vue2-apps/
    import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
    export default {
        components: {
            RadialMenu,
            RadialMenuItem
        },
        created(){
            blogAPI.getBlog(this.$route.params._id)
                .then((blog)=>{
                    this.id = blog.data._id,
                    this.title = blog.data.title,
                    this.contents = blog.data.contents,
                    this.date = blog.data.date,
                    this.comments = blog.data.comments,
                    this.imgURL = blog.data.imgURL
                })
                .catch(err=>{
                    if(err.response.status==404){
                        alert('Could not find this blog!')
                        this.$router.push('/blog')
                    }
                    else{//500
                        alert('Internal error occured, please try again')
                    }
                })
        },
        data() {
            return {
                isModalVisible: false,
                input:'',

                //below datas will be initialized from db
                id: null,
                title: null,
                contents: null,
                date: null,
                comments: null,
                imgURL: null,
                //no brief cause u dont need to modify brief lol...

                //imported module items
                items: ['Like', 'Share'],
                adminItems: ['Edit','Like','Share','Delete'],
                lastClicked: 'Operations'
            }
        },
        computed: {
            today() {
                // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
                let today1 = new Date();
                let dd = today1.getDate();
                let mm = today1.getMonth()+1; //January is 0!
                let yyyy = today1.getFullYear();
                if(dd<10) {
                    dd = '0'+dd
                } 
                if(mm<10) {
                    mm = '0'+mm
                } 
                const dateOfToday = mm + '/' + dd + '/' + yyyy;
                return dateOfToday
            },
            isLoggedInAdmin(){
                if(this.$store.getters.isLoggedIn && this.$store.getters.currentUser.isAdmin){
                return true
                }
                return false
            }
        },
        methods: {
            showModal(){
                this.isModalVisible = true
            },
            closeModal(){
                this.isModalVisible = false
            },
            addComment() {
                if(!this.$store.getters.currentUser){
                    if(confirm('You are not logged in or authentication expired, log in now?')){
                         return this.$router.replace('/login')
                    }
                    return 
                }
                const comment = {
                    userId: this.$store.getters.currentUser.userId || null,
                    username:this.$store.getters.currentUser.username || null,
                    blogId:this.id,
                    comment:this.input,
                    date:this.today
                }
                blogAPI.addBlogComment(comment)
                    .then((res)=>{
                        this.$store.commit('CURRENT_BLOG',res.data)
                        this.isModalVisible = false;
                        alert('New comment has been posted!')
                        this.input=''
                        this.comments = res.data.comments
                    })
                    .catch(err=>{
                        if(err.response.status==401){
                            if(confirm('Your authentication expired, log in now?')){
                                this.$router.replace('/login')
                            }
                            // else{

                            // }
                            // alert('Your authentication expired, please log in')
                            // this.$router.replace('/login')
                        }
                        if(err.response.status==404){
                            alert('Blog Not Found!')
                            this.$router.replace('/blog')
                        }
                        else{
                            alert('An internal error occured, please try again')
                        }
                    })
            },
            edit(){
                //should I pass a _id or just use currentBlog from vuex?
                this.$router.push('/editblog')
            },
            remove(){
                if (confirm('Delete this blog?')) {
                    blogAPI.deleteBlog(this.id)
                        .then(()=>{
                            alert('This blog has been removed successfully!')
                            this.$router.replace('/blog')
                        })
                        .catch(err=>{
                            if(err.response.status==401){
                                alert('Your authentication expired, please log in')
                                this.$router.replace('/login')
                            }
                            else if(err.response.status==403){
                                alert('Unauthorized operation')
                                this.$router.replace('/home')
                            }
                            else if(err.response.status==404){
                                alert('Blog Not Found!')
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
            handleClick (item) {
                // this.lastClicked = item;
                if(item=='Edit'){
                    this.edit()
                }
                else if(item=='Delete'){
                    //delete 
                    this.remove()
                }
                else if(item=='Comment'){
                    //poppup modal to add comment
                }
                else{
                    return
                }
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
	border-top: 1px solid #eee; 
	justify-content: flex-end; 
} 
.modal-body { 
	position: relative; 
	padding: 20px 10px; 
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
.btn-pencil { 
    font-size: 1rem; 
    border: 1px solid #4aae9b; 
	color: #4aae9b; 
	background-color: transparent; 
    border-radius: 5px; 
    cursor: pointer; 
}
    /* 著作权归作者所有。
商业转载请联系作者获得授权,非商业转载请注明出处。
原文: https://www.w3cplus.com/vue/vue-modal-component.html © w3cplus.com */
.blog-detail{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
    margin:8rem auto 1rem;
    min-height: calc(100vh - 12rem);
    width:80%;
}
@media  screen and (min-width: 640px) {
  .blog-detail{
    margin-top:9rem;
  }
}
.container {
    width:100%;
    font-size:1rem;
    padding: 5px;
    margin:auto;
    height:max-content;
}
.date{
    text-align: right;
}


@import url(http://fonts.googleapis.com/css?family=Roboto:400);

.btn,.form-control,.well {
    border-radius:1px;
    box-shadow:0 0 0;
}

.btn-primary {
    border-color:transparent;
}

.btn-primary, .list-group-item.active:focus {
    background-color:#4285f4;
} 

.btn-plus {
    background-color:#ffffff;
    border-width:1px;
    border-color:#dddddd;
    box-shadow:1px 1px 0 #999999;
    border-radius:3px;color:#666666;
    text-shadow:0 0 1px #bbbbbb;
}

.panel {
    border-color:#d2d2d2;
    box-shadow:0 1px 0 #cfcfcf;
    border-radius:3px;
}

.comment-area{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;  
    border:#d2d2d2 1px solid;
    box-shadow:0 1px 0 #cfcfcf;
    border-radius:5px;  
    width:100%;
    padding:1rem;
}
.comment-area-title{
    width:90%;
    text-align: center;
}
.comment-area-button{
    width:10%;
    text-align: center;
}

.input-area{
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;  
    font-size:1.5rem;    
}
.comment-input{
    font-size:1rem;
    width:100%;
    margin-right:0;
    box-sizing: inherit;
    padding:5px;
    border:1px solid rgb(165, 165, 165);
}

hr {
 width:100%;
}

button {
    outline: 0;
}
.add-button{
    font-size:1.5rem;
    padding:5px;
    margin-left:0;
    box-sizing: inherit;
    border:1px solid rgb(165, 165, 165);
}
.comments-list-header{
    width:100%;
    padding: 10px; 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    font-size:1rem;  
	color: #4aae9b; 
}
.comments-list{
    width:100%;
    font-size:1rem;
    padding:0.3rem 1rem;
}
.comments-list-ul{
    padding:0.8rem 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.user-date{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user-date-user{
    width:70%;
    text-align: left;
    font-weight: bold;
}
.user-date-date{
    width:20%;
    font-size:0.7rem;
}
.comments-list-item{
    list-style: none;
    text-align: left;
}
</style>

