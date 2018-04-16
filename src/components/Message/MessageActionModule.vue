<template>
    <div id="mam">
        <div  class="module">
                <img :src="this.ImgUrl+'/'+actions.thumb_pic" alt="">
                <div class="title">
                    <h3>{{actions.title}}</h3>
                    <h5> <span>{{actions.view_times}}</span><span>阅读 </span></h5>
                </div>
        </div>
    </div>
</template>
<script>
import common from '../../kits/common.js';
export default {
     name:'mam',
     props:["actions"],
     data(){
         return {
             ImgUrl:common.apimain,
         }
     },
     components:{},
     mounted () {

     }
}
</script>
<style scoped>
    #mam{
        background-color: #fff;
    }
    #mam img{
        width: 94.6vw;
        height: 38.1vw;
        border-radius: 10px;
    }
    .module{
        padding: 0.6rem;
        border-bottom: 1px solid #f2f2f2;
    }
    #man>div>div{
        border-bottom: 1px solid #f2f2f2;
    }
    h3{
        height: 2rem;
        line-height: 2em;
        font-size: 1rem;
        color: #000;
        font-weight: 600;
    }
    h5{
        height: 1.3rem;
    }
    h5 span{
        float: right;
    }
    .title{
        padding: 0 0.4rem;
    }
</style>