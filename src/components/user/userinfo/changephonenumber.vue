 <template>
    <div id="" ref="tmpld">
         <com-header :title="title"></com-header>
        <section class="main">
            <section class="mian_top">
                <p class="top">请输入要更换的新的手机号</p>
                <div class="center">
                    <input class="code" type="number" placeholder="请输入新的手机号" v-model="phone">
                </div>
                <div class="center">
                    <input class="code" type="number" placeholder="请输入验证码" v-model="code">
                    <button  id="code"  @click="get">获取验证码{{second}}</button>
                </div>
            </section>
            <section class="button" @click="link">
                               验证
            </section>
        </section> 
    </div>
</template>

<script>
    import comHeader from '../../../kits/comheader';
    import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import common from '../../../kits/common.js';//api
    export default {
        data(){
            return{
                title:'验证手机',
                code:'',
                phone:'',
                second:'',
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
            timeup:function(){ //倒计时
				this.second = 30 ;
				var that = this;
				var timedao = setInterval(function(){
					that.second =that.second-1;
					if(that.second ==  0){
						that.second = null;
						clearInterval(timedao);
						//console.log(that.second)
					}
					else if(that.second <= 1){
						that.second = null;
						clearInterval(timedao);
					}
				
				},1000)
			},
            get(){
                var _this=this;
                $('#code').attr('disabled','disabled');
				$('#code').css('background','#656565');
				_this.timeup();//改变button属性 调用定时器
                var url2 = common.apimain + '/api/user/sendCode';
                var json2 = {
                    phone:this.phone,
                    method:'5'
                    };
//                    console.log(json2.phone)
                this.$http.post(url2,json2,{emulateJSON: true},{timeout:15000}).then(function(res){
                        var body = res.body;
                        if(body.code == 1000){
                            Indicator.close();
                            Toast('发送成功');
                        }else{
                            Indicator.close();
                            Toast(body.message);
                        }
                    },function(){
                        //console.log('失败了');
                        Indicator.close();
                        Toast('网络连接错误');
                    })
            },
            link(){
                var url2 = common.apimain + '/api/user/phoneCodeVertiy';
                var json2 = {
                    phone:this.phone,
                    code:this.code,
                    };
//                    console.log(json2.phone)
                this.$http.post(url2,json2,{emulateJSON: true},{timeout:15000}).then(function(res){
                        var body = res.body;
                        if(body.code == 1000){
                            Indicator.close();
                            this.$router.push({path:'/user/per_info/security_info'})
                        }else{
                            Indicator.close();
                            Toast(body.message);
                        }
                    },function(){
                        //console.log('失败了');
                        Indicator.close();
                        Toast('网络连接错误');
                    })
            },
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
       padding:0 5% 1.25rem /* 20/16 */;
   }
	   
   .top{
		height: 3.4375rem /* 55/16 */;
		line-height:3.4375rem /* 55/16 */;
        font-size:.75rem /* 12/16 */;
        color:#818181;
		
	}
    .center{
        width: 100%;
        height: 2.375rem /* 38/16 */;
        display: flex;
        border-bottom:1px solid #DCDBE2;
    }
    .center input{
        border: none;
        height: 2rem /* 38/16 */;
         font-size: .875rem /* 14/16 */;
    }
    .center button{
        width: 5rem /* 80/16 */;
        height: 1.5625rem /* 25/16 */;
        font-size: .75rem /* 12/16 */;
        background: #487CBD;
        border-radius: .3125rem /* 5/16 */;
        color: #fff;
        margin-top: .3125rem /* 5/16 */;
    }
    .button{
        width: 80%;
        height: 3rem /* 48/16 */;
        margin: 0 auto;
        background: #487CBD;
        text-align: center;
        line-height: 3rem /* 48/16 */;
        color: #fff;
        margin-top: 1.875rem /* 30/16 */;
        font-size: 1rem /* 16/16 */;
    }
    .button_a{
         color: #fff;
    }
</style>
