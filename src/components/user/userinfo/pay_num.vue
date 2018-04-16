 <template>
    <div id="" ref="tmpld">
         <com-header :title="title"></com-header>
        <section class="main" v-if="!dis">
            <section class="mian_top">
                <input type="text" placeholder="请输入支付宝号" class="pay_in" v-model='paynum'/>
            </section>
            <section class="button divcssss" @click="pay_button">
                <!-- <router-link  class="button_a"> -->
                    <!-- to="/user/security_info/verification" -->
                绑定
                <!-- </router-link> -->
            </section>
            <section class="button_ready">
                <!-- <router-link  class="button_a"> -->
                    <!-- to="/user/security_info/verification" -->
                已绑定
                <!-- </router-link> -->
            </section>
        </section> 
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
                title:'支付宝号',
                paynum:'',
                alipayAccount:'',
                dis:''
            }
        },

        components: {
            comHeader,
        },
        computed:{
         
        },
        created(){
           
        },
        methods: {
           pay_button() {
           		 var _this = this;
						let token = window.localStorage.getItem('token');
//						console.log(token);
						
						var url = common.apimain + '/api/auth/alipayAuth';
						var json = {
							token: token,
							alipayAccount: this.paynum
						}
//						console.log(token);
//						console.log(json);
						_this.$http.post(url, json, {
							emulateJSON: true
						}, {
							timeout: 5000
						}).then(res => {
							console.log(res.data);
							var body = res.data.data;
							if(res.data.code == 1000) {
								Toast({
									message: '提交成功，请耐心等待',
									duration: 1000
								});
								this.$router.go(-1);

							} else if(res.data.code == 1013) {
								Indicator.close();
								Toast({
									message: '登录过期',
									duration: 1000
								});
								this.$router.push({
									path: '/loginuser'
								});
							} else {
								Indicator.close();
								Toast({
									message: '请输入支付宝账号',
									duration: 1000
								});
							}

						}, function() {
							Indicator.close();
							Toast('网络连接错误');
						});
           }
        },
        mounted(){
           				
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
       height: 3rem;
       line-height: 3rem;
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
        display: block;
    }
    .button_ready {
    	width: 80%;
        height: 3rem /* 48/16 */;
        margin: 0 auto;
        background: #487CBD;
        text-align: center;
        line-height: 3rem /* 48/16 */;
        color: #fff;
        margin-top: 1.875rem /* 30/16 */;
        font-size: 1rem /* 16/16 */;
        position: absolute;
        top:98px;
        left: 35px;
        display: none;
    }
    .button_a{
         color: #fff;
    }
    .pay_in{
    	border: none;
    }
</style>
