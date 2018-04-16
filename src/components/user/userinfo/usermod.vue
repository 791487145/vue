 <template>
    <div id="" ref="tmpld">
        <com-header :title="title"></com-header>
        <section class="main">
            <section>
                <section class="main_main">
                    <section class="list_style">
                        <h2>头像</h2>
                        <img :src="headUrls+'/'+this.head_img" class="header_image"/>
                        <photo-view></photo-view>
                        
                    </section>
                    <router-link to="/user/usermod/alter_content">
                        <section class="list_style">
                            <h2>昵称</h2>
                            <p>{{content || "去设置昵称"}}</p>
                        </section>
                    </router-link>
                    <router-link to="/user/per_info/authen_info">
                        <section class="list_style">
                            <h2>姓名</h2>
                            <p id="pname" :value="content">{{realname || "去设置姓名"}}</p>
                        </section>
                    </router-link>
                    <router-link to="/user/usermod/autograph">
                        <section class="list_style">
                            <h2>个性签名</h2>
                            <p>{{autograph || "去设置个性签名"}}</p>
                        </section>
                    </router-link>
                    <router-link to="">
                        <section class="list_style" @click="handleClick">
                            <h2>性别</h2>
                            <p>{{list || "去设置性别"}}</p>
                        </section>
                    </router-link>
                    <mt-popup v-model="popupVisible" position="bottom" class="sex_box">
	                    	<input class="sex_boy" @click="handleSexBoy" value="男" v-model="sex_cn2">
	                    	<input class="sex_girl" @click="handleSexGirl" value="女" v-model="sex_cn1">
					</mt-popup>
                </section>
                <section class="main_main">
                        <section class="list_style" @click="handleAgeClick">
                            <h2>年龄</h2>
                            <p>{{year_old || "去设置年龄"}}</p>     
                        </section>
                        <mt-popup v-model="ageVisible" position="bottom" :closeOnClickModal=true class="age_box">
	                    		<ul v-for = "n in 100">
	                    			<li class="age" @click="handleNumberClick">{{n}}</li>
	                    		</ul>
							</mt-popup>
                        <section class="list_style" >
                            <h2>生日</h2>
                            <p class="showBir">{{birthday || "去设置生日"}}</p>
                             <div class="block">
								    <el-date-picker
								      v-model="birthday"
								      type="date"
								      placeholder="选择日期"
								      class="birthdayDay"
								      @change="getTime"
								      value-format="yyyy-MM-dd">
								    </el-date-picker>
  							</div>
                        </section>
                    <router-link to="/user/userinfo/native">
                        <section class="list_style">
                            <h2>籍贯</h2>
                            <p>{{native_place || "去设置籍贯"}}</p>
                        </section>
                    </router-link>
                    <router-link to="/user/userinfo/area_school">
                        <section class="list_style">
                            <h2>区域及学校</h2>
                            <p>{{searchKey || "去设置学校"}}</p>
                        </section>
                    </router-link>
                    <router-link to="/user/userinfo/major">
                        <section class="list_style">
                            <h2>专业</h2>
                            <p>{{majors || "去设置专业"}}</p>
                        </section>
                    </router-link>
                    <router-link to="/user/userinfo/systemclass">
                        <section class="list_style">
                            <h2>系及班级</h2>
                            <p>{{system || "去设置"}}系{{classS || "去设置"}}班</p>
                        </section>
                    </router-link>
                </section>
               
            </section>
        </section> 
    </div>
</template>

