 <template>
    <div id="" ref="tmpld">
         <com-header :title="title"></com-header>
        <section class="main" v-if="!dis">
            <section class="mian_top">
                <p class="top"><img src="../../../../statics/imgs/xinxixiugai_23.png" alt=""><span>当前手机号</span></p>
                <h3 class="num">{{phonenum}}</h3>
                <p class="bottom">
                    更改手机号码不影响你的身份认证，余额等账号信息。更改后，请用新的手机号码登录
                </p>
            </section>
            <section class="button divcssss" @click="dis=!dis">
                <!-- <router-link  class="button_a"> -->
                    <!-- to="/user/security_info/verification" -->
                    更改手机号
                <!-- </router-link> -->
            </section>
        </section> 
        <verigi v-if="dis" :phonenum="phonenum"></verigi>
    </div>
</template>

<script>
    import comHeader from '../../../kits/comheader';
    import verigi from './verification';
    import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import common from '../../../kits/common.js';//api
    export default {
        data(){
            return{
                title:'手机号',
                phonenum:null,
                dis:false,
            }
        },

        components: {
            comHeader,
            verigi,
        },
        computed:{
         
        },
        created(){
           
        },
        methods: {
            phonenu(){
                
            }
        },
        mounted(){
            let token = window.localStorage.getItem('token');
			var url = common.apimain + '/api/user/getUserInfo?token='+token;
			//console.log(token)
			var _this=this;
			_this.$http.get(url,{timeout:5000}).then(res=>{
                //console.log("------************-------------")
                //console.log(res.data);
                //console.log("------************-------------");
				if(res.data.code == 1000){
					Indicator.close();
					_this.phonenum=res.data.data.mobile;
					
				}else if(res.data.code == 1013){
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

			this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		}
    }
</script>

<style scoped>
   .main{
       padding-top: 3.125rem /* 50/16 */;
   }
   .mian_top{
       border-bottom: 1px solid #E5E5E5;
       background: #fff;
       padding:0 5%;
   }
	   
   .top{
		height: 3.4375rem /* 55/16 */;
		line-height:3.4375rem /* 55/16 */;
		display: -webkit-flex; /* Safari */
		display: flex;
        font-size: .875rem /* 14/16 */;
		
	}
	.top img{
		display: block;
		width:.625rem /* 10/16 */;
		height:.9375rem /* 15/16 */;
		margin-top: 20px;
	}
	.top span{
		/* font-weight: bold; */
		margin-left:.3125rem /* 5/16 */;
	}
    
    .num{
        width: 100%;
        font-weight: bold;
        font-size: 1.125rem /* 18/16 */;
    }
    .bottom{
        font-size:.75rem /* 12/16 */;
        color:#818181;
        margin:1.875rem /* 30/16 */ 0 1.125rem /* 18/16 */ 0;
    }
    .button{
        width: 80%;
        height: 3rem /* 48/16 */;
        margin: 0 auto;
        
        text-align: center;
        line-height: 3rem /* 48/16 */;
        
        margin-top: 1.875rem /* 30/16 */;
        font-size: 1rem /* 16/16 */;
    }
    .button_a{
         color: #fff;
    }
</style>
