<template>
<div class="blog-detail">
    <div class="container">
        <h1 style = "text-shadow:4px 4px 8px blue;">{{title}}</h1>
        <p  class="date"><small>Last modified on {{date}}</small></p>
        <div v-html="context" style = "text-indent:1cm;text-align:left" ></div>
    </div>
    <div class="container">
        <!-- <div class="operations">
            <b-button-group size="lg"> 
                <b-button @click="edit">Edit</b-button>
                <b-button @click="remove">Delete</b-button>
            </b-button-group>
        </div> -->
        <div>
            <radial-menu
                style="margin: 0 auto; background-color: white"
                :itemSize="50"
                :radius="120"
                :angle-restriction="180">
                <radial-menu-item 
                v-for="(item, index) in items" 
                :key="index" 
                style="background-color: white" 
                @click="() => handleClick(item)">
                <span>{{item}}</span>
                </radial-menu-item>
            </radial-menu>
            <div style="color: rgba(0,0,0,0.6); margin-top: 16px;">{{ lastClicked }}</div>
        </div>
    </div>
    <div class="container">
        <div class="col-sm-12 text-center">
            <div class="well">
                <h4>What is on your mind?</h4>
                <div class="input-group">
                    <input type="text" class="form-control chat-input" v-model="input" placeholder="Write your message here..." />
                    <span class="input-group-btn">     
                        <button class="btn btn-primary btn-md" @click="addComment">Add Comment</button>
                    </span>
                </div>
                <hr>
                <ul  id="sortable" class="list-unstyled ui-sortable" v-for="comment in comments">
                    <strong class="pull-left primary-font">{{comment.username}}</strong>
                    <small class="pull-right text-muted">
                    <span class="glyphicon glyphicon-time"></span>{{comment.date}}</small>
                    </br>
                    <li class="ui-state-default">{{comment.content}}</li>
                    </br>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    //https://vuejsexamples.com/simple-radial-menu-for-vue2-apps/
    import { RadialMenu,  RadialMenuItem } from 'vue-radial-menu'
    export default {
        components: {
            RadialMenu,
            RadialMenuItem
        },
        data() {
            return {
                input:'',

                id: this.$store.getters.currentBlog.id,
                title: this.$store.getters.currentBlog.title,
                context: this.$store.getters.currentBlog.context,
                date: this.$store.getters.currentBlog.date,
                comments: this.$store.getters.currentBlog.comments,
                imgURL: this.$store.getters.currentBlog.imgURL,

                //imported module items
                items: ['Edit','Like', 'Delete'],
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
        },
        methods: {
            addComment() {
                // let userComment = document.getElementById("userComment").value;
                const comment = {username:'Mike',blogId:this.id, content:this.input, date:this.today}
                const blog = this.$route.query.blog
                // blog["comments"]=[]
                blog["comments"].push(comment)
                this.$store.dispatch('editBlog',blog)
                .then(()=>{
                    this.input=''
                    alert('New comment has been posted!')
                    this.comments = this.$store.getters.currentBlog.comments
                })
            },
            edit(){
                this.$router.push('/editblog')
            },
            save(){

            },
            remove(){
                if (confirm('Delete this record?')) {
                    this.$store.dispatch('deleteBlog',this.$store.getters.currentBlog)
                    .then(()=>{
                        alert('This blog has been removed!')
                        this.$router.replace('/blog')
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
                else{
                    return
                }
            }
        },
    }
</script>
<style scoped> 
.blog-detail{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
    margin-top:12rem;
    min-height: calc(100vh - 17rem);
}
.container {
    font-size:1.5rem !important;
    padding: 5px;
    margin:2rem auto;
    height:max-content;
}
.date{
    text-align: right;
}
.operations{
    
}
li.ui-state-default{
    background:#fff0;
    border:none;
    border-bottom:1px solid #ddd;
    text-align: left;
    padding-bottom: 10px;
}

li.ui-state-default:last-child{
    border-bottom:none;
}

@import url(http://fonts.googleapis.com/css?family=Roboto:400);
body {
  background-color:#fff;
  -webkit-font-smoothing: antialiased;
  font: normal 14px Roboto,arial,sans-serif;
}

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
.well{
    height:max-content;
    border-color:#d2d2d2;
    box-shadow:0 1px 0 #cfcfcf;
    border-radius:3px;
}

hr {
 border-color:#ececec;
}

button {
 outline: 0;
}

.btn span{
 color:#666666;
}

.list-group-item:first-child,.list-group-item:last-child {
 border-radius:0;
}

h3 { 
 border:0 solid #efefef; 
 border-bottom-width:1px;
 padding-bottom:10px;
}
.input-group{
    width:80%;
}
.form-control {
    border-color:#d7d7d7;
}
.form-control.chat-input {
    width:70%;
    font-size:1.5rem !important;
    padding:1rem;
}
</style>

