<template>
    <div class="container">
        <div class="row title">                
            <input type="text" name="title" 
            v-model="title" class="title-input"
            placeholder="Please enter title here" >
        </div>
        <div class="quill">
            <quill-editor
                v-model="context"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                >
            </quill-editor>
        </div>

        <div class="submit">                
            <button class="btn btn-primary btn-lg" @click = "addBlog">Submit</button>
        </div>           
    </div>
</template>

<script>
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
                context:'',
                brief:'',
                comments:[{}],
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
                const newBlog = {title:this.title,context:this.context,date:this.today,brief:this.brief,comments:this.comments}
                this.$store.dispatch('addBlog',newBlog)
                .then(()=>{
                    this.$router.replace('/blog')
                })
            },

        },
    }
</script>
<style scoped>
.container{
    margin-top:12rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height:calc(100vh - 12rem - 5rem);
}
.quill{
    height:35rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid lightslategray;
}
.quill-editor{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width:100%;
    height:100%;
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
    width:88.5%;
    margin:2rem 0 2rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.title-input{
    width:100%;
    font-size:2rem;
}
.submit{
    margin-top:1rem;
}
</style>
