<template>
        <div id="question">
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
                                        咨讯
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
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
                <div v-for="q in quesData">
                    <router-link v-bind="{to:'/message/qpage/'+q.id}">
                        <message-deploy-listModule :qdata="q"></message-deploy-listModule>
                    </router-link>
                </div>
            </v-scroll>
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item" to="/home">
                    <span class="mui-icon">
                        <img src="../../../statics/imgs/iconhome.png">
                    </span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item" to="/mission">
                    <span class="mui-icon">
                        <span class="mui-badge">0</span>
                        <img src="../../../statics/imgs/icon03.png">
                    </span>
                    <span class="mui-tab-label">任务大厅</span>
                </router-link>
                <router-link class="mui-tab-item" id="zhuye" to="">
                        
                        <span class="mui-icon" id="money" >
                            <img src="../../../statics/imgs/zhuye_35.png">
                        </span>
                        
                </router-link>
                <router-link class="mui-tab-item" to="/message/action">
                    <span class="mui-icon">
                        
                        <img src="../../../statics/imgs/icon06.png">
                    </span>
                    <span class="mui-tab-label">信息中心</span>
                </router-link>
                <router-link class="mui-tab-item" to="/user">
                    <span class="mui-icon">
                        <img src="../../../statics/imgs/iconuser.png">
                    </span>
                    <span class="mui-tab-label">个人中心</span>
                </router-link>
            </nav>
        </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Cell } from 'mint-ui';
import Mhead from './Mhead.vue'
import MessageDeployListModule from './MessageDeployListModule.vue'
import common from '../../kits/common.js';
import Scroll from './scroll.vue';
export default {
         name:'question',
         data(){
             return {
                 quesData: {}
             }
         },
         components:{Mhead,MessageDeployListModule,'v-scroll': Scroll,},
         methods: {
            getList(){
                var that = this;
                let token = window.localStorage.getItem('token');
                var data = {
                        token:token,
                        type: 61,
                        Limit: 10,
                        pageNuw: 0,
                    };
                var url = common.apimain+'/api/article/articleTypeList';
                    //console.log(url);
                Indicator.open();
                this.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    if(resData.body.code == 1000){
                        Indicator.close();
                        that.quesData = resData.body.data.infos;
                    }else if(resData.body.code == 1013){
                        Indicator.close();
                        Toast({
                            message: '登录过期，重新登录',
                            duration: 2000
                        });
                        this.$router.push({path:'/loginuser'})
                    }else{
                        Indicator.close();
                        Toast({
                            message: '加载失败',
                            duration: 1000
                        });
                    } 
                },function(){
                    //console.log('失败了');
                    Indicator.close();
                    Toast('网络连接错误');
                });
            },
            onRefresh(done) {
                this.getList();
                done() // call done
            },
            onInfinite(done) {
                    var that = this;
                    let token = window.localStorage.getItem('token');
                    var data = {
                            token:token,
                            type: 61,
                            Limit: 10,
                            pageNuw: 0,
                        };
                    var url = common.apimain+'/api/article/articleTypeList';
                        //console.log(url);
                    Indicator.open();
                    this.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                        if(resData.body.code == 1000){
                            Indicator.close();
                            for(var i= 0; i<resData.body.data.infos; i++){
                                that.quesData.push(resData.body.data.infos[i]);
                            }
                        }else if(resData.body.code == 1013){
                            Indicator.close();
                            Toast({
                                message: '登录过期，重新登录',
                                duration: 2000
                            });
                            this.$router.push({path:'/loginuser'})
                        }else{
                            Indicator.close();
                            Toast({
                                message: '加载失败',
                                duration: 1000
                            });
                        } 
                    },function(){
                        //console.log('失败了');
                        Indicator.close();
                        Toast('网络连接错误');
                    });
            }
         },
        mounted () {
            this.getList();
        },
        

}
</script>
<style scoped>
    #question{
        width: 100%;
		max-width: 40rem /* 640/16 */;
		min-width: 20rem /* 320/16 */;
		margin: 0 auto;
		background-size: cover;
		background-repeat: no-repeat;
        min-height: 100vh;
        background-color: #fff;
        padding-top: 2.8rem;
    }
    #question a{
        color: #000;
    }

    /* ls head */
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
    .messhead li{
        height: 2.8rem;
        line-height: 2.8rem;
        border-bottom: 1px solid #ccc;
        text-align: center;
        float: left;
        width: 33.33vw;
    }

    .messhead   li:nth-of-type(2){
        background: url(../../../statics/imgs/INFORMATION-CENTRAL_03.png) no-repeat;
        background-size: 36% 5%;
        background-position: 1.4875rem /* 19/16 */ 2.1875rem /* 35/16 */;
    }
</style>