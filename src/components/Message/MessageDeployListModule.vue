<template>
    <div id="deployl">
        <div class="mess">
            <img :src="this.ImgUrl+'/'+qdata.thumb_pic" alt="木有网络啊">
            <span class="title">{{qdata.title}}</span>
            <div class="summary">{{qdata.summary}}</div>
            <h5><span>阅读: {{qdata.view_times}}</span><span>{{qdata.created_at}}</span></h5>
        </div>
    </div>
</template>
<script>
import common from '../../kits/common.js';
export default {
     name:'deployl',
     props: ['qdata'],
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
    #deployl{
        padding: 0.6rem /* 22/16 */;
        width: 100%;
        height: 7.16rem /* 86/16 */;
        font-size: .75rem /* 12/16 */;
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;
    }
    #deployl img{
        width: 5.4375rem /* 103/16 */;
        height: 5.8rem /* 80/16 */;
        float: left;
        margin-right: 0.8rem;;
    }

    .title{
        font-size: 0.9rem;
        display: inline-block;
        height: 1.6rem;
        line-height: 1.6rem;
        font-weight: 500;
    }
    .summary{
        width: 62vw;
        display: inline-block;
        word-wrap: break-word;
        height: 3rem;
    }
    h5 span:nth-of-type(2){
        float: right;
    }
</style>