<template>
        <div id="deploy">
                <div id="head">
                        <!-- <span class="cloud" id="cloud"></span> -->
                        <ul class="messhead">
                                <!-- <li>
                                    <router-link to="/message/deploy">
                                        推荐
                                </router-link>
                                </li>
                                <li>
                                    <router-link to="/message/question">
                                        咨讯
                                </router-link>
                                </li> -->
                                <li>
                                    <router-link to="/message/action">
                                        活动
                                </router-link>
                                </li>
                                <li>
                                    <router-link to="/message/rank">
                                        排行
                                </router-link>
                                </li>
                                <li>
                                    <router-link to="/message/schoolzp">
                                        招聘
                                </router-link>
                                </li>
                        </ul>
                </div>
            <!-- 轮播图 -->
            <div class="banner">
                <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="item in lunbo" >
                            <img :src="this.ImgUrl+'/'+item.icon_name" :alt="item.route" @click="isshow">
                        </mt-swipe-item>
                       
                </mt-swipe>
            </div>
            <h2>资讯</h2>
            <div v-for="p in public">
                <router-link v-bind="{to:'/message/qpage/'+p.id}">
                    <message-deploy-listModule :qdata="p"></message-deploy-listModule>
                </router-link>
            </div>
            <h2>活动</h2>
            <div v-for="a in actionData">
                <router-link v-bind="{to:'/message/qpage/'+a.id}">
                    <message-action-module :actions="a"></message-action-module>
                </router-link>
            </div>
            <h2>招聘</h2>
            <div class="zps" v-for="s in schoolZP">
                <router-link v-bind="{to:'/message/qpage2/'+s.id}">
                    <ul>
                            <li>
                                <div>
                                    <span class="postname">{{s.post_name}}</span><b>{{s.salary}}</b>
                                </div>
                                <div>
                                    <!-- <img class="qiye" src="../../../statics/imgs/zhuye_35.png" alt=""> -->
                                    {{s.company_name}}
                                    <b class="zp">招聘中</b>
                                </div>
                            </li>
                        </ul>
                </router-link>
            </div>
            	<!-- 轮播活动 -->
   			 <lunbo-one :iframe="iframe" @hide-picker="hidePicker" :openurl="openurl"></lunbo-one>
            <!-- 底部导航提 -->
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item" to="/home">
                    <span class="mui-icon">
                        <img src="../../../statics/imgs/iconhome.png">
                    </span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item" to="/mission">
                    <span class="mui-icon">
                        
                        <img src="../../../statics/imgs/icon03.png">
                    </span>
                    <span class="mui-tab-label">任务大厅</span>
                </router-link>
                <router-link class="mui-tab-item" id="zhuye" to="">
                        
                        <span class="mui-icon" id="money" >
                            <img src="../../../statics/imgs/zhuye_35.png">
                        </span>
                        
                </router-link>
                <router-link class="mui-tab-item" to="/message/action">
                    <span class="mui-icon">
                        
                        <img src="../../../statics/imgs/icon06.png">
                    </span>
                    <span class="mui-tab-label">信息中心</span>
                </router-link>
                <router-link class="mui-tab-item" to="/user">
                    <span class="mui-icon">
                        <img src="../../../statics/imgs/iconuser.png">
                    </span>
                    <span class="mui-tab-label">个人中心</span>
                </router-link>
            </nav>
        </div>
</template>
<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import { Cell } from "mint-ui";
import Mhead from "./Mhead.vue";
import MessageDeployListModule from "./MessageDeployListModule.vue";
import MessageActionModule from "./MessageActionModule.vue";
import MessageSchoolZpModule from "./MessageSchoolZpModule.vue";
import common from "../../kits/common.js";
import LunboOne from "../home/lunboone.vue"; //广告页

