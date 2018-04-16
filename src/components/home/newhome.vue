<template>
    <div id="action">
            <mt-navbar v-model="selected" :fixed="true">
                <mt-tab-item  v-for="item in list" :id="item.id" :key="item.id">{{item.name}}</mt-tab-item>
            </mt-navbar>
             
      <!-- 任务搜索分类栏    -->
      <div class="rw_tools" v-if="rw_tools_show">
          <div class="rw_search">
              <img src="../../../statics/imgs/SJLM_v0.12_HomePage_Mission_Icon_Search.png" alt="">
              全网搜
          </div>
          <div class="rw_pc">
            <div class="rw_place">
                <img src="../../../statics/imgs/SJLM_v0.12_HomePage_Mission_Icon_location(gray).png" alt="">
                山西大学
            </div>
            <div class="rw_category">
                <img src="../../../statics/imgs/SJLM_v0.12_HomePage_Mission_Icon_type(gray).png" alt="">
                游戏类
            </div>
          </div>
      </div>
            
        
	<div class="UserAdd" @click="addtip">+</div>
        <div ref="newhome_list" class="newhome_list">
         <!-- tab-container -->
          <scroller delegate-id="myScroller" :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
            <mt-tab-container v-model="selected" :swipeable="true">
                <mt-tab-container-item v-for="item in list" :id="item.id" :key="item.id" >
                    
                    <ul>
                        <li class="templet_div" v-for="item in news" :key="item.id">
                           
                                
                            <!-- 文字模板 -->
                            
                            <p class="templet_contone" v-if="item.type == 1">
                                {{item.title}}
                                <br />
                            <button class="templet_button" v-if="item.hot">{{item.hot}}</button>
                            <span class="templet_spanone">{{item.from}}&nbsp;&nbsp;{{item.comment_num}}评论&nbsp;&nbsp;{{item.created_at}}</span>
                            
                            </p>
                            
                            
                            
                            
                            <!-- 左文右图模板 -->
                            
                            <div class="templet_conttwo" v-else-if="item.type == 2">
                                <p class="templet_contfive">
                                    <span class="templet_spantwo">
                                    {{item.title}}
                                    </span>
                                    
                                </p>
                                
                                <button class="templet_button" v-if="item.hot">{{item.hot}}</button>
                                <span class="templet_spanthree">{{item.where}}&nbsp;&nbsp;{{item.comment_num}}评论&nbsp;&nbsp;{{item.created_at}}</span>
                                
                                <img :src="ImgUrl+'/'+item.thumb_pic_1" class="templet_img"/>
                            </div>
                            
                            
                            <!-- 上文下三图模板 -->
                            
                            <div class="templet_contthree"  v-else-if="item.type == 3">
                                <span class="templet_spanfour">
                                    {{item.title}}
                                </span>
                                <img :src="ImgUrl+'/'+item.thumb_pic_1" class="templet_imgone"/>
                                <img :src="ImgUrl+'/'+item.thumb_pic_1" class="templet_imgtwo"/>
                                <img :src="ImgUrl+'/'+item.thumb_pic_1" class="templet_imgthree"/>
                                <p class="clear"></p>
                                <span class="templet_spanfive">{{item.where}}&nbsp;&nbsp;{{item.comment_num}}评论&nbsp;&nbsp;{{item.created_at}}</span>
                            </div>
                            
                            
                            <!-- 大图模板 -->
                            <p class="templet_contfour"  v-else-if="item.type == 4">
                                <span class="templet_spansix">
                                    {{item.title}}
                                </span>
                                <img :src="ImgUrl+'/'+item.thumb_pic_1" class="templet_imgfour"/>
                                <span class="templet_spanseven">无限模式限免</span>
                                <button class="templet_go">立即下载</button>
                                <button class="templet_ad">广告</button>
                                <span class="templet_spaneight">全民塔防线&nbsp;&nbsp;{{item.created_at}}</span>
                            </p>
                            <!-- 任务模板 -->
                            <div class="mission_list" v-else-if="item.type == 5">
                                 <router-link v-bind="{to:'/mission/missionlist/'+item.id+'&'+item.identify}">
                                <div class="head">
                                    <img :src="ImgUrl+'/'+item.avatar" alt="">
                                    <span class="username">{{item.username}}</span>
                                    <span class="time">	{{item.created_at}}</span>
                                    <div class="mission_price">
                                        ￥{{item.bounty || '0'}}
                                   </div>
                                </div>
                                <div class="mission_con">
                                
                                        	{{item.title}}
                                
                                </div>
                                <div class="mission_foot">
                                    <img src="../../../statics/imgs/SJLM_v1.2_home_icon_location.png" alt="">
                                    <span class="place">{{item.schoolName}}</span>
                                    <span class="type">{{item.task_cate_name}}</span>
                                </div>
                                </router-link>
                            </div>
                            
                        </li>
                    </ul> 
                    
                </mt-tab-container-item>
            
            </mt-tab-container>
          </scroller>
          </div>
            <mt-popup v-model="addtipshow" position="right" class="AddTip">
               <div  class="divcss pophead">
                  <img src="../../../statics/imgs/jiantou-1.png" alt="" @click="addtip">
                   兴趣标签
                </div>
                <div class="user">
                    <h3>已选标签</h3>
                    <span v-for="item in list" :key="item.id" @click="deltip" :id="item.id">
                        {{item.name}}
                        <img src="../../../statics/imgs/SJLM_V1.0_news_tips_icons_del.png" alt="" >
                    </span>
                </div>
                 <div class="alltip">
                    <h3>推荐标签</h3>
                    <span v-for="item in alllist" :key="item.id" @click="pushtip" :id="item.id">
                        {{item.name}}
                        <img src="../../../statics/imgs/SJLM_V1.0_news_tips_icons_add.png" alt="" >
                    </span>
                </div>
            </mt-popup>
            <footer-click></footer-click>
        </div>