<script>
    import "../../../kits/jquery.min.js"
    import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
    import common from '../../../kits/common.js';//api
    import PhotoView from '../../../kits/photoview.vue';
    import bus from '../../../kits/bus.js';
    import comHeader from '../../../kits/comheader';
    export default {
        data(){
            return{
                title:'个人信息',
                content:'',    //用户名
                userInfo:true,
                username:'',
                realname:'',
                autograph:'',
                year_old:'',
                searchKey:'',
                popupVisible:false,
                ageVisible:false,
                sex:'',
                sex_cn1:'女',
                sex_cn2:'男',
                list:'',
                birthday:'',
                majors:'',
                native_place:'',
                classS:'',
                system:'',
                headerImage:'',
                picValue:'',
                head_img:'',
                ageStore:[],
                headUrls:common.apimain
            }
        },

        components: {
          PhotoView,
          "com-header":comHeader,
        },
        computed:{
        	
         
        },
        created(){
 //       	this.searchKey = body.school_name;
//      	bus.$emit('school_name',this.searchKey);
//			bus.$on('namereal',(val)=>{
 //               this.realname = val;
//				console.log(val);
//            });
        },
        methods: {
            touser(){
				this.$router.push({path:'/user/per_info'})
			},
			handleClick() {
				this.popupVisible = true
			},
			handleSexBoy() {
				var _this = this;
						let token = window.localStorage.getItem('token');
//						console.log(token);
						var url = common.apimain + '/api/user/updateSex';
						var json = {
							token: token,
							sex: 2
						}
//						console.log(json);
						_this.$http.post(url, json, {
							emulateJSON: true
						}, {
							timeout: 5000
						}).then(res => {
//							console.log(res.data);
							var body = res.data.data;
							if(res.data.code == 1000) {
								Indicator.close();
								_this.list = body.sex;
								this.popupVisible = false

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
									message:body.message,
									duration: 1000
								});
							}

						}, function() {
							Indicator.close();
							Toast('网络连接错误');
						});
			},
			handleSexGirl() {
						var _this = this;
						let token = window.localStorage.getItem('token');
//						console.log(token);
						var url = common.apimain + '/api/user/updateSex';
						var json = {
							token: token,
							sex: 1
						}
//						console.log(token);
						_this.$http.post(url, json, {
							emulateJSON: true
						}, {
							timeout: 5000
						}).then(res => {
//							console.log(res.data);
							var body = res.data.data;
							if(res.data.code == 1000) {
								Indicator.close();
								_this.list = body.sex;
								//this.$router.go(-1);
								this.popupVisible = false

							} else if(res.data.code == 1013) {
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
									message: '加载失败',
									duration: 1000
								});
							}

						}, function() {
							Indicator.close();
							Toast('网络连接错误');
						});
			},
			 getTime(val){
          			this.birthday = val;
       		},
       		handleAgeClick() {
       			this.ageVisible = true
       		},
       		handleNumberClick(e) {
       			var _this=this; 
				let token = window.localStorage.getItem('token');
				var url = common.apimain + '/api/user/updateYearOld';
				var json = {
					token:token,
					year_old:e.target.innerHTML,
				}
				var _this=this;
				_this.$http.post(url,json,{emulateJSON: true},{timeout:5000}).then(res=>{
//					console.log(res.data);
					var body=res.data.data;
					if(res.data.code==1000){
							_this.year_old=body.year_old;
							this.ageVisible = false;
							this.$router.push({path:'/user/per_info/usermod'})
							
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

       		}
			
        },
        watch: {
        	birthday(newval) {
//       		console.log(newval)
        		if(newval!==null) {
        			var _this=this; 
				let token = window.localStorage.getItem('token');
				//console.log(token)
				var url = common.apimain + '/api/user/updateBirthday';
				var json = {
					token:token,
					birthday:this.birthday,
				}
				var _this=this;
				_this.$http.post(url,json,{emulateJSON: true},{timeout:5000}).then(res=>{
//					console.log(res.data);
					var body=res.data.data;
					if(res.data.code==1000){
							_this.birthday=body.birthday;
							this.$router.push({path:'/user/per_info/usermod'})
							//console.log(123)
							
					}else if(res.data.code==1013){
							Indicator.close();
							Toast({
								message: '登录过期',
								duration: 1000
							});
							this.$router.push({path:'/loginuser'})
					}else{
//							console.log(123)
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
        		}
        },
        ageVisible(newvals,val) {
        	console.log(newvals,val)
        }
        },
        mounted(){
            var _this=this;
            let token = window.localStorage.getItem('token');
//            console.log(token)
            var url = common.apimain + '/api/user/getUserInfo?token='+token;
            _this.$http.get(url).then(res=>{
//                console.log(res.data);
                var body=res.data.data;
                if(res.data.code==1000){
                        Indicator.close();
                        _this.content=body.nickname;
                        _this.realname=body.realname;
                        _this.autograph=body.autograph;
                        _this.list=body.sex;
                        if(_this.list == 2){
                        	_this.list='男'
                        }else{
                        	_this.list='女'
                        }
                        _this.year_old=body.year_old;
                        _this.birthday=body.birthday;
                        _this.majors=body.majors;
                        _this.native_place=body.native_place;
                        _this.system=body.system;
                        _this.classS=body.classS;
                        _this.head_img=body.head_img;
                        _this.searchKey=body.school;
                        _this.year_old=body.year_old;
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

			this.$refs.tmpld.style.height = document.documentElement.clientHeight+"px";
		}
    }
</script>

<style scoped>
	a {
    	text-decoraction: none;
	}
	a:hover, a:visited, a:link, a:active {
     	color:#DCDBE2;
	}
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


   .main{
       padding-top: 3.125rem /* 50/16 */;
   }
   .list_style{
       display: flex;
       justify-content: space-between;
        height:3.5rem /* 42/16 */;
		border-bottom:1px solid #DCDBE2;
        line-height:3.5rem /* 42/16 */;
        padding: 0 5%;
        background: #fff;
        position: relative;
   }
   
   .list_style h2{
       line-height:3.5rem /* 42/16 */;
       font-size: .9rem /* 14/16 */;
       color:#484848;
       width:5rem;
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

   .sex_box {
   		width: 100%;
   		height: 8rem;
   }
    .age_box {
   		width: 100%;
   		height: 10rem;
   }
   .age_choice {
   		height:2rem;
   		width: 100%;
   		line-height: 2rem;
   		text-align: center;
   		border: none;
   }
   .sex_boy {
   		height:3rem;
   		width: 100%;
   		line-height: 3rem;
   		text-align: center;
   		border: none;
   }
   .sex_girl {
   		height:3rem;
   		width: 100%;
   		line-height: 3rem;
   		text-align: center;
   		border: none;
   }
   .age {
   		height:2rem;
   		width: 100%;
   		line-height: 2rem;
   		text-align: center;
   		border: none;
   		font-size: 1.375rem;
   }
   .sex_choice {
   		height:2rem;
   		line-height: 3rem;
   		display: flex;
 		justify-content: space-around;
   }
   .send_headpicture {
   		padding: 0;
   }
   .header_image {
   		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		border: 1px solid #d5d5d5;
		overflow: hidden;
		position: absolute;
		right:3.66rem;
   }
   .birthdayDay {
   		opacity: 0;
   		border: none;
   }
   .showBir {
   		position: absolute;
   		right: 1rem;
   }
   .age_box {
   		width: 100%;
   		height: 8rem;
   		text-align: center;
   		overflow-y: auto;
   }
</style>
