<template>
	<div id="" ref="tmpld">
		<com-header :title="title"></com-header>
		<input type="text" class="search" placeholder="请输入学校关键字" @keyup="searchCity" v-model="searchKey" @focus="getSchool()"/>
		<div class="search-result" v-show="hide">
 			<ul>
 				<li v-for="item in searchResult" @click="handleSearch" :accessKey="item.id" class="schoolInfo">
 					{{item.name}}
 				</li>
 			</ul>
 		</div>
	</div>
</template>

<script>
	import "../../../kits/jquery.min.js"
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import common from '../../../kits/common.js'; //api
	import comHeader from '../../../kits/comheader';
	
	export default {
		data() {
			return {
				title: '区域及学校',
				searchKey:'',
				searchResult:[],
				newsearchResult:[],
				token:'',
				hide:true,
				school:'',
				SchoolId:'',
				
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
			getSchool() {
					var _this=this; 
				let token = window.localStorage.getItem('token');
				var url = common.apimain + '/api/address/getSchoolInfo?token='+token;
				var _this=this;
				_this.$http.get(url,{timeout:5000}).then(res=>{	
					if(res.data.code==1000){
						for(var i=0;i<res.data.data.length;i++) {
							var name = res.data.data[i].name;
							var id = res.data.data[i].id;
							var obj = {
								id:id,name:name
							}
							_this.newsearchResult.push(obj);
						}
					}else if(res.data.code==1013){
							Indicator.close();
							Toast({
								message: '登录过期',
								duration: 1000
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
			searchCity() {
						var _this=this;
						_this.searchResult=[];
						var  schoolInfo=_this.newsearchResult;
							for(var i=0;i<schoolInfo.length;i++){
									var schoolInfoName=schoolInfo[i].name;
									//console.log(schoolInfoName)
									if(schoolInfoName.indexOf(_this.searchKey) != -1 ){
							 		//console.log(schoolInfoName)
							 		var arr={};
							 		arr["name"]=schoolInfo[i].name;
									arr["id"]=schoolInfo[i].id;
							 			_this.searchResult.push(arr);		
							 		}
								
							}
//							console.log(_this.searchResult)
				this.hide=true;
				if(!this.searchKey){
					this.hide=false;
				}
				var hide = this.hide;
				this.$emit('handleChangeShow',{
					hide
				})

			},
			handleSearch(e) {
						
						this.SchoolId = e.target.accessKey;
//						console.log($(".schoolInfo"))
//						console.log(this.SchoolId)
						//console.log(e.target.innerText);
						var _this = this;
						let token = window.localStorage.getItem('token');
						//console.log(token);
						var url = common.apimain + '/api/user/updateSchool';
						var json = {
							token: token,
							school:_this.SchoolId
						}
						//console.log(token);
						//console.log(json);
						_this.$http.post(url, json, {
							emulateJSON: true
						}, {
							timeout: 5000
						}).then(res => {
							var body = res.data.data;
							//console.log(res.data)
							if(res.data.code == 1000) {
								
								body.school=e.school;
								Toast({
									message: '修改成功',
									duration: 1000
								});
//								this.$router.go(-1);

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
									message: '请选择学校',
									duration: 1000
								});
							}

						}, function() {
							Indicator.close();
							Toast('网络连接错误');
						});
				window.localStorage.schoolInfo = e.target.innerText;
				
				this.$router.go(-1);
			}
		},
		mounted() {
			
		}
		
	}
</script>

<style scoped>
	.comheader {
		height: 3.125rem/* 50/16 */
		;
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
		margin-left: 4rem;
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
		margin-top: 6rem;
		margin-left: 2.6rem;
	}
	
	.quar {
		display: block;
		float: left;
		width: 3rem;
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
		height: 1.333333rem;
		line-height: 1.333333rem;
		text-align: center;
		background: #fff;
		font-size: .48rem;
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
	.search{
		width: 100%;
		height: 2.5rem;
		background: #FFFF;
		position: relative;
		top:3.5rem;
		border-radius: 10rem;
		border: none;
		font-size: 1rem;
	}
	.search-result {
		position: relative;
		top:3rem;
		font-size: 0.8rem;
		overflow-y: auto;
	}
	.schoolInfo {
		height:3rem;
		line-height:3rem;
		background: #fff;
		font-size: 1rem;
		border-bottom: 1px solid #ccc;
	}
</style>