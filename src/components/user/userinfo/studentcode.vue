 <template>
    <div ref="tmpld" class="wid">
           <com-header :title="title" :save="save" @show_save="saveBirthday"></com-header>
		
			<div class="modifyName">
				<p class="modefyName_warn">请确保身份真实有效，否则无法通过审核</p>
                <p class="modifyName_realName"><span class="realName">真实姓名</span><input type="text" id="realname" placeholder="请输入您的真实姓名" v-model="realname"/></p>
                <p class="modifyName_IDcard"><span class="IDcard">学生证号码</span><input type="text" id="idcard" placeholder="请输入您的学生证号" v-model="student_number"/></p>
            </div>
            <div class="IDcard_area">
            	<p class="please_picture">请上传学生证个人信息照片</p>
            	
            	<div class="IDcard_front">
            		<img :src="stuUrl+'/'+this.student_id_card" class='id_front'/>
            		<idcard-photo></idcard-photo>	
            	</div>
            	<p class="front_picture">请上传学生证照片</p>
            	
            </div>
       	 	<div class="button_style">
       			 <button class="submit_review divcssss" @click="submit_revi">提交审核</button>
       			 <button class="submit_success divcssss">已认证</button>
       	 	</div>
	</div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
	import common from '../../../kits/common.js';//api
    import comHeader from '../../../kits/comheader';
    import original from './original_secucode';
    import update from './update_secucode';
    import IdcardPhoto from '../../../kits/IDcardPhoto.vue';
    import bus from '../../../kits/bus.js';
    export default {
        data(){
            return{
                title:'学生证认证',
                realname:'',
                student_number:'',
                student_id_card:'',
                isshow:false,
                avatar:'',
                headerImg:'',
                stuUrl:common.apimain
            }
        },

        components: {
            "com-header":comHeader,
            original,
            update,
            IdcardPhoto
        },
        computed:{
         
        },
        created(){
           bus.$on('id-selected',(val)=>{
                this.student_id_card = val;
                if(this.student_id_card = val) {
                	$(".id_front").css("display","block");
                }
//				console.log(this.student_id_card);
           });
        },
        methods: {
            touser:function(){
                this.$router.go(-1);
        },
        
        submit_revi () {
				var _this=this; 
				let token = window.localStorage.getItem('token');
				var url = common.apimain + "/api/auth/studentAuth";
				var json = {
					token:token,
					student_number:this.student_number,
					student_id_card:this.student_id_card	
				}
				var _this=this;
				_this.$http.post(url,json,{emulateJSON: true},{timeout:5000}).then(res=>{
					var body=res.data.data;
					console.log(res.data)
					if(res.data.code==1000){
							_this.realname=body.realname;
							_this.student_number=body.student_number;
							_this.student_id_card=body.student_id_card;
							Toast({
								message: res.data.message,
								duration: 1000
							});
							$(".submit_review").css('display','none');
							$(".submit_success").css('display','block');
							
					}else if(res.data.code==1013){
							Toast({
								message: '登录过期',
								duration: 1000
							});
							this.$router.push({path:'/loginuser'})
					}else{
							Indicator.close();
							Toast({
								message: res.data.message,
								duration: 1000
							});
					}				
					
				},function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接错误');
				})
         }
    },
         mounted(){
				var _this=this; 
				let token = window.localStorage.getItem('token');
				var url = common.apimain + "/api/auth/studentCardInfo";
				var json = {
					token:token,
					student_number:this.student_number,
					student_id_card:this.student_id_card	
				}
				var _this=this;
				_this.$http.post(url,json,{emulateJSON: true},{timeout:5000}).then(res=>{
					console.log(res.data)
					var body=res.data.data;
					if(res.data.code==1000){
							_this.realname=body.realname;
							_this.student_number=body.student_number;
							_this.student_id_card=body.student_img;
							$(".submit_review").css('display','none');
							$(".submit_success").css('display','block');
							$(".IDcard_area").css('display','none');
					}else if(res.data.code==1013){
							Toast({
								message: '登录过期',
								duration: 1000
							});
							this.$router.push({path:'/loginuser'})
					}else{
							Toast({
								message: res.data.message,
								duration: 1000
							});
					}				
					
				},function(){
					//console.log('失败了');
					Indicator.close();
					Toast('网络连接错误');
				});
		}
}
</script>

