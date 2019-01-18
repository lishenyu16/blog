<template>
    <div class="container">
        <div class="title">                
            <input type="text" name="title" 
            v-model="title" class="title-input">
        </div>
        <div class="quill">
            <quill-editor
                v-model="contents"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                >
            </quill-editor>
        </div>

        <div class="submit">                
            <button class="btn-submit" @click = "save">Save</button>
        </div>
    </div>
</template>

<script>
    import blogAPI from '../../services/blogAPI'
    import hljs from 'highlight.js'

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction
        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image'],
        ['clean']
    ]
    export default {
        data() {
            return {
                blog: this.$store.getters.currentBlog,
                title: this.$store.getters.currentBlog.title,
                contents:this.$store.getters.currentBlog.contents,
                brief:this.$store.getters.currentBlog.brief,
                // date field is auto-fetch from current date
                comments:this.$store.getters.currentBlog.comments,
                imgURL:this.$store.getters.currentBlog.imgURL,
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },
            }
        },
        methods: {
            onEditorChange({ quill, html, text }) {
                // console.log('editor change!', quill, html, text)
                if(text.length<100){
                    this.brief = text
                }
                else{
                    const arr = text.split('')
                    const arr2 = []
                    for(let i=0;i<100;i++){
                        arr2.push(arr[i])
                    }
                    this.brief = arr2.join('')
                }
            },
            save() {
                const newBlog = {
                    _id:this.blog._id,
                    title:this.title,
                    contents:this.contents,
                    date:this.today,
                    brief:this.brief,
                    comments:this.comments,
                    imgURL:this.imgURL
                }
                blogAPI.editBlog(newBlog)
                    .then((res)=>{                     
                        this.$store.commit('CURRENT_BLOG',newBlog)
                        this.$router.replace('/blogdetail/'+this.blog._id)
                    })
                    .catch(err=>{
                        if(err.response.status==401){
                            alert('Your authentication expired, please log in')
                            this.$router.replace('/login')
                        }
                        if(err.response.status==403){
                            alert('Unauthorized operation')
                            this.$router.replace('/home')
                        }
                        if(err.response.status==404){
                            alert('Blog Not Found!')
                            this.$router.replace('/blog')
                        }
                        else{
                            alert('An internal error occured, please try again')
                        }
                    })
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
    }
</script>

<style scoped>
.container{
    margin:8rem auto 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: calc(100vh - 12rem);
    overflow:auto;
}
.quill{
    height:20rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: auto;
    border: 1px solid lightslategray;
    margin:0.5rem;
}
.quill-editor{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width:100%;
    height:100%;
    overflow: auto;
}
/* .quill-editor{
    width:90%;
    height:30rem !important;
    margin-bottom: 1rem;
} */
.title{
    margin:0.5rem;
    border: 1px solid #d2d2d2;
}
.title-input{
    width:100%;
    padding:0.5rem;
    font-size:1rem;
}
.submit{
    position: relative;
    float: left;
    margin-left:0rem;
    margin-top:1rem;
    padding:0rem;
}
.btn-submit{
    font-size: 1rem;
    color: #fff;
    background-color: #4aae9b;
    border: 1px solid #4aae9b;
    border-radius: 5px;
    cursor: pointer;
}
</style>

