<template>
	<div id="tmpld" ref="tmpld">
		<com-header :title="title"></com-header>
		<section class="usermod_top">
			<section class="main">
				<div class="sigin_top">
					<div class="top_left">
						<p>今日增加活跃值</p>
						<h1>+{{activevalue}}</h1>
						<p>累计活跃值：<span>{{user_active_value}}</span></p>
					</div>
					<div class="top_center">
						<div class="center_one">
							<p>累计签到</p>
							<h2>{{daynum}}<span>天</span></h2>
						</div>	
						<div class="center_two">
							<ul class="contentcontent_list">
								<li class="clearfix">
									 <p class="con" v-if="if_recive==1">已领奖</p>
									 <p class="con" v-else-if="if_recive==2"><img src="../../../statics/imgs/PERSONNAL-CENTRAL_44.png"/></p>
									 <p class="bg">
										<span id="" class="bg_one"></span>
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_67.png"/>
										<span id="" class="bg_three"></span>
									</p>
									<p class="date">累计7天</p>
								</li>
								<li  class="clearfix">
									<p class="con">
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_44.png"/>
									</p>
									<p class="bg">
										<span id="" class="bg_one"></span>
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_67.png"/>
										<span id="" class="bg_three"></span>
									</p>
									<p class="date">14天</p>
								</li>
								<li class="clearfix">
									<p class="con">
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_44.png"/>
									</p>
									<p class="bg">
										<span id="" class="bg_one"></span>
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_67.png"/>
										<span id="" class="bg_three"></span>
									</p>
									<p class="date">21天</p>
								</li>
								<li class="clearfix">
									<p class="con">
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_44.png"/>
									</p>
									<p class="bg">
										<span id="" class="bg_one"></span>
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_67.png"/>
										<span id="" class="bg_three"></span>
									</p>
									<p class="date">50天</p>
								</li>
								<li class="clearfix">
									<p class="con">
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_44.png"/>
									</p>
									<p class="bg">
										<span id="" class="bg_one"></span>
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_67.png"/>
										<span id="" class="bg_three"></span>
									</p>
									<p class="date">100天</p>
								</li>
								<li class="clearfix">
									<p class="con">
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_44.png"/>
									</p>
									<p class="bg">
										<span id="" class="bg_one"></span>
										<img src="../../../statics/imgs/PERSONNAL-CENTRAL_67.png"/>
										<span id="" class="bg_three"></span>
									</p>
									<p class="date">150天</p>
								</li>
							</ul>
						</div>
						<div class="center_three">
							<button>{{sigin}}</button>
							<p>每日签到加5金币加10活跃值</p>
						</div>
						<div></div>
					</div>
					<div class="top_right">
						<p>您有<span>{{patch_card_num}}</span>张补签卡</p>
					</div>		
				</div>
				<div class="sigin_center">
					<p class="sigin_center">活动起止日期：{{begin_date}}~{{end_date}}</p>
				</div>
				

			</section>
			
			<div class="no_content" v-if="no">
				还没有内容哦
			</div>
		</section>	
		
	</div>
	
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import comHeader from '../../kits/comheader';
	import common from '../../kits/common.js';//api
	let today = new Date();
