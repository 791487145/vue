 <template>
    <div id="" ref="tmpld">
         <com-header :title="title"></com-header>
        <section class="main">
                <section class="main_main">
                   <p class="top">输入<strong>安全密码</strong>，完成身份验证</p>
                   <input type="tel" name="password" id="password" maxlength="6" v-model="code">
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
                code:'',
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
            
        },
        mounted(){
           var _this=this; 
				let token = window.localStorage.getItem('token');
				//console.log(token)
				var url = common.apimain + '/api/user/vertifySafeCode';
				var json = {
					token:token,
					code:this.code,
				}
				var _this=this;
				Indicator.open();
				_this.$http.post(url,json,{emulateJSON: true},{timeout:5000}).then(res=>{
//					console.log(res.data);
					var body=res.data.data;
					if(res.data.code==1000){
							Indicator.close();
						
							
					}else if(res.data.code==1001){
							Indicator.close();
							Toast({
								message: '请输入原始密码',
								duration: 1000
							});
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
   .main_main{
      
   }
    .top{
        width: 100%;
        height: 5rem /* 80/16 */;
        border-bottom: 1px solid #E7E7E7;
        text-align: center;
        line-height: 5rem;
        background-color: #fff;
        margin-bottom: .625rem /* 10/16 */;
    }
    #password{
        display: block;
        width: 16.875rem /* 270/16 */;
        margin: 0 auto;
    }
</style>
