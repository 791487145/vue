<template>
    <div id="action">
        <div>暂未开放</div>
            <!-- <div id="head" class="divcss">
                   <span class="cloud" id="cloud"></span> 
                    <ul class="messhead">
                             <li>
                                <router-link to="/message/deploy">
                                    推荐
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/message/question">
                                    咨讯
                                </router-link>
                            </li> 
                            <li class="active_borderOne">
                                <router-link to="/message/action">
                                    活动
                                </router-link>
                            </li>
                            <li class="active_borderTwo">
                                <router-link to="/message/rank">
                                    排行
                                </router-link>
                            </li>
                            <li class="active_borderThree">
                                <router-link to="/message/schoolzp">
                                    招聘
                                </router-link>
                            </li>
                           <span class="border_slide"></span>
                    </ul>
            </div> 
           <!-- <div ref="list" class="list">
                <scroller delegate-id="myScroller"
            :on-refresh="refresh"
  			:on-infinite="infinite"
              ref="myscroller"
           >
                <div>
                    <div v-for="aData in actionData">
                        <router-link v-bind="{to:'/message/qpage/'+aData.id}">
                            <message-action-module :actions="aData"></message-action-module>
                        </router-link>
                    </div>
                </div>
           </scroller>
           </div>
            底部导航 -->
            <footer-click></footer-click>
        </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Cell } from 'mint-ui';
import "../../kits/jquery.min.js"
import Mhead from './Mhead.vue'
import MessageActionModule from './MessageActionModule.vue'
import common from '../../kits/common.js';
import footer from '../../kits/common/footer';


import Vue from 'vue'
  	import VueScroller from 'vue-scroller'
  	Vue.use(VueScroller)
export default {
         name:'action',
         data(){
             return {
                actionData: {},
                page: 0,
                noData: '',
             }
         },
         components:{
         	Mhead,
         	MessageActionModule,
         	"footer-click":footer
         },
         methods: {
         	
            getList(){
                this.page = 0;
                var that = this;
                let token = window.localStorage.getItem('token');
                var data = {
                        token:token,
                        type: 60,
                        Limit: 6,
                        pageNuw: this.page,
                    };
                var url = common.apimain+'/api/article/articleTypeList';
                //console.log(data);
              
                this.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    if(resData.body.code == 1000){
                 
                        that.actionData = resData.body.data.infos;
                        $(".active_borderOne").eq(0).click(function(){
    						$('.border_slide').animate({left: '1px'}, "fast")
						})
						$(".active_borderTwo").eq(1).click(function(){
   							$('.border_slide').animate({left: '83px'}, "fast")
						})
						$(".active_borderThree").eq(2).click(function(){
    						$('.border_slide').animate({left: '166px'}, "fast")
						})
                    }else if(resData.body.code == 1013){
                     
                        Toast({
                            message: '登录过期，重新登录',
                            duration: 2000
                        });
                        this.$router.push({path:'/loginuser'})
                    }else{
                     
                        Toast({
                            message: '加载失败',
                            duration: 800
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
					  
				 
                var that = this;
                that.page++;
                let token = window.localStorage.getItem('token');
                var data = {
                        token:token,
                        type: 60,
                        Limit: 4,
                        pageNuw: that.page,
                    };
                var url = common.apimain+'/api/article/articleTypeList';
                   // console.log(data);
               
                that.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    if(resData.body.code == 1000){
                       
                        for(var i= 0; i<resData.body.data.infos.length; i++){
                            that.actionData.push(resData.body.data.infos[i]);
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
            this.$refs.list.style.height = document.documentElement.clientHeight-106+"px";
         },
}
</script>
<style scoped>
    #action{
        width: 100%;
		max-width: 40rem /* 640/16 */;
		min-width: 20rem /* 320/16 */;
		margin: 0 auto;
		background-image: url(../../../statics/imgs/SHOUYE_03.png);
		background-size: cover;
		background-repeat: no-repeat;
      
        padding-top: 2.8rem;
    }
    /* .cloud {
            width: 83px;
            height: 42px;
            position: absolute;
            top: 0;
            left: 0;
            background: url(../../../statics/imgs/cloud.gif) no-repeat;
    } */



    /* ls head */
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
    .messhead .active_borderOne,.active_borderTwo,.active_borderThree{
        height: 2.8rem;
        line-height: 2.8rem;
        border-bottom: 1px solid #ccc;
        text-align: center;
        float: left;
        width: 33.33vw;
    }
     .border_slide {
    	position: absolute;
    	bottom: 1px;
    	left: 0px;
    	width: 33.33%;
    	height: 5px;
        background:#fff;
        border-radius: 3px;
    }

    .messhead   li:nth-of-type(3){
        /* background: url(../../../statics/imgs/INFORMATION-CENTRAL_03.png) no-repeat; */
        background-size: 36% 5%;
        background-position: 1.4875rem /* 19/16 */ 2.1875rem /* 35/16 */;
    }

    .list{
        width: 100%;
        position: relative;
    }
    ._v-container{
	
	}
</style>