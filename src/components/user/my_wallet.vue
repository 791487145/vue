<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
		<section>
			<div class="wallet_top divcss">
				<div class="wallet_top_one">
					<h3>{{money || '0'}}</h3>
					<p>账户余额</p>
				</div>
				<ul class="wallet_top_two">
					<li>
						<span>今日收益(元)</span>
						<p>{{moneyone || '0'}}</p>
					</li>
					<li>
						<span>累计收益(元)</span>
						<p>{{moneytwo || '0'}}</p>
					</li>
				</ul>
				<ul class="wallet_top_two">
					<li>
						<span>今日收益(金币)</span>
						<p>{{moneythree || '0'}}</p>
					</li>
					<li>
						<span>金币余额</span>
						<p>{{moneyfore || '0'}}</p>
					</li>
				</ul>
			</div>
			<div class="wallet_center">
				<div class="center_one">
					<img src="" alt="" srcset="">
					<span>请先进行身份验证和银行卡绑定</span>
				</div>
				<div class="center_two">
					<router-link to="/user/my_wallet/pay" class="center_two_pay">
						<dl @click.self="pay">
							<dt>
								<img slot="icon" src="../../../statics/imgs/wallet_15.png" width="18" height="17">
							</dt>
							<dd>充值</dd>
						</dl>
					</router-link>
					<router-link to="" class="center_two_pay">
						<dl @click="withdraw">
							<dt>
								<img slot="icon" src="../../../statics/imgs/wallet_13.png" width="18" height="16">
							</dt>
							<dd>提现</dd>
						</dl>
					</router-link>	
				</div>
				
			</div>
			<div class="wallet_bottom">
				<router-link to="/user/transaction_records">
					<div class="wallet_main">
						<p class="wallet_main_list">
							<span class="list_one">交易记录</span>
						</p>
						<!-- <p class="wallet_main_list">
							<span class="list_one">银行卡详情</span>
						</p> -->
					</div>
				</router-link>
			</div>
			<!-- <div class="no_content">
				暂无数据
			</div> -->
		</section>
	</div>
	
</template>

<script>
	import { Cell } from 'mint-ui';
	import common from '../../kits/common.js';//api
	import { Toast } from 'mint-ui';
	import comHeader from '../../kits/comheader';
	export default{
		data(){
			return{
				title:'我的钱包',
				money:null,
				moneyone:null,
				moneytwo:null,
				moneythree:null,
				moneyfore:null,
				gold:null,
			}
		},
		components:{
			"com-header":comHeader,
		},
		methods:{
			touser(){
				this.$router.push({path:'/user'})
			},
			pay(){
				this.$router.push({path:'/user/my_wallet/pay'})
			},
			withdraw(){
				var that = this;
				var token = window.localStorage.getItem('token');
				var url = common.apimain + '/api/fincial/withdrawals?token='+token;
				//console.log(token)
				that.$http.get(url,{emulateJSON: true},{timeout:15000}).then((res) => {
							//console.log(res.body)
							var data = res.body.data
							if(res.body.code == 1000){
									if(data.balance >=  data.withdraw_min ||data.balance >= data.per_low){
										that.$router.push({path:'/user/my_wallet/withdraw'});
									}else{
										Toast({message:"您的余额不足",duration: 1000});
									}


							}else{
								Toast({message: res.body.message,duration: 800});
							}
                    }, (response) => {
						Toast({message:"网络连接错误，请稍后重试",duration: 800});
                            //console.log('网络连接错误，请稍后重试');
                    });
			},
		},
		mounted(){
			var that = this;
			that.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
			var token = window.localStorage.getItem('token');
					var url = common.apimain + '/api/fincial/myPurse'+'?token='+token;
                    that.$http.get(url,{emulateJSON: true},{timeout:15000}).then((res) => {
							//console.log(res.body)
							var data = res.body.data
							if(res.body.code == 1000){
								//console.log(data)
							  that.money = data.my_purse;
							  that.moneyone = data.balance_today;
							  that.moneytwo = data.balance_amount;
							  that.moneythree = data.gold_today;
							  that.moneyfore = data.gold_amount;
							}else{
								Toast(res.body.message)
							}
                    }, (response) => {
						Toast("网络连接错误，请稍后重试")
                            //console.log('网络连接错误，请稍后重试');
                    });
		}
	}
</script>

<style scoped>
	.comheader{
		height: 3.125rem /* 50/16 */;
		width: 100%;
		position: fixed;
		z-index: 100;
		top: 0;
	}

	.comheader img{
		width: 1rem /* 16/16 */;
		height: 3.125rem /* 50/16 */;
		float: left;
		margin:0 .875rem /* 14/16 */;
		padding: .8125rem /* 13/16 */ 0;
		z-index: 110;
	}
	.content{
		width: 100%;
		height: 3.125rem /* 50/16 */;
		color: #fff;
		font-size: 1rem /* 16/16 */;
		text-align: center;
		line-height: 3.125rem /* 50/16 */;
		padding-right: 2.75rem /* 44/16 */;
	}

	section{
		padding-top: 3.125rem /* 50/16 */;
	}
	.wallet_top{
		padding: 1.875rem /* 30/16 */ 0;
		border-bottom: 1px solid #5B9BDF;
	}
	.wallet_top p{
		color: #fff;
	}
	.wallet_top_one{
		width: 100%;
		text-align: center;
		
	}
	.wallet_top_one h3{
		font-size: 1.5rem /* 24/16 */;
		font-weight: 500;
	}
	.wallet_top_one p{
		font-size:1rem /* 12/16 */;
		-webkit-transform:scale(0.8); 
		transform:scale(0.8); 
	}
	.wallet_top_two{
		display: flex;
		margin-top: .9375rem /* 15/16 */;
	}

	.wallet_top_two li{
		width: 50%;
		text-align: center;
	}
	.wallet_top_two li span{
		font-size:1rem /* 12/16 */;
		-webkit-transform:scale(0.8); 
		transform:scale(0.8); 
	}
	.wallet_top_two li p{
		font-size: 1rem /* 16/16 */;
		font-weight: 600;
	}
	/* 中间 */
	.wallet_center{
		font-size: .875rem /* 14/16 */;
		width:100%;
		background: #fff;
		
		
	}
	.center_one{
		width: 100%;
		height: 2.875rem /* 46/16 */;
		line-height: 2.875rem /* 46/16 */;
		text-align: center;
		background-color: #B7D4EF;
		display: none;
	}
	.center_two{
		height: 3.0625rem /* 49/16 */;
		line-height: 3.0625rem /* 49/16 */;
		display: -webkit-flex; /* Safari */
  		display: flex;
		border-top: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
	}
	.center_two_pay{
		width: 50%;
		color: #000;
	}
	.center_two dl{
		
		display: -webkit-flex; /* Safari */
  		display: flex;
		justify-content:  center;
	}
	.center_two dl:first-child{
		border-right: 1px solid #E5E5E5;	
	}
	.center_two dl dt{
		padding: .25rem /* 4/16 */ .625rem /* 10/16 */ 0 0;
	}
	/* 底部 */
	.wallet_main{
		border-top:1px solid #DCDBE2;
		margin-top:.9375rem /* 15/16 */;
	}

	.wallet_main_list{
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
    .wallet_main_list:after{
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
	.list_one{
		display:block;
        margin:0;
        font-size:1rem /* 14/16 */;
        color:#484848;
	}
	.clear_last{
		display:block;
        font-size:.75rem /* 12/16 */;
        color:#FD8413;
		font-weight: bold;
	}
	
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin-top:60%;
		color:red;
	}

</style>