//	console.log(today)
	export default{
		name:'tmpld',
		data(){
			return{
				title:'签到奖励',
				activevalue:'0',
				user_active_value:null,
				patch_card_num:'0',
				daynum:'0',
				sigin:'已签到',
				begin_date:null,
				end_date:null,
				if_recive:2,
				// 日历
				currentDay: 1,
				currentMonth: 1,
				currentYear: 1970,
				currentWeek: 1,
				days: [],
				arrDate: [],
				nowday:'',
				no:false,
			}
		},
		components:{
			comHeader, 
		},
		created: function() {  //在vue初始化时调用
            this.initData(null);
        },
        methods: {
            initData: function(cur) {
				var leftcount=0; //存放剩余数量
				var nowday= new Date().getDate();
				
				//console.log(nowday)
                var date;
                if (cur) {
                 	//console.log(cur)
                    date = new Date(cur);
                } else {
					var now=new Date();	
                    var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
                    d.setDate(42);
                    date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                }
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;
				 this.nowday = nowday;
                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (var i = this.currentWeek - 1; i >= 0; i--) {
					var d = new Date(str);
					
                    d.setDate(d.getDate() - i);
                    var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
					dayobject.day=d;
					//console.log(dayobject.day)
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (var i = 1; i <= 42 - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject={};
                    // dayobject.day=d;
                    dayobject = {day: d,isSign: this.isVerDate(d.getDate())}
                    this.days.push(dayobject);
                }
            },
            isVerDate (v) {
                return this.arrDate.includes(v)
            },
            pickPre: function(year, month) {

                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                var d = new Date(this.formatDate(year , month , 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickNext: function(year, month) {
                var d = new Date(this.formatDate(year , month , 1));
                d.setDate(42);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickYear: function(year, month) {
                alert(year + "," + month);
            },

            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function(year,month,day){
                var y = year;
                var m = month;
                if(m<10) m = "0" + m;
                var d = day;
                if(d<10) d = "0" + d;
                return y+"-"+m+"-"+d
            },


        },
		mounted(){
			
			var _this=this;
			let token = window.localStorage.getItem('token');
//			console.log(token)
			let page=_this.page;
			let per_page=5;
			var url = common.apimain + '/api/sign/record?token='+token+'&page='+page+'&per_page='+per_page;
			Indicator.open();
			_this.$http.get(url).then(res=>{
//                console.log(res.data);
			  var body=res.data.data;
			   if(res.data.code==1000){
					Indicator.close();
					Toast({
						message: '加载完成',
						duration: 1000
					});
					_this.begin_date=body.begin_date;
					_this.end_date=body.end_date;
					_this.user_active_value=body.user_active_value;
					_this.patch_card_num=body.patch_card_num;
					_this.activevalue=body.add_active_value;
					_this.daynum=body.sign_days;
					_this.daynum=body.sign_days;
					// _this.arrDate=body.date.record;
					// _this.if_recive=body.if_recive;
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
	.usermod_top{
		padding-top: 3.125rem /* 50/16 */;
	
	}
	.sigin_top{
		width:100%;
		padding:0 3%;
		background: rgba(255,255,255,0.1);
		position: relative;
	}
	.top_left{
		position: absolute;
		left: 3%;
		top:0;
	}
	.top_left p{
		color:#507AB2;
		font-size:.625rem /* 10/16 */;
	}
	.top_left h1{
		font-size:1.125rem /* 18/16 */;
		font-weight:900;
		color:#FE5A4D;
	}
	.top_right{
		position: absolute;
		right: 3%;
		top:0;
	}
	.top_right p{
		color:#fff;
		font-size:.625rem /* 10/16 */;
	}
	.top_center{
		padding-top:20px;
	}
	.center_one{
		width:7.5rem /* 120/16 */;
		height:7.5rem /* 120/16 */;
		background:url(../../../statics/imgs/PERSONNAL-CENTRAL_106.png) no-repeat top left scroll;
		background-size:cover;
		border-radius:4rem /* 18/16 */;
		margin:0 auto;
		overflow: hidden;
		
		text-align: center;
		color:#507AB2;
	}
	.center_one p{
		height:1.875rem /* 30/16 */;
		font-size:.75rem /* 12/16 */;
		border-bottom: 1px solid #E5E5E5;
		color:#507AB2;
		margin:1.25rem /* 20/16 */ 0 .625rem /* 10/16 */ ;
	}
	.center_one h2{
		font-size:1.5rem /* 24/16 */;
		font-weight:900;
	}
	.center_one h2>span{
		display:inline-block;
		font-size:.75rem /* 12/16 */;
	}
	.contentcontent_list{
		display: flex;
		margin: .625rem /* 10/16 */ auto .875rem /* 14/16 */;
		padding: 0;
		list-style: none;
    }
	.content_list li {
		padding: 5px 0;
		width: 62px;
		font-size: 14px;
		line-height: 21px;
	}
		
	.date {
		color: #153C77;
		text-align: center;
		overflow: hidden;
		min-height: 20px;
		font-size: 12px;
	}
	.con {
		height: 28px;
		color: #A19899;
		margin-left: 10px;
		padding-top: .625rem /* 10/16 */;
	}  
	.con img{
		margin-left: 10px;
		margin-top: -10px;
		width: 20px;
		height: 28px;
	}
	.bg {
		height: 9px;
		width: 62px;            
		padding-top: 6px;
		display: flex;
		margin: 5px 0;
		} 
	.bg img{
		display: block;
		height: 15px;
		width: 15px;
		margin-top: -6px;
	}
	.bg span{
		display: block;
		width: 26px;
		height: 3px;
		background: #21457D;
	}  
	.clearfix:first-child .bg_one{  
		background: transparent;
	}  
		.clearfix:last-child .bg_three{  
		background: transparent;
	} 


	.center_three button{
			width:35%;
			height:2.1875rem /* 35/16 */;
			font-size:.875rem /* 14/16 */;
			background:#4171AE;
			color:#fff;
			margin:0 auto;
	}
	.center_three{
		text-align: center;
	}
	.center_three p{
		color:#4F71A3;
		font-size:.75rem /* 12/16 */;
	}

	.sigin_center{
		width:100%;
		height:2.5rem /* 40/16 */;
		text-align: center;
		color:#9B9293;
		background:#fff;
		line-height: 2.5rem /* 40/16 */;
		font-size:.75rem /* 12/16 */;
		margin-top:.625rem /* 10/16 */;
	}
	/*日历 */
	  #calendar{
            width:100%;
            margin: .625rem /* 10/16 */ auto 0;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
			 background: #fff;
        }
        .month {
            width: 100%;
			padding:0 30%;
        }

        .month ul {
            margin: 0;
            height: 2.5rem /* 40/16 */;
			line-height: 2.5rem /* 40/16 */;
            display: flex;
            justify-content: space-between;
			
        }
		.month ul li {
            color: #FF6352;
          font-size: .75rem /* 12/16 */;
        }

        .year-month {
            color: #00B8EC;
        }

        .year-month:hover {
            background: rgba(150, 2, 12, 0.1);
		}
        .arrow:hover {
            background: rgba(100, 2, 12, 0.1);
        }

        .weekdays {
            margin: 0;
            padding: 10px 0;
            display: flex;
            flex-wrap: wrap;
            color: #7D7474;
            justify-content: space-around;
			font-size:.75rem /* 12/16 */;
        }

        .weekdays li {
            display: inline-block;
            width: 13.6%;
            text-align: center;
        }

        .days {
            padding: 0;
            background: #FFFFFF;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .days li {
            list-style-type: none;
            display: inline-block;
            width: 14.2%;
            text-align: center;
            padding-bottom: .5625rem /* 9/16 */;
            font-size: .75rem /* 12/16 */;
            color: #000;
        }

        .days li .active {
			width: 1.5625rem /* 25/16 */;
			height: 1.5625rem /* 25/16 */;
			display: block;
            margin: 0 auto;
            border-radius: 50%;
			border: 1px solid  #39598B;
		}
		.days li .taday {
			width: 1.5625rem /* 25/16 */;
			height: 1.5625rem /* 25/16 */;
			display: block;
            margin: 0 auto;
            border-radius: 50%;
			border: 1px solid  #39598B;
			background: #527CB3;
			color: #fff;
        }

        .days li .other-month {
            padding: 5px;
            color: gainsboro;
        }

        .days li:hover {
            background: #e1e1e1;
        }
	
	.no_content{
		text-align:center;
		font-size:1.125rem /* 18/16 */;
		margin-top:60%;
		color:red;
	}
	
</style>