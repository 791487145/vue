<template>
    <div id="messagepage">
			<com-header :title="title"></com-header>
            <div class="mbody">
                <h1>{{qdata.title}}</h1>
                <div class="mes">
                    <span>{{qdata.view_times}}阅</span>
                    <span>{{qdata.created_at}}</span>
                </div>
                <div class="mp">
                    <!-- <img :src="'http://www.zfy0351.cn/'+qdata.thumb_pic" alt=""> -->
                    <div  class="beizhuanyi" v-html="qdata.content">
                    </div>
                    <div class="zan" @click="zan">
                        <div v-if="zanstatus == 0">
                                <img src="../../../statics/imgs/zan_50.png" alt=""><br>
                                {{qdata.thumb_up_number}}赞
                        </div>
                        <div v-if="zanstatus == 1">
                                <img src="../../../statics/imgs/zan_52.png" alt=""><br>
                                {{qdata.thumb_up_number+chushi}}已赞
                        </div>
                    </div>                    
                </div>
            </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Cell } from 'mint-ui';
import Mhead from './Mhead.vue'
import "../../kits/jquery.min.js"
import common from '../../kits/common.js';
import comheader from '../../kits/comheader.vue';
 export default {
     name:'messagepage',
     data(){
         return {
            title:"活动详情",
             qdata: {},
             zanstatus: false,
             chushi: 0
         }
     },
     methods:{
        toback:function(){
            this.$router.go(-1);
        },
        zan(){
            if(this.zanstatus==0){
                var that = this;
                let token = window.localStorage.getItem('token');
                var data = {
                        token:token,
                        article_id: this.$route.params.id,
                    };
                var url = common.apimain+'/api/article/articleThumbsUp';
                    //console.log(url);
                this.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    //console.log(resData);
                    that.zanstatus = true;
                    that.chushi = 1;
                    if(resData.body.code ==1001){
                        that.chushi = 0;
                    }else if(resData.body.code == 1001){
                        Indicator.close();
                        Toast({
                            message: '登录过期，重新登录',
                            duration: 2000
                        });
                        this.$router.push({path:'/loginuser'})
                    }
                });
            }
            
        }
     },
     components:{Mhead, ComHeader:comheader,},
     mounted () {
        var that = this;
        var id = this.$route.params.id;
        let token = window.localStorage.getItem('token');
        var url = common.apimain+'/api/article/getArticle?token='+token+'&articleId='+id+'&type='+1;
        Indicator.open();
        this.$http.get(url).then(resData=>{
                if(resData.body.code == 1000){
                    Indicator.close();
                    that.qdata = resData.body.data;
                    that.zanstatus = resData.body.data.userArticleCommentThumbup;
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
 }
</script>
<style scoped>
    #messagepage{
        min-height: 100vh;
        background-color: #fff;
        padding-top: 3.125rem /* 50/16 */;
        overflow: hidden;
    }

    .content{
        width: 70%;
        height: 3.125rem /* 50/16 */;
        color: #fff;
        font-size: 1.2rem /* 16/16 */;
        text-align: center;
        line-height: 3.125rem /* 50/16 */;
       
    }
    .right{
        float: right;
        font-size: .75rem /* 12/16 */;
        color: #fff;
        line-height: 3.125rem /* 50/16 */;
	}
	.right>img{
		width: 100%;
        width: 1.25rem /* 20/16 */;
		height:1.25rem /* 20/16 */;
		margin:-2px 0.875rem /* 14/16 */;
        z-index: 110;
	}
    .mbody{
        padding: 1.2rem 1rem;
        background-color: #fff;
        padding-bottom: 0;
    }
    h1{
        font-size: 1.1rem /* 17/16 */;
        padding-bottom: 1rem;
        font-weight: 400;
    }
    .mes{
        height: 3.2rem;
        line-height: 3.2rem;
        font-size: .875rem /* 14/16 */;
        color: #757575;
        border-bottom: 1px solid #eff0f2;
    }
    .mes span:nth-of-type(1){
        margin-right: 2rem;
    }
    .mes span:nth-of-type(2){
        float: right;
    }
    .mp{
        margin-top: 1rem;
    }
    .zhuanyi{
        display: none;
    }
    .zan{
        width: 6.25rem /* 100/16 */;
        height: 6.25rem /* 100/16 */;
        margin: 1.875rem auto 0;
        text-align: center;
    }
    .zan img{
        width: 3rem /* 48/16 */;
    }
    img{
        width: 50px;
    }
    .beizhuanyi{
        overflow: hidden;
    }
    .beizhuanyi p img{
        width: 96vw !important;
        height: 30vw !important;
        display: block !important;
        margin: 0 auto !important;
    }
</style>