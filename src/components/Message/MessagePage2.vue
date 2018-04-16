<template>
    <div id="messagepage">
				<com-header :title="title"></com-header>
           <div class="zwxq">
                <div class="zw">
                    <span>{{zwdata.post_name}}</span> <span>{{zwdata.salary}}</span>
                </div>
                <div class="cp">
                    <div class="cpname">{{zwdata.company_name}}</div>
                </div>
           </div>
            <div class="module">
                    <div class="thead">
                        <span class="bluebar"></span> 职位详情
                    </div>
                    <div class="main" v-html="zwdata.post_demand">
                    </div>
            </div>
            <div class="module">
                    <div class="thead">
                        <span class="bluebar"></span> 联系方式
                    </div>
                    <div class="main">
                        电话: <span v-html="zwdata.phone"></span> <br>
                        邮箱: <span v-html="zwdata.email"></span>
                    </div>
            </div>
            <div class="module">
                    <div class="thead">
                        <span class="bluebar"></span> 公司地址
                    </div>
                    <div class="main">
                            {{zwdata.address}}
                    </div>
            </div>
    </div>
</template>
<script>
import comheader from '../../kits/comheader.vue';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Cell } from 'mint-ui';
import Mhead from './Mhead.vue'
import "../../kits/jquery.min.js"
import common from '../../kits/common.js';
 export default {
     name:'messagepage',
     data(){
         return {
             zwdata: {},
              title:"职位详情",
         }
     },
     methods:{
        toback:function(){
            this.$router.go(-1);
        },
     },
     components:{Mhead,ComHeader:comheader,},
     created () {
        var that = this;
        var id = this.$route.params.id;
        let token = window.localStorage.getItem('token');
        var url = common.apimain+'/api/article/getArticle?token='+token+'&articleId='+id+'&type=2';
        Indicator.open();
        this.$http.get(url).then(resData=>{
                if(resData.body.code == 1000){
                    Indicator.close();
                    that.zwdata = resData.body.data;
                }else if(resData.data.code == 1013){
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
        background-color: #efefef;
        font-family: "Microsoft Yahei";
        padding-top: 3.125rem /* 50/16 */;
    }
    .header{
        height: 3.125rem /* 50/16 */;
        width: 100%;
        background-color: #4171ae;
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        position: fixed;
        top: 0;
        left: 0;
    }

    .header>img{
        width: 100%;
        width: 1rem /* 16/16 */;
        height: 3.125rem /* 50/16 */;
        float: left;
        margin:0 .875rem /* 14/16 */;
        padding: .8125rem /* 13/16 */ 0;
        z-index: 110;
    }
    .content{
        width: 70%;
        height: 3.125rem /* 50/16 */;
        color: #fff;
        font-size: 1.2rem /* 16/16 */;
        text-align: center;
        line-height: 3.125rem /* 50/16 */;
    }
    .zwxq{
        padding: 0 0.8rem;
        background-color: #fff;
        margin-bottom: 1rem;
    }
    .zw{
        height: 3.25rem /* 52/16 */;
        line-height: 3.25rem /* 52/16 */;
        border: 1px solid #f6f7f8;
        overflow: hidden;
    }
    .zw span:nth-of-type(1){
        font-size: 1.1rem;
        font-weight: 400;
        float: left;
    }
    .zw span:nth-of-type(2){
        float: right;
        color: #f5532a;
        font-weight: 500;
    }
    .cp div{
        width: 96vw;
    }
    .cp{
        padding: 1rem 0;
        line-height: 1.9rem;
        position: relative;
        font-size: 1rem;
    }
    .cpname{
        font-size: 1rem;
        color: #555;
        font-weight: 400;
    }
    .cpxq{
        padding: 1rem;
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    .module{
        margin-bottom: 1rem;
        background-color: #fff;
    }
    .thead{
        font-size: 1.1rem;
        font-weight: 500;
        padding: 1rem;
        color: #1e1f21;
        border-bottom: 1px solid #eff0f2;
    }
    .bluebar{
        width: 0.3rem;
        height: 1rem;
        background-color: #478fd6;
        display: inline-block;
        border-radius: 4px;
    }
    .main{
        padding: 1rem;
        font-size: 0.9rem;
        line-height: 1.6rem;
    }
    p{
        font-size: 0.8rem;
    }
</style>