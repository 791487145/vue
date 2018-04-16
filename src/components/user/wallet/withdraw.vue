<template>
	<div id="" ref="tmpld">

        <com-header :title="title"></com-header>
		<section class="succeed">	
            <div class="pay_top divcss">
				<p class="pay_top_top">我要提现</p>
				<div class="input_type">
                    <span>￥</span>
					<input type="number" name="" id="" placeholder="0.00" v-model="money">
				</div>
                <p class="pay_top_bottom">单笔提现限额2,000元，高于10元才可提现。</p>
			</div>
			<div class="setting_main">
					<div class="setting_main_list">
						<span>提现手续费</span>
                        <span>￥{{price}}</span>
					</div>
					<div class="setting_main_list">
						<span>提现方式</span>
                        <span>支付宝</span>
					</div>
					
				</div>
            <button class="btn divcss" @click="btn">24小时内到账，确认提现</button>
            <p class="forget_password" @click="forget">忘记交易密码？</p>
		</section>	
	</div>
	
</template>

<script>
import common from '../../../kits/common.js';//api
import comHeader from '../../../kits/comheader';
import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
                title:"提现", 
                money:'',
                price:'',
                withdraw_min:'',
			}
		},
		components:{
			"com-header":comHeader,
		},
		methods:{
            toback:function(){
               // console.log(this.title)
                this.$router.go(-1);
            },
            btn(){
                var that = this;
                if(that.money<that.withdraw_min){
                    Toast({message:"提现金额小于最小提现金额",duration: 800});
                }else{
				var token = window.localStorage.getItem('token');
                var url = common.apimain + '/api/fincial/withdrawals';
                var json = {
                    token:token,
                    cash:that.money
                }
                //console.log(json)
                
                
				that.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then((res) => {
							//console.log(res.body)
                            var data = res.body.data
    
							if(res.body.code == 1000){									
                                Toast({message:"提现申请成功",duration: 800});
							}else{
								Toast({message: res.body.message,duration: 800});
							}
                    }, (response) => {
						Toast({message:"网络连接错误，请稍后重试",duration: 800});
                            //console.log('网络连接错误，请稍后重试');
                    });
                }
            },
            forget(){
                this.$router.push({path:'/user/userinfo/securitypassword'})
            },
            // 提现规则
            rule(){

            },
            getmoney(){//提现手续费
                var that = this;
				var token = window.localStorage.getItem('token');
				var url = common.apimain + '/api/fincial/withdrawals?token='+token;
				//console.log(token)
				that.$http.get(url,{emulateJSON: true},{timeout:15000}).then((res) => {
							console.log(res.body)
                            var data = res.body.data;
                            var per_charge = data.per_charge/100;
                            that.withdraw_min = data.withdraw_min;
                            var per_low =  data.per_low;
                            var per_high = data.per_high;
                            var a = that.money*per_charge;
                            //console.log(a)
                            if(a<=per_low){
                                that.price = per_low;
                            }else if(a>=per_high){
                                that.price = per_high;
                            }else if(a == null){
                                that.price = '0.00';
                            }else{
                                a = a.toFixed(2);
                                that.price = a;
                            }
                    }, (response) => {
						Toast({message:"网络连接错误，请稍后重试",duration: 800});
                            //console.log('网络连接错误，请稍后重试');
                    });
            }
		},
		mounted(){
			this.getmoney();
			this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
        },
        watch:{
            money(newval){
                //console.log(newval)
                this.getmoney()
            }
        }
        
	}
</script>

<style scoped>
    .header{
        height: 3.125rem /* 50/16 */;
        width: 100%;
        background-color: #4171AE;
        position: fixed;
        z-index: 100;
        top: 0;
         display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
    }

    .header img{
        width: 100%;
        width: 1rem /* 16/16 */;
        height: 3.125rem /* 50/16 */;
        float: left;
        margin:0 .875rem /* 14/16 */;
        padding: .8125rem /* 13/16 */ 0;
        z-index: 110;
    }
    .content{
        width: 80%;
        height: 3.125rem /* 50/16 */;
        color: #fff;
        font-size: 1rem /* 16/16 */;
        text-align: center;
        line-height: 3.125rem /* 50/16 */;
       
    }
    .right{
        float: right;
        font-size: .75rem /* 12/16 */;
        color: #fff;
        line-height: 3.125rem /* 50/16 */;
    }
    /* 内容区 */
	section{
		padding-top: 3.125rem /* 50/16 */;
	}
     .pay_top{
        width:100%;
        padding: 0 5%;
    }
    .pay_top_top{
        color: #fff;
        font-size:1rem /* 16/16 */;
        padding-top: 1.875rem /* 30/16 */;
    }
   .input_type{
		width: 100%;
		height:3.75rem /* 60/16 */;
		border-bottom: 1px solid #E4E4E4;
		overflow: hidden;
        font-size: .75rem /* 12/16 */;
        color: #fff;
        margin: .9375rem /* 15/16 */ 0 1.875rem /* 30/16 */ 0;
	}
	.input_type input {
		height: 3.625rem /* 58/16 */;
		display: inline-block;
		width: 80%;
		margin: 0;
		border: none;
        font-size: 2.375rem /* 38/16 */;
        background: transparent;
        color: #C9DFF6;
	}

    .input_type input::-webkit-input-placeholder{
        color: #C9DFF6;
    }
    .input_type span{
        font-size: 16px;
    }
    .pay_top_bottom{
        color: #E3F0FB;
        font-size: .75rem /* 12/16 */;
        padding-bottom: .375rem /* 6/16 */;
    }
    .pay_top_bottom span{
        text-decoration: underline;
    }
    .setting_main{
		border-top:1px solid #DCDBE2;
	}

	.setting_main_list{
        height:3.125rem /* 50/16 */;
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
	.setting_main_list span{
		display:block;
        margin:0;
        font-size:.875rem /* 14/16 */;
        color:#484848;
	}
    .btn{
		display: block;
		
		width: 70%;
		margin: 5.75rem /* 92/16 */ auto 0;
		height: 3rem /* 48/16 */;
		
	}
    .forget_password{
        width: 100%;
        text-align: center;
        color: #A9A9A9;
        font-size: .75rem /* 12/16 */;
    }
</style>