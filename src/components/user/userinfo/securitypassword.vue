<template>
	<div id="" ref="tmpld">
		 <com-header :title="title"></com-header>
		<div class="point">
			<p>输入<span class="payPassword">支付密码</span>，完成身份验证</p>
		</div>
		<ul class="input_password" @click="apper_keyword">
			<input type="password" class="quar" maxlength="1" disabled/>
			<input type="password" class="quar" maxlength="1" disabled/>
			<input type="password" class="quar" maxlength="1" disabled/>
			<input type="password" class="quar" maxlength="1" disabled/>
			<input type="password" class="quar" maxlength="1" disabled/>
			<input type="password" class="quar" maxlength="1" disabled/>
		</ul>
		<footer class="pay-mask" v-show="payshow">
			<ul class="pay_btn">
				<li @click="btnpassword($event)">1</li>
				<li @click="btnpassword($event)">2</li>
				<li @click="btnpassword($event)">3</li>
				<li @click="btnpassword($event)">4</li>
				<li @click="btnpassword($event)">5</li>
				<li @click="btnpassword($event)">6</li>
				<li @click="btnpassword($event)">7</li>
				<li @click="btnpassword($event)">8</li>
				<li @click="btnpassword($event)">9</li>
				<li class="b9"></li>
				<li @click="btnpassword($event)">0</li>
				<li class="b9" @click="btndelete">←</li>
			</ul>
		</footer>
	</div>
</template>

<script>
	import "../../../kits/jquery.min.js"
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import common from '../../../kits/common.js'; //api
	import comHeader from '../../../kits/comheader';
	export default {
		props: {
			payshow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				title: '设置支付密码',
				autograph: '',
				index: -1,
				password: ''
			}
		},

		components: {
			"com-header":comHeader,
		},
		computed: {

		},
		created() {

		},
		methods: {
			touser() {
				this.$router.go(-1);
			},
			btnpassword(e) {
				var obj = e.currentTarget;
//				console.log(obj);
				var payinput = $(".quar");
				if(this.index < 5) {
					this.index++;
					$(payinput[this.index]).val($(obj).text());
				}
				if(this.index == 5) {
					var pay_pwd = '';
					var payinput = $(".quar");
					for(var i = 0; i < payinput.length; i++) {
						pay_pwd += $(payinput[i]).val();
//						console.log(pay_pwd);
					}
					this.handlePassword(pay_pwd);
					this.close_mask();					
				}
			},
			handlePassword(pay_pwd) {
						var _this = this;
						let token = window.localStorage.getItem('token');
//						console.log(token);
						
						var url = common.apimain + "/api/user/setPayCode";
						var json = {
							token: token,
							password: pay_pwd,
						}
						_this.$http.post(url, json, {
							emulateJSON: true
						}, {
							timeout: 5000
						}).then(res => {
							console.log(res.data);
							var body = res.data.data;
							if(res.data.code == 1000) {
								Toast({
									message: "添加成功",
									duration: 1000
								});
								
								
								

							} else if(res.data.code == 1013) {
								Toast({
									message: '登录过期',
									duration: 1000
								});
								this.$router.push({
									path: '/loginuser'
								});
							} else {
								Toast({
									message: body.message,
									duration: 1000
								});
							}

						}, function() {
							Toast('网络连接错误');
						});
						this.$refs.tmpld.style.height = document.documentElement.clientHeight + "px";
						$(".quar").focus(function(){
							this.apper_keyword();
							
						});
						
			},
			apper_keyword() {
								this.payshow = true;
						},

			close_mask() {
				this.payshow = false;
			},
			btndelete() {
				var payinput = $(".quar");
				if(this.index >= 0) {
					$(payinput[this.index]).val('');
					this.index--;
				}
			}
			
			
		},

		mounted() {
		
		}
	}
</script>

<style scoped>
	.comheader {
		height: 3.125rem/* 50/16 */;
		width: 100%;
		/* background:url(../../../statics/imgs/PERSONNAL-CENTRAL_38.png) no-repeat top left scroll; */
		position: fixed;
		z-index: 100;
		top: 0;
	}
	
	.comheader img {
		width: 1rem/* 16/16 */
		;
		height: 3.125rem/* 50/16 */
		;
		float: left;
		margin: 0 .875rem/* 14/16 */
		;
		padding: .8125rem/* 13/16 */
		0;
		z-index: 110;
	}
	
	.content {
		height: 3.125rem/* 50/16 */
		;
		color: #fff;
		font-size: 1rem/* 16/16 */
		;
		text-align: center;
		line-height: 3.125rem/* 50/16 */
		;
		padding-right: 2.75rem/* 44/16 */
		;
		margin-left: 3rem;
		float: left;
	}
	
	.main {
		padding-top: 3.125rem/* 50/16 */
		;
	}
	
	.main_main {
		margin-top: .625rem/* 10/16 */
		;
	}
	
	.list_style,
	.img_style {
		display: flex;
		justify-content: space-between;
		height: 2.625rem/* 42/16 */
		;
		border-bottom: 1px solid #DCDBE2;
		line-height: 2.625rem/* 42/16 */
		;
		padding: 0 5%;
		background: #fff;
		position: relative;
	}
	
	.list_style::after {
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
	
	.list_style h2,
	.img_style h2 {
		line-height: 2.625rem/* 42/16 */
		;
		font-size: .875rem/* 14/16 */
		;
		color: #484848;
	}
	
	.point {
		height: 6rem;
		background: #FFF;
		position: relative;
		top: 3.125rem;
		text-align: center;
		line-height: 6rem;
		font-size: 1rem;
	}
	
	.payPassword {
		font-size: 2rem;
		font-weight: bolder;
	}
	
	.input_password {
		margin: 6rem auto;
		height:3rem;
		width: 16.8rem;
		position: relative;
	}
	
	.quar {
		display: block;
		float: left;
		width: 2.8rem;
		height: 3rem;
		border: 1px solid #b0cbe7;
		background: #FFF;
	}
	
	.save {
		float: right;
		font-size: .75rem/* 12/16 */
		;
		color: #fff;
		line-height: 3.125rem/* 50/16 */
		;
		float: right;
		margin-right: 1rem;
	}
	
	footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		font-weight: 600;
	}
	
	.pay_btn li {
		width: 33.3333%;
		float: left;
		height: 5rem;
		line-height: 5rem;
		text-align: center;
		background: #fff;
		font-size: 1.5rem;
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}
	
	.pay_btn li:active {
		background: #C2C2C2;
	}
	
	.b9:active {
		background: #fff !important;
	}
	
	.b9 {
		background: #C2C2C2 !important;
	}
</style>