<template>

	<div class="list" ref="list">
    <scroller delegate-id="myScroller" :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">

			<ul>
				<li v-for="item in listDinmond">
					<router-link v-bind="{to:'/mission/missionlist/'+item.id}">
						<div class="mission" >
							<div class="touxiang">
								<div class="img">
									<img  :src="ImgUrl+'/'+item.avatar">
								</div>
							</div>
							<div class="price">
								<span>赏金{{item.bounty || '0'}}</span>
							</div>
							<div class="title">
								<span>
									<img src="../../../statics/imgs/renwudating_29.png" alt="">	
								</span>		
								{{item.title}} 
							</div>
							<div class="tip">
								{{item.desc}}
							</div>
							<div class="time">
								<span class="left">
									<img src="../../../statics/imgs/renwudating_24.png" alt="">
								{{item.time}}
								</span>
								<span class="right">
									<img src="../../../statics/imgs/renwudating_26.png" alt="">
									{{item.schoolName}}
								</span>
							</div>
							<div class="after">
								<img src="../../../statics/imgs/renwudating_21.png" alt="">
							</div>
						</div>
					</router-link>
				</li>
			</ul>
			<div class="guanggao"  ref="close" v-for="item in guanggao" @click="isshow">
				<div class="in">
					<img :src="ImgUrl+'/'+item.icon_name" :alt="item.route">
					
				</div>
			</div>
			<ul>
				<li v-for="item in listTop">
					<router-link v-bind="{to:'/mission/missionlist/'+item.id}">
						<div class="mission">
							<div class="touxiang putong">
								<div class="img">
									<img  :src="ImgUrl+'/'+item.avatar">
								</div>
							</div>
							<div class="price">
								<span>赏金{{item.bounty || '0'}}</span>
							</div>
							<div class="title">
										
								{{item.title}}
							</div>
							<div class="tip">
								{{item.desc}}
							</div>
							<div class="time">
								<span class="left">
									<img src="../../../statics/imgs/renwudating_36.png" alt="">
								{{item.time}}
								</span>
								<span class="right">
									<img src="../../../statics/imgs/renwudating_38.png" alt="">
									{{item.schoolName}}
								</span>
							</div>
							<div class="after">
								<img src="../../../statics/imgs/renwudating_48.png" alt="">
							</div>
						</div>
					</router-link>
				</li>
			</ul>
			<ul>
				<li v-for="item in list">
					<router-link v-bind="{to:'/mission/missionlist/'+item.id+'&'+item.identify}">
						<div class="mission">
							<div class="touxiang putong">
								<div class="img">
									<img id="ptimg" :src="ImgUrl+'/'+item.avatar">
								</div>
							</div>
							<div class="price">
								<span>赏金{{item.bounty || '0'}}</span>
							</div>
							<div class="title">
										
								{{item.title}}
							</div>
							<div class="tip">
								{{item.desc}}
							</div>
							<div class="time">
								<span class="left">
									<img src="../../../statics/imgs/renwudating_36.png" alt="">
								{{item.time}}
								</span>
								<span class="right">
									<img src="../../../statics/imgs/renwudating_38.png" alt="">
									{{item.schoolName}}
								</span>
							</div>
							<div class="after">
								
							</div>
						</div>
					</router-link>
				</li>
			</ul>
			<!-- 广告活动 -->
   			 <lunbo-one :iframe="iframe" @hide-picker="hidePicker" :openurl="openurl"></lunbo-one>
          </scroller>
	</div>
	
</template>

<script>
import LunboOne from "../home/lunboone.vue";//广告页
import "../../kits/jquery.min.js";
import common from "../../kits/common.js"; //api
import { Indicator } from "mint-ui"; //加载动画
import { Toast } from "mint-ui";


import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


