<template>
    <div class="Therepair">
     <textarea class="mt-5" v-model="content" placeholder="输入你要报修的内容">

     </textarea>
     </br>
     <button @click="save" class="btn btn-dark mt-5">
     我要报修
     </button>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
       content:""
        }
    },
    methods:{
        save(){
            let data=new FormData();
            data.append('userID',window.sessionStorage.getItem("userid"))
            data.append('content',this.content)
       axios.post('/apis/api/user/therepair',data).then(res=>{
       if (res.data.code==1) {
           alert(res.data.msg)
           this.content="";
       }else{
           alert(res.data.msg)
       }
       })
        }
    }
}
</script>
<style scoped>
textarea{
    width: 70%;
    height: 200px;
}
button{
    width: 40%;
}
</style>

