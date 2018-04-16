<template>
        <div id="schoolzp">
                <div id="head" class="divcss">
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
                                <span class="border_slide"></span>
                        </ul>
                </div>
            <div class="list" ref="list">
                <scroller delegate-id="myScroller" :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
                <ul class="zpfor">
                    <li v-for="zp in schoolZP" class="zpli">
                        <router-link v-bind="{to:'/message/qpage2/'+zp.id}">
                            <div>
                                <span class="postname">{{zp.post_name}}</span><b>{{zp.salary}}</b>
                            </div>
                            <div>
                                <!-- <img class="qiye" src="../../../statics/imgs/zhuye_35.png" alt=""> -->
                                {{zp.company_name}}
                                <b class="zp">招聘中</b>
                            </div>
                        </router-link>
                    </li>
                </ul>
                </scroller>	
            </div>
            <footer-click></footer-click>
        </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Cell } from 'mint-ui';
import Mhead from './Mhead.vue'
import common from '../../kits/common.js';
import "../../kits/jquery.min.js";
import footer from '../../kits/common/footer';
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


export default {
         name:'schoolzp',
         data(){
             return {
                 schoolZP: null,
                   //加载
                noData: '',
                page:'0',
                 //加载
				noData: '',
             }
         },
         components:{
         	Mhead,
         	"footer-click":footer
         },
         methods: {
            getList(){
                
                let token = window.localStorage.getItem('token');
                var that = this;
                that.page = 1;
                var data = {
                        token:token,
                        type: 1,
                        Limit: 8,
                        pageNuw: that.page,
                    };
                var url = common.apimain+'/api/article/articleTypeList';
                    //console.log(url);
               
                this.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    if(resData.body.code == 1000){
                      
                        that.schoolZP = resData.body.data.invites;
                        //console.log(resData.body.data.invites)
                         if (resData.body.data.invites.length <= 0) {
                                
                                $("#more").css("display", "none");
                                return;
                                }
                    }else if(res.data.code == 1013){
                      
                        Toast({
                            message: '登录过期，重新登录',
                            duration: 2000
                        });
                       this.$router.push({path:'/loginuser'})
                    }else{
                     
                        Toast({
                            message: '加载失败',
                            duration: 1000
                        });
                    } 
                },function(){
                    //console.log('失败了');
                  
                    Toast('网络连接错误');
                });
            },
           

            infinite(loaded) {
                //console.log(this.noData)
            if(this.noData) {
                setTimeout(()=>{
                            this.$refs.myscroller.finishInfinite(2);
                            //console.log(1)
                })
                return;
            }
                setTimeout(() => {
                            
                    this.page++; 
                    var that = this;
                    let token = window.localStorage.getItem('token');
                    var data = {
                            token:token,
                            type: 60,
                            Limit: 8,
                            pageNuw: that.page,
                        };
                    var url = common.apimain+'/api/article/articleTypeList';
                    //console.log(url);
                    //console.log(data);
                   
                    that.$http.post(url,data,{emulateJSON: true},{timeout:5000}).then(function(resData){
                       // console.log(resData)
                        if(resData.body.code == 1000){
                           
                            for(var i= 0; i<resData.body.data.invites; i++){
                                that.schoolZP.push(resData.body.data.invites[i]);

                            }
                            var arr = resData.body.data.invites;
                           // console.log(123)
                             $("#more").css("display", "none");
                           // console.log($("#more"))
                             if (i + 1 >= arr.length) {
                                //console.log(123)
                                $("#more").css("display", "none");
                                return;
                                }
                        }else if(resData.body.code == 1013){
                           
                            Toast({
                                message: '登录过期，重新登录',
                                duration: 2000
                            });
                            that.$router.push({path:'/loginuser'})
                        }else{
                           
                            Toast({
                                message: '加载失败',
                                duration: 1000
                            });
                        } 
                    },function(){
                        //console.log('失败了');
                      
                        Toast('网络连接错误');
                    });
                         loaded('done');
                            //上啦
                }, 1500)

            },
            refresh(loaded) {
                        //下拉
                 setTimeout(()=> {
                    this.getList();
                    loaded('done');
                }, 1500)
            }

        },
        mounted () {
            this.getList();
             this.$refs.list.style.height = document.documentElement.clientHeight-105+"px";
        },
        
}
</script>
<style scoped>
    #schoolzp{
        width: 100%;
		max-width: 40rem /* 640/16 */;
		min-width: 20rem /* 320/16 */;
		margin: 0 auto;
		background-size: cover;
		background-repeat: no-repeat;
        height: 50vh;
        padding-top: 2.8rem;
    }
    #schoolzp a{
        color: #000;
    }
    #schoolzp .zpfor{
        padding-bottom: 16vh;
    }
    #schoolzp .zpfor li{
        padding: 0.6rem;
        background-color: #fff;
        border-top: 1px solid #f3f3f3;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: .625rem /* 10/16 */;
    }
    li div{
        padding: 0 ;
        height: 2rem;
        line-height:2rem;
    }
    li div:nth-of-type(1){
        font-size: 1.2rem /* 16/16 */;
    }
    li div:nth-of-type(2){
        font-size: 0.8rem /* 16/16 */;
    }
    li span{
        float: left;
        width: 22vw;
    }
    li b{
        float: right;
        color: #f5532a;
        font-size: 1rem;
    }
    .qiye{
        height: 1.5rem;
        float: left;
        margin-right: 1rem;
    }
    .zp{
        color: #d1d1d1;
        font-size: .75rem /* 12/16 */;
        font-weight: 400;
    }
    .mess span{
        text-align: center;
    }
    .postname{
        width: 40vw;
        font-weight: 500;
        font-size: 1rem;
    }

    /* lshead */
    #head{
        height: 2.8rem;
        line-height: 2.8rem;
        text-align: center;
    
        z-index: 100;
   
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
    #head li{
        height: 2.8rem;
        line-height: 2.8rem;
        border-bottom: 1px solid #ccc;
        text-align: center;
        float: left;
        width: 33.33vw;
    }

    #head .messhead   li:nth-of-type(5){
        background: url(../../../statics/imgs/INFORMATION-CENTRAL_03.png) no-repeat;
        background-size: 36% 5%;
        background-position: 1.4875rem /* 19/16 */ 2.1875rem /* 35/16 */;
    }
    

    .list{
        width: 100%;
        position: relative;
    }


     .border_slide {
    	position: absolute;
    	bottom: 1px;
    	right: 0px;
    	width: 33.33%;
    	height: 5px;
        background:#fff;
        border-radius: 3px;
    }
</style>