</template>
<script>
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import { Cell } from "mint-ui";
import "../../kits/jquery.min.js";
import common from "../../kits/common.js";
import { Navbar, TabItem } from "mint-ui";
import { TabContainer, TabContainerItem } from "mint-ui";
import footer from "../../kits/common/footer";
import { Popup } from "mint-ui"; //用户自定义标签
export default {
  name: "action",
  data() {
    return {
      rw_tools_show:false,//任务工具栏显示控制
      selected: 7,
      addtipshow:false,
      newval: 3,
      left: 0,
      content:'1',
      bar_width:"",
      url:"",//获取的接口
      number: 0,
      ImgUrl:common.apimain,
      	noData: '',
      list: [],
      alllist: [
        { name: "选项九", id: "9" },
        { name: "选项十", id: "10" },
        { name: "选项十一", id: "11" },
      ],
      length: 0,
      news:[],
      page:'1',
      limit: "7", //一次显示多少条
    };
  },
  components: { "footer-click": footer},
 
  methods: {
   
    addtip() {
        if(this.addtipshow == true){
            this.addtipshow = false ;
        }else{
            this.addtipshow = true ;
        }

    },

    deltip(e) {
        
        var vm = this;
        for(var i = 0 ; i < vm.list.length ; i++){
            var del = e.target.id
            del = Number(del);
            if( del == vm.list[i].id ){
                var obj = {};
                obj['name'] = vm.list[i].name;
                obj['id'] = vm.list[i].id;
                var newlist = vm.list;
                newlist.splice(i,1);
                vm.list = newlist;   
                vm.alllist.push(obj);
                obj = {};
            }
        }
    },
    pushtip(e) {
        var vm = this;
        for(var i = 0 ; i < vm.alllist.length ; i++){
            var del = e.target.id
            del = Number(del);
            if( del == vm.alllist[i].id ){
                var obj = {};
                obj['name'] = vm.alllist[i].name;
                obj['id'] = vm.alllist[i].id;
                var newlist = vm.alllist;
                newlist.splice(i,1);
                vm.alllist = newlist;
                vm.list.push(obj);
                obj = {};
            }
        }
    },
    //获取任务列表
    //加载
    getList(i) {
        
      let token = window.localStorage.getItem("token");
      let vm = this;
      vm.news = []
      vm.page = '1';
      var url = i;
      var json = {
        token: token,
        page_num: "0",
        limit: this.limit
      };
      ///console.log(json)
      //console.log(url)
      vm.$http.post(url, json, { emulateJSON: true }, { timeout: 15000 }).then(
        res => {
          //console.log(res)
          if (res.body.code == 1000) {
            vm.news = res.body.data;
            console.log( vm.news)
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
						var url = vm.url;
						this.page++; 
			 			var json = {
							token:token,
							page_num:this.page,
							limit:this.limit,
						}
						//console.log(url)
            vm.$http.post(url,json,{emulateJSON: true},{timeout:15000}).then((response) => {
                            
							
							let arr = response.body.data;
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
                  vm.news.push(obj);
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
			   this.getList(this.url);
			   loaded('done');
      	}, 1500)
       
      }
  },
  mounted() {

  },
   created() { //获取导航栏
      let token = window.localStorage.getItem("token");
      let vm = this;
      var url = common.apimain + "/api/user/menu";
      var json = {
        token: token,
      };
     // console.log(json)
      //console.log(url)
      vm.$http.post(url, json, { emulateJSON: true }, { timeout: 15000 }).then(
        res => {
          //console.log(res)
          if (res.body.code == 1000) {  
            vm.list = res.body.data;
           
            vm.url = res.body.data["7"].url
             //console.log(vm.url);
              this.getList(this.url);
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

  watch: {
    selected(newval, oldval) {
       // console.log(newval)
         this.url = this.list[newval].url;
         //console.log(this.url)
         this.getList(this.url);
      if(newval == 9){
          this.rw_tools_show = true
      }else{
          this.rw_tools_show = false
      }
    }
  },
  mounted() {
       this.$refs.newhome_list.style.height = document.documentElement.clientHeight-65+"px";
  }
  
};
</script>
<style scoped>

.newhome_list{
  padding-top: 3rem /* 48/16 */;
  position: relative;
}
	
.templet_div {
	height: 100%;
}

.templet_contone {
	height:122px;
	font-size: 16px;
	font-weight: 500;
	padding: 10px;
	line-height: 28px;
	background: #fff;
	margin-bottom: 10px;
	position: relative;
	border-bottom: 1px solid #f1f4f4;
}
	
.templet_conttwo {
	height:145px;
	background: #fff;
	margin-bottom: 10px;
	position: relative;
	border-bottom: 1px solid #f1f4f4;
}
	
.templet_contfive {
	width: 100%;
	height:110px;
	float: left;
	padding-right: 140px;
	
}
	
.include{
   float: left;
   position: absolute;
   left: 0px;
   height: 3.125rem /* 50/16 */;
   overflow-x: auto;
   padding-left: 10px;
}

.mint-navbar{
    border-bottom: 2px solid #f1f4f4;
    margin-right: 50px;
}
.mint-tab-container{
    background-color: #F2F6F7;
}

._v-container{
    padding-top: 48px;
}

.AddTip{
    width: 100%;
    height: 100%;
    padding-top: 3.125rem /* 50/16 */;
}
.UserAdd{
  width: 3.125rem /* 50/16 */;
    height: 3rem /* 48/16 */;
    text-align: center;
    line-height: 2.625rem /* 42/16 */;
    font-weight: 500;
    font-size: 1.5625rem /* 25/16 */;
    position: fixed;
    top: 0px;
    right: 0px;
    color: #26a2ff;
    z-index: 120;
    background-color: #fff;
     border-bottom: 2px solid #f1f4f4;
}
.pophead{
    width: 100%;
    height: 3.125rem /* 50/16 */;
    position: fixed;
    top:0;
    text-align: center;
    line-height: 3.125rem /* 50/16 */;
    font-weight: 400;
    font-size: 1rem /* 16/16 */;
}
.pophead img{
  width: 1rem /* 16/16 */;
  height: 3.125rem /* 50/16 */;
  position: absolute;
  left: 0px;
  margin:0 .875rem /* 14/16 */;
  padding: .8125rem /* 13/16 */ 0;
  z-index: 110;
}
.AddTip .user{
    width: 90%;
    box-sizing: border-box;
    padding: .625rem /* 10/16 */;
    border-bottom: 1px solid #e1e1e1;
    margin: .3125rem /* 5/16 */ auto;
}
.AddTip .user span{
    padding:.5rem /* 8/16 */ .625rem /* 10/16 */;
    font-size: .75rem /* 12/16 */;
    margin:.4375rem /* 7/16 */ .625rem /* 10/16 */;
    border: 1px solid #e1e1e1;
    border-radius: .1875rem /* 3/16 */;
    display: inline-block;
    position: relative;
    background-color: #e6e6e6;
}
.AddTip .alltip{
    width: 90%;
    box-sizing: border-box;
    padding: .625rem /* 10/16 */;
    margin: .3125rem /* 5/16 */ auto;
}
.AddTip .alltip span{
    padding:.5rem /* 8/16 */ .625rem /* 10/16 */;
    font-size: .75rem /* 12/16 */;
    margin:.4375rem /* 7/16 */ .625rem /* 10/16 */;
    border: 1px solid #e1e1e1;
    border-radius: .1875rem /* 3/16 */;
    display: inline-block;
    position: relative;
    background-color: #e6e6e6;
}
.AddTip h3{
    font-weight: 500;
    font-size: .875rem /* 14/16 */;
    margin: .3125rem /* 5/16 */;
}
.AddTip span img{
    display: block;
    width: 1rem /* 16/16 */;
    position: absolute;
    right: -.5rem /* 8/16 */;
    top:-.5rem /* 8/16 */;
}
.templet {
	border-top: 1px solid #ececec;
	overflow-y: auto;
}
.templet_button {
	width:54px;
	height:30px;
	line-height: 28px;
	border-radius: 6px;
	color: #ea7d8f;
	border:1px solid #d99d98;
	font-size:14px;
	bottom: 6px;
	position: absolute;
}
.templet_spanone {
	display: inline-block;
	color: #d99d98;
	font-size: 14px;
	position: absolute;
	bottom: 6px;
	left:74px;
}
.templet_spantwo {
	display: inline-block;
	font-size: 16px;
	font-weight: 500;
	line-height: 30px;
	padding: 10px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.templet_hot {
	width:45px;
	height:30px;
	line-height: 28px;
	border: 1px solid #d99d98;
	border-radius: 6px;
	font-size: 14px;
	color: #ea7d8f;
	margin-left: 10px;
}
.templet_spanthree {
	display: inline-block;
	color: #d99d98;
	font-size: 14px;
	margin-top: 3px;
}

.templet_spanfour {
	display: block;
	padding: 10px;
	font-size: 16px;
}

.templet_spanfive {
	font-size: 14px;
	color: #d99d98;
	position: absolute;
	bottom: 14px;
	left: 10px;
}

.templet_img {
	position: absolute;
	width:109px;
	height:72px;
	float: right;
	right:15px;
	top:14px;
}
.templet_contthree {
	height:250px;
	background: #fff;
	margin-bottom: 10px;
	position: relative;
	border-bottom: 1px solid #f1f4f4;
}
.templet_imgone {
	width:30%;
	height:75px;
	float: left;
	margin: 10px 4px 14px 8px;
}
.templet_imgtwo {
	width:30%;
	height:75px;
	float: left;
	margin: 10px 4px 14px 4px;
}
.templet_imgthree {
	width:30%;
	height:75px;
	float: left;
	margin: 10px 4px 14px 4px;
}
.templet_contfour {
	width:100%;
	height:435px;
	background: #fff;
	margin-bottom: 100px;
	position: relative;
	border-bottom: 1px solid #f1f4f4;
}
.templet_spansix {
	display: inline-block;
	font-size: 16px;
	padding: 10px;
}
.templet_imgfour {
	width:348px;
	height:268px;
	margin: 0 auto;
	display: block;
}
.templet_spanseven {
	display: inline-block;
	padding-left: 10px;
	padding-top: 10px;
	font-size: 14px;
	color:#515152;
}
.templet_go {
	width:65px;
	height:30px;
	border-radius: 6px;
	border:1px solid #3189c2;
	color:#3189c2;
	margin-left: 167px;
	margin-top: 5px;
	font-size: 14px;
}
.templet_ad {
	width:54px;
	height:30px;
	line-height: 28px;
	border-radius: 6px;
	border:1px solid #d99d98;
	color:#ea7d8f;
	position: absolute;
	bottom: 20px;
	left: 10px;
	display: inline-block;
	font-size: 14px;
}
.templet_spaneight {
	font-size: 14px;
	color: #d99d98;
	position: absolute;
	bottom: 24px;
	left:72px;
	display: inline-block;
}


/* 任务模板样式 */
.mission_list{
    width: 100%;
    height: 7.5rem /* 120/16 */;
    border-bottom: 1px solid  #ECE9E9;
    border-top: 1px solid  #ECE9E9;
    background-color: #fff;
        margin-bottom: 10px;
}
.mission_list  .head {
    position: relative;
    height:3.4375rem /* 55/16 */;
}
.mission_list  .head img{
    display: inline-block;
    width: 2.0625rem /* 33/16 */;
    height: 2.0625rem /* 33/16 */;
    border: 1px solid #f1f4f4;
    border-radius: 1rem /* 16/16 */;
    margin-left: .6875rem /* 11/16 */;
    margin-top: .6875rem /* 11/16 */;
}
.mission_list  .head .username{
   display: block;
    width: 11.25rem /* 180/16 */;
    height: 30px;
    line-height: 30px;
    position: absolute;
    top: .3125rem /* 5/16 */;
    left: 52px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.mission_list .head .time{
   position: absolute;
    width: 20%;
    font-size: 12px;
    color: #989898;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: 1.6875rem /* 27/16 */;
    left: 3.1875rem /* 51/16 */;
}
.mission_list .mission_con{
    height: 2.0625rem /* 33/16 */;
    padding:0 13px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .9375rem /* 15/16 */;
    font-weight: 500;
    line-height: 2.0625rem /* 33/16 */;
}
.mission_list .mission_price{
    height: 3.4375rem /* 55/16 */;
    line-height: 55px;
    max-width: 150px;
    position: absolute;
    top: 0;
    right: .8125rem /* 13/16 */;
    color:#F9A24E;
    font-size: 1rem /* 16/16 */;
    font-weight: 500;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.mission_list .mission_foot{
    padding: 0px 20px;
    height: 2rem /* 32/16 */;
    position: relative;
}
.mission_list .mission_foot span{
    font-size: 12px;
     color: #989898;
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    margin: 0 13px;
}
.mission_list .mission_foot img{
   width: 14px;
    height: 14px;
    position: absolute;
    left: 15px;
    top: 5px;
}
.mission_list .mission_foot .place{
    width: 40%;
}
.mission_list .mission_foot .type{
    width: 30%;
}


/* 任务搜索分类栏样式 */
.rw_tools{
    width: 100%;
    height: 2.6875rem /* 43/16 */;
    background-color: #fff;
    border-bottom: 1px solid #ECE9E9;
    margin-top: 3rem /* 48/16 */;
    position: relative;
    z-index: 120;
    position: fixed;
}
.rw_search{
    display: inline-block;
    width: 5.625rem /* 90/16 */;
    height: 2.6875rem /* 43/16 */;
    font-weight: 500;
    font-size: 12px;
    color: #848389;
    line-height: 2.6875rem /* 43/16 */;
    position: relative;
    margin-left: .875rem /* 14/16 */;
    padding-left: 2.4375rem /* 39/16 */;
}
.rw_pc{
     display: inline-block;
    width: 10.625rem /* 170/16 */;
     height: 1.25rem /* 20/16 */;
    font-weight: 500;
    font-size: 12px;
    color: #848389;
    line-height: 1.25rem /* 20/16 */;
    background-color: #E9EFF7;
    border-radius: 10px;
    position: absolute;
    right: 18px;
    top: 11px;
    padding: 0 10px;
}
.rw_search img{
    width: 1.1875rem /* 19/16 */;
    height: 1.1875rem /* 19/16 */;
    position: absolute;
    top: 12px;
    left: 12px;
}
.rw_pc img{
    height: .8125rem /* 13/16 */;
  
    position: absolute;
    
}
.rw_place{
    display: inline-block;
    width: 56%;
    text-align: center;
}
.rw_category{
    display: inline-block;
    width: 28%;
     text-align: center;
     margin-left: 20px;
}
.rw_place img{
    left: .5625rem /* 9/16 */;
    top:.1875rem /* 3/16 */;
}
.rw_category img{
    left:6.25rem /* 100/16 */;
    top:.1875rem /* 3/16 */;
}
</style>
