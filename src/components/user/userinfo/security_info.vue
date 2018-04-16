 <template>
    <div id="" ref="tmpld">
        <com-header :title="title"></com-header>
        <section class="main">
            <section>
                <section class="main_main">
                    <router-link to="/user/userinfo/original_secucode">
                        <section class="list_style">
                            <h2>安全密码</h2>
                        </section>
                    </router-link>
                    <router-link to="/user/userinfo/securitypassword">
                        <section class="list_style">
                            <h2>支付密码</h2>
                        </section>
                    </router-link>
                </section>
               <section class="main_bottom">
                   <span class="payfor">账号和绑定设置</span>
                   <section>
                       <router-link to="/user/security_info/phone_num" class="setting_main_list">
                            <span><img slot="icon" src="../../../../statics/imgs/xinxixiugai_18.png" width="24" height="24">手机号</span>
                            <span>{{phonenum}}</span>			
                        </router-link>
                        <router-link to="" class="setting_main_list"  style="display: none;">
                            <span><img slot="icon" src="../../../../statics/imgs/xinxixiugai_29.png" width="24" height="24">微信</span>
                            <span></span>			
                        </router-link>
                        <router-link to="/user/userinfo/pay_num" class="setting_main_list">
                            <span><img slot="icon" src="../../../../statics/imgs/xinxixiugai_37.png" width="24" height="24">支付宝</span>
                            <span>{{paynum}}</span>	
                        </router-link>
                        <router-link to="" class="setting_main_list"  style="display: none;">
                            <span><img slot="icon" src="../../../../statics/imgs/xinxixiugai_41.png" width="24" height="24">QQ</span>
                            <span></span>			
                        </router-link>
                        <router-link to="" class="setting_main_list"  style="display: none;">
                            <span><img slot="icon" src="../../../../statics/imgs/xinxixiugai_45.png" width="24" height="24">新浪微博</span>
                            <span></span>			
                        </router-link>
                   </section>
               </section>
            </section>
        </section> 
    </div>
</template>

<script>
     import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import common from '../../../kits/common.js';//api
	import comHeader from '../../../kits/comheader';
    export default {
        data(){
            return{
                title:'安全信息',
                phonenum:null,
                paynum:''
            }
        },

        components: {
            "com-header":comHeader,
        },
        computed:{
         
        },
        created(){
           
        },
        methods: {
            
        },
        mounted(){
             let token = window.localStorage.getItem('token');
			var url = common.apimain + '/api/user/getUserInfo?token='+token;
			//console.log(token)
			var _this=this;
			_this.$http.get(url,{timeout:5000}).then(res=>{
                console.log(res.data);
				if(res.data.code == 1000){
					_this.phonenum=res.data.data.mobile;
					
					
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

			this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		}
    }
</script>

<style scoped>
   .main{
       padding-top: 3.125rem /* 50/16 */;
   }
   .main_main{
       margin-top: .625rem /* 10/16 */;
   }
   .list_style,.img_style{
       display: flex;
       justify-content: space-between;
        height:3rem /* 42/16 */;
		border-bottom:1px solid #DCDBE2;
        line-height:3rem /* 42/16 */;
        padding: 0 5%;
        background: #fff;
        position: relative;
   }
   .list_style::after{
        border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 10px;
        position: absolute;
        width: 5px;
        height: 5px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
   }
   .list_style h2,.img_style h2{
       line-height:3rem /* 42/16 */;
       font-size: 1rem /* 14/16 */;
       color:#484848;
   }
   /* 账号和绑定设置 */
   .main_bottom{
       width: 100%;
       margin-top: .625rem /* 10/16 */;
   }
   .payfor{
		padding-left: 1.5625rem /* 25/16 */;
		font-size: .75rem /* 12/16 */;
		color: #B4B3B5;
		height: 1.25rem /* 20/16 */;
		line-height: 1.25rem /* 20/16 */;
	}
    .setting_main_list{
        height:2.625rem /* 42/16 */;
		border-bottom:1px solid #DCDBE2;
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
        justify-content: space-between;
        position:relative;
		border-bottom:1px solid #DCDBE2;
        background:#fff;
		padding:0 1.25rem /* 20/16 */ 0 .9375rem /* 15/16 */;
		line-height:2.625rem /* 42/16 */
    }
    .setting_main_list:after{
       border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 10px;
        position: absolute;
        width: 5px;
        height: 5px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
    .setting_main_list dl{
        margin:0;
        font-size:.875rem /* 14/16 */;
        color:#484848;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}  
    .setting_main_list dl dt{

    }  
    .setting_main_list dl dd{

    }
	.setting_main_list span{
		display:block;
        margin:0;
        font-size:.875rem /* 14/16 */;
        color:#484848;
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.setting_main_list span img{
		display:block;
		margin:.625rem /* 10/16 */ 5px 0 0;
	} 
</style>