<style scoped>
	.width {
		max-width: 20rem;
	}
	.comheader {
		height: 3.125rem/* 50/16 */
		;
		width: 100%;
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
    #realname {
    	display: inline;
    	border: none;
    	font-size: 0.88rem;
    	width:10rem;
    	height:2rem;
    	margin-top: 0.4rem;
    }
    #idcard {
    	display: inline;
    	border: none;
    	font-size: 0.88rem;
    	width:12rem;
    	height:2rem;
    	margin-top: 0.4rem;
    }

    .left{
        font-size: .75rem /* 12/16 */;
        color: #fff;
        line-height: 3.125rem /* 50/16 */;
        float: left;
        margin-left: 1.375rem /* 22/16 */;
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
		margin-left: 5rem;
		float: left;
	}
    .right{
        float: right;
        font-size: .75rem /* 12/16 */;
        color: #fff;
        line-height: 3.125rem /* 50/16 */;
	}
	.right>img{
		width: 100%;
        width: 1.25rem /* 20/16 */;
		height:1.25rem /* 20/16 */;
		margin:-2px 0.875rem /* 14/16 */;

        z-index: 110;
	}
    /* 内容区 */
	section{
		/* padding-top: 3.125rem 50/16; */
    }
    .modifyName{
        width:100%;
        position: relative;
		top: 4.4rem;
        height:7rem /* 40/16 */;
        border:none;
		padding-left: .625rem /* 10/16 */;
		background: #FFF;
    }
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin-top:60%;
		color:red;
	}
	.modefyName_warn {
		font-size: 0.68rem;
		color:#bbbbbb;
		border-bottom: 1px solid #eff0f2;
		height: 1.88rem;
		line-height: 1.88rem;
	}
	.modifyName_realName{
		height:2.5rem;
		line-height: 2.5rem;
		color:#1e1f21;
		font-size: 0.88rem;
		font-weight: bold;
		border-bottom: 1px solid #eff0f2;
	}
	.modifyName_IDcard{
		height:2.5rem;
		line-height: 2.5rem;
		color:#1e1f21;
		font-size: 0.88rem;
		font-weight: bold;
	}
	.realName {
		padding-right: 3.24rem;
	}
	.IDcard {
		padding-right: 2.38rem;
	}
	.IDcard_area {
		height:15rem;
		background: #FFF;
		position: relative;
		top:6rem;
		display: block;
	}
	.please_picture {
		height:2.2rem;
		line-height: 2.2rem;
		border-bottom: 1px solid #eff0f2;
		padding-left: 0.4rem;
		color: #a1a1a1;
	}
	.IDcard_front {
		height:6.4rem;
		width:8.9rem;
		border:1px solid #e3e3e3;
		border-radius: 0.18rem;
		margin: 2rem auto;
		background-image:url(../../../../statics/imgs/id_front.png),url(../../../../statics/imgs/xinxixiugai_32.png);
		background-repeat: no-repeat, no-repeat;  
		background-size: 3.6rem 2.4rem,0.8rem 0.8rem;
		background-position: 2.68rem 1.7rem,4.06rem 4.68rem;
		position: relative;
	}
	.IDcard_opposite {
		height:6.4rem;
		width:8.9rem;
		border:1px solid #e3e3e3;
		border-radius: 0.18rem;
		margin:5rem auto 2rem auto;
		background-image:url(../../../../statics/imgs/id_opposite.png),url(../../../../statics/imgs/xinxixiugai_32.png);
		background-repeat: no-repeat, no-repeat;  
		background-size: 3.6rem 2.4rem,0.8rem 0.8rem;
		background-position: 2.68rem 1.7rem,4.06rem 4.68rem;
		position: relative;
	}
	.front_picture {
		margin: 0.2rem auto;
		color:#a1a1a1;
		font-size: 0.625rem;
		position: absolute;
		width:100%;
		height:1rem;
		text-align: center;
	}
	.opposite_picture {
		position: absolute;
		color:#a1a1a1;
		font-size: 0.625rem;
		width:100%;
		height:1rem;
		text-align: center;
	}
	.submit_review {
		width:18.375rem;
		height:2.96rem;
		display: block;
	}
	.submit_success {
		width:18.375rem;
		height:2.96rem;
		position: absolute;
		left: 0;
		top: 0;
		display: none;
	}
	.id_front {
		height:6.4rem;
		width:8.9rem;
		position: absolute;
		display: none;
	}
	.id_back {
		height:6.4rem;
		width:8.9rem;
		position: absolute;
		display: none;
	}
	.button_style {
		width:18.375rem;
		height:2.96rem;
		margin: 8rem auto;	
		position: relative;
	}
</style>