export default {
  name: "deploy",
  data() {
    return {
      public: {},
      actionData: {},
      schoolZP: {},
      lunbo: "",
      iframe: false,
      openurl: "",
      ImgUrl:common.apimain,
    };
  },
  components: {
    Mhead,
    MessageDeployListModule,
    MessageActionModule,
    MessageSchoolZpModule,
    LunboOne
  },
  created() {
    var that = this;
    let token = window.localStorage.getItem("token");
    var data2 = {
      token: token,
      type: 61,
      Limit: 2,
      pageNuw: 0
    };
    var url = common.apimain + "/api/article/articleTypeList";

    // 推荐接口
    var url = common.apimain + "/api/activeCenter?token=" + token;
    this.$http.get(url, { emulateJSON: true }).then(resData => {
      console.log(resData.body);
      if (resData.body.code == 1000) {
        that.public = resData.body.data.infos;
        that.actionData = resData.body.data.actives;
        that.schoolZP = resData.body.data.invites;
        that.lunbo = resData.body.data.lunbo;
      } else {
        Toast({
          message: "加载失败",
          duration: 1000
        });
      }
    },
    function() {
      Toast("网络连接错误");
    });
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
    }
  }
};
</script>
<style scoped>
#deploy {
  width: 100%;
  max-width: 40rem;
  min-width: 20rem;
  margin: 0 auto;
  background-image: url(../../../statics/imgs/SHOUYE_03.png);
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 9vh;
  padding-top: 2.8rem;
}
#deploy a {
  color: #000;
}
.ls > img:nth-of-type(1) {
  width: 100vw;
  height: 118vw;
}

/*轮播图样式*/
.mint-swipe {
  height: 132px;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
.mint-swipe-item {
  background-color: red;
  width: 100%;
  height: 132px;
}
.mui-content,
.mui-content ul {
  background-color: #fff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border-right: 0px;
  border-bottom: 0px;
}
.mui-grid-view.mui-grid-9 {
  border-top: 0px;
  border-left: 0px;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
  content: "";
  display: inline-block;
  width: 50px;
  height: 50px;
  background-repeat: round;
}

.mui-icon-home:before {
  background-image: url(../../../statics/imgs/1.png);
}

.mui-icon-email:before {
  background-image: url(../../../statics/imgs/2.png);
}
.mui-icon-chatbubble:before {
  background-image: url(../../../statics/imgs/3.png);
}
.mui-icon-location:before {
  background-image: url(../../../statics/imgs/4.png);
}
.mui-icon-search:before {
  background-image: url(../../../statics/imgs/5.png);
}
.mui-icon-phone:before {
  background-image: url(../../../statics/imgs/6.png);
}
.banner img {
  width: 100vw;
  height: 27.4vh;
}
.zps li {
  padding: 0.6rem;
  background-color: #fff;
  border-top: 1px solid #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
  margin-bottom: 0.625rem;
}
.zps li > div {
  padding: 0;
}
.zps li > div:nth-of-type(1) {
  font-size: 1.2rem;
  height: 2.2rem;
  line-height: 1.6rem;
}
.zps li > div:nth-of-type(2) {
  font-size: 0.8rem;
  height: 2.2rem;
  line-height: 2.2rem;
}
.zps li span {
  float: left;
  font-weight: 500;
  font-size: 0.99rem;
}
.zps li b {
  float: right;
  color: #f5532a;
  font-size: 0.875rem; /* 14/16 */
}
.zps .qiye {
  height: 1.5rem;
  float: left;
  margin-right: 1rem;
}
.zps .zp {
  color: #d1d1d1;
  font-size: 0.75rem;
  font-weight: 400;
}
.zps .mess div {
  padding: 1rem 0;
  height: 5rem;
  line-height: 1.6rem;
  padding-bottom: 0;
}
h2 {
  padding: 0.8rem 1rem;
  /* background-image: linear-gradient(90deg, #ccc, #fff); */
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: #fff;
}
.public li {
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #fff;
  font-size: 0.9rem;
  text-indent: 2rem;
  border-bottom: 1px solid #ccc;
}
.zps li .postname {
  width: 40vw;
}

/* ls head */
#head {
  height: 2.8rem;
  line-height: 2.8rem;
  text-align: center;
  color: #fff;
  z-index: 100;
  background-color: #4171ae;
  position: fixed;
  top: 0;
  width: 100vw;
}
#head a:link,
#head a:visited {
  color: #fff;
}
#head a:hover,
#head a:active {
  color: #fff;
}
#head > ul {
  height: 2.8rem;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}
.messhead li {
  height: 2.8rem;
  line-height: 2.8rem;
  border-bottom: 1px solid #ccc;
  text-align: center;
  float: left;
  width: 33.33vw;
}

.messhead li:nth-of-type(1) {
  background: url(../../../statics/imgs/INFORMATION-CENTRAL_03.png) no-repeat;
  background-size: 36% 5%;
  background-position: 1.4875rem 2.1875rem;
}
</style>