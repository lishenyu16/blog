<template>
    <div class="container">
        <div class="title">                
            <input type="text" name="title" 
            v-model="title" class="title-input"
            placeholder="Please enter title here" >
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
            <button class="btn-submit" @click = "addBlog">Save</button>
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
                title: '',
                contents:'',
                brief:'',
                // date:date,
                comments:[],
                imgURL:null,
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
            addBlog() {
                const newBlog = {title:this.title,contents:this.contents,date:this.today,brief:this.brief,comments:this.comments,imgURL:this.imgURL}
                blogAPI.addBlog(newBlog)
                .then((res)=>{
                    console.log("res status: ", res.status)
                    this.$store.dispatch('addBlog',newBlog)
                    .then(()=>{
                        this.$router.replace('/blog')
                    })
                })
                .catch(err=>{
                    // console.log("err message: ", err.message)
                    // if(err.message.includes('401')){
                    if(err.response.status==401){
                        alert('Your authentication expired, plz login')
                        console.log('Not authenticated operation, plz login')
                        this.$router.replace('/login')
                    }else if(err.response.status==403){
                        alert('You have no authorization')
                    }
                    else{ //500
                        alert('Internal error occured, please try again')
                    }
                })
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
/* .ql-toolbar{
    width:100%;
}
.ql-container{
    width:100%;
    border:none;
}

.ql-black{
    width:100%;
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
    margin-top:1rem;
    cursor: pointer;
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
