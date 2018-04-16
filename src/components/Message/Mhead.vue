<template>
        <div id="head">
                <!-- <span class="cloud" id="cloud"></span> -->
                <ul class="messhead">
                        <!-- <li>
                            <router-link to="/message/deploy">
                                推荐
                           </router-link>
                        </li>
                        <li>
                            <router-link to="/message/question">
                                咨询
                           </router-link>
                        </li> -->
                        <li>
                            <router-link to="/message/action">
                                活动
                           </router-link>
                        </li>
                        <li>
                            <router-link to="/message/rank">
                                排行
                           </router-link>
                        </li>
                        <li>
                            <router-link to="/message/schoolzp">
                                招聘
                           </router-link>
                        </li>
                    </ul>
        </div>
</template>
<script>
export default {
        name:'head',
        data(){
             return {
             }
        },
        components:{},
}
</script>
<style scoped>
    #head{
        height: 2.8rem;
        line-height: 2.8rem;
        text-align: center;
        color: #fff;
        z-index: 100;
        background-color: #4171ae;
        position: fixed;
        top: 0;
        width: 100vw;
    }
    #head a:link,#head a:visited{
        color: #fff;
    }
    #head a:hover,#head a:active{
        color: #fff;
    }
    #head>ul{
        height: 2.8rem;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
    }
    li{
        height: 2.8rem;
        line-height: 2.8rem;
        text-align: center;
        float: left;
        width: 33.33vw;
    }
    li:active{
        background-color: #ccc;
    }
</style>