export default {
  name: "mission_list",
  components: {
    LunboOne,
  },
  props: {
    newlist:Array
  },
  created() { //加载
    this.getList();},
  mounted() {
     this.$refs.list.style.height = document.documentElement.clientHeight-65+"px";
     this.list = this.newlist;
  },
  data() {
    return {
      token: "",
      page: "1",
      listTop: [],
      list: [],
      listDinmond: [],
      limit: "7", //一次显示多少条
      guanggao: "",
      iframe: false,
      openurl: "",
      ImgUrl:common.apimain,
       //加载
				noData: '',
      // counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      //  num : 5,  // 一次显示多少条
      //  pageStart : 0, // 开始页数
      //  pageEnd : 0, // 结束页数
      //  listdata: [], // 下拉更新数据存放数组
      //  downdata: []  // 上拉更多的数据存放数组
    };
  },
  methods: {
	  //广告
    isshow(e) {
       this.openurl = e.target.alt;
      if(this.openurl!=''){
        this.iframe = true;
      }
      //console.log(this.openurl)
	  },
	   hidePicker() {
      this.iframe = false;
    },
    //加载
    getList() {
      let token = window.localStorage.getItem("token");
      let vm = this;
      vm.page = '1';
      var url = common.apimain + "/api/tasks";
      var json = {
        token: token,
        page_num: "0",
        limit: this.limit
      };
      //console.log(json)
      vm.$http.post(url, json, { emulateJSON: true }, { timeout: 15000 }).then(
        res => {
          // vm.listdata= res.data.slice(0,15);
          //console.log(res.body);
          vm.guanggao = res.body.data.ads;
          //console.log(vm.guanggao)
          if (res.body.code == 1000) {
            vm.list = res.body.data.taskPubs;
            vm.listTop = res.body.data.taskTops;
            vm.listDinmond = res.body.data.taskDinmond;
          } else if (res.body.code == 2000) {
            Toast({ message: res.body.message, duration: 800 });
          } else if(res.body.code == 1013){
               Toast({ message: body.message, duration: 800 });
               vm.$router.push({path:'/loginuser'});
          }else {
            Toast({ message: res.body.message, duration: 800 });
          }
        },
        response => {
          Toast({ message: "网络连接错误，请稍后重试", duration: 800 });
          //console.log('网络连接错误，请稍后重试');
        }
      );
    },
    infinite(loaded) {
        //console.log(this.noData)
      if(this.noData) {
        setTimeout(()=>{
					this.$refs.myscroller.finishInfinite(2);
					//console.log(1)
        })
          return;
      }
        setTimeout(() => {
					  
					  let vm = this;
						let token =window.localStorage.getItem('token');
						var url = common.apimain + '/api/tasks';
						this.page++; 
			 			var json = {
							token:token,
							page_num:this.page,
							limit:this.limit,
						}
						//console.log(json)
            vm.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then((response) => {
                            
							
							let arr = response.body.data.taskPubs;
							//console.log(response.body.data.taskPubs);
                for(var i=0;i<arr.length;i++){
                  let obj = {};
                  //console.log(arr[i])
                  obj['avatar']= arr[i].avatar;
                  obj['bounty']= arr[i].bounty;
                  obj['created_at']= arr[i].created_at;
                  obj['desc']= arr[i].desc;
                  obj['id']= arr[i].id;
                  obj['schoolName']= arr[i].schoolName;
                  obj['time']= arr[i].time;
                  obj['title']= arr[i].title;
                  obj['uid']= arr[i].uid;
    							obj['identify']= arr[i].identify;	
                  vm.list.push(obj);
                  //console.log(obj)
                    if((i + 1) >= response.data.length){
                                vm.noData = '没有数据了'
                          return;
                    }
                }
							
            }, (response) => {
                // console.log('网络连接错误，请稍后重试');
                   Toast({
                            message: '网络连接错误，请稍后重试',
                            duration: 800
                        });
            });
					loaded('done');
					//上啦
        }, 1500)
      
      },
      refresh(loaded) {
      
				 //下拉
				setTimeout(()=> {
			   this.getList();
			   loaded('done');
      	}, 1500)
       
      }

     
    
  },
  watch: {
    newlist(newval,odlval){
      this.list = newval;
    }
  }
};
</script>

<style scoped>
/*bar*/
.two {
  max-width: 40rem;
  min-width: 20rem;
  position: fixed;
  top: 222px;
  width: 100%;
  height: 3.0625rem;
  background-color: #fdfdfe;
  padding-top: 0.75rem;
  padding-left: 0.625rem;
  border-top: 1px solid #cbcbcd;
  border-bottom: 1px solid #CBCBCD;
  z-index: 100;
}
.two span {
  display: inline-block;
  width: 23%;
  text-align: center;
  font-family: "Microsoft Yahei";
  font-size: 0.875rem;
  font-weight: bold;
  color: #000;
  border-right: 1px solid #c8c8c8;
  position: relative;
}
.two span:last-child {
  border: none;
}
/* 任务列表 */
.list {
  padding-top: 6.125rem;
  position: relative;
}
.list .mission:last-child {
  border-bottom: 1px solid #cbcbcd;
}
.list .mission:first-child {
  background-color: rgba(255, 255, 255, 0.4);
}
.mission {
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
  border-top: 1px solid #cbcbcd;
}
.mission .touxiang {
  width: 5rem;
  height: 5rem;
  padding: 0.8125rem 0.8125rem;
  float: left;
}
.mission .touxiang img {
  width: 3.125rem;
  height: 3.125rem;
}
.touxiang .img {
  width: 3.375rem;
  height: 3.375rem;
  border: 2px solid #fdb434;
  border-radius: 1.6875rem;
}
.mission .putong .img {
  border: none;
}
.mission .title {
  display: inline-block;
  width: 40%;
  height: 2rem;
  margin-left: 0.625rem;
  line-height: 2.625rem;
  font-family: "Microsoft Yahei";
  font-size: 0.875rem;
  color: #000;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: -3px;
}
.mission .title img {
  width: 1rem;
  height: 0.6875rem;
}
.mission .tip {
  display: inline-block;
  width: 40%;
  height: 1.1875rem;
  margin-left: 0.625rem;
  font-family: "Microsoft Yahei";
  font-size: 0.625rem;
  color: #9c9c9e;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: -3px;
}
.mission .time {
  display: inline-block;
  width: 40%;
  height: 1.1875rem;
  margin-left: 0.625rem;
  margin-right: 0.625rem;
  font-family: "Microsoft Yahei";
  font-size: 0.625rem;
  color: #9c9c9e;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: -3px;
}
.mission .time img {
  height: 0.875rem;
}
.mission .time .left {
  float: left;
}
.mission .time .right {
  float: right;
}
.mission .price {
  width: 5.625rem;
  height: 5rem;
  float: right;
  padding-top: 1.625rem;
}
.mission .price span {
  font-family: "Microsoft Yahei";
  font-size: 1rem;
  color: #f5532a;
  font-weight: bold;
}
.mission .after img {
  width: 1.8125rem;
  height: 1.5625rem;
  position: absolute;
  top: 0;
  right: 0.75rem;
}

/*广告*/
.guanggao {
  width: 100%;
  height: 4.9375rem;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
  padding-left: 0.125rem;
  border-top: 1px solid #cbcbcd;
  padding-top: 0.125rem;
  background-color: rgba(255, 255, 255, 0.4);
}
.guanggao .in {
  width: 90%;
  position: relative;
  margin-left: 5%;
}
.guanggao .in img {
  width: 100%;
  height: 4.625rem;
}
.guanggao .close img {
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
  top: 5px;
  right: 10px;
}

._v-container{
		margin-top: 99px;
	}
</style>