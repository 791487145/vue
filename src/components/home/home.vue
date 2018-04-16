<template>
	<div id="tmpld">
		 <!-- 1.0系统的头部 -->
	
		<div class="one divcss">
      <img src="../../../statics/imgs/LBICON2_03.png" alt="">
			<mt-swipe :auto="6000" :speed="3000" :showIndicators="false" id="lunbo" class="divcsss">
  		  <mt-swipe-item v-for="item in zhufuyu" :key="item.id">
			
				{{item.content}}
		    </mt-swipe-item>
  		
		</mt-swipe>
			
		</div>
		
		 <!-- 轮播图组件 -->
		 <div class="banner">
				<mt-swipe :auto="4000">
						<mt-swipe-item v-for="item in lunbo" :key="item.id">
              <a :href='item.route'>  
                <img :src="ImgUrl+'/'+item.icon_name" @click="isshow" :alt="item.route" >
              </a>
            </mt-swipe-item>
					
				</mt-swipe>
		 </div>
 <!-- 九宫格 -->
        <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-12" id="muiul">
		            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3" v-for="item in fun" :key="item.id">
                        <!-- <router-link :to="item.function_route">
		                    <span class="icon">
                          <img :src="this.ImgUrl+'/'+item.function_icon" alt="">
                        </span>
		                    <div class="mui-media-body">{{item.function_name}}</div>
                        </router-link> -->
                        <a :href="item.function_route">
                          <span class="icon">
                          <img :src="ImgUrl+'/'+item.function_icon" alt="">
                          </span>
		                      <div class="mui-media-body">{{item.function_name}}</div>
                        </a>
                </li>
		        </ul>
		</div>
     <router-link  to="/news">
				<span >点我</span>
		</router-link>
		<div class="updown">
      <img src="../../../statics/imgs/SJICON2_18.png" alt="">
				<ul id="con1" ref="con1" :class="{anim:animate==true}" class="lala">
          
					<li v-for='item in xiaoxi' :key="item.id">
             <span>{{item.username}}</span>
            发布了{{item.title }}任务
            <span class="right">赏金￥{{item.bounty}}</span>
          </li>
				</ul>
		</div>
    <div class="ggbox">
      	<div class="guanggao" v-for="item in ads" :key="item.id">
			    <img :src="ImgUrl+'/'+item.icon_name" :alt="item.route">
		    </div>
    </div>
    
   
		
    <!-- 轮播活动 -->
    <lunbo-one :iframe="iframe" @hide-picker="hidePicker"></lunbo-one>


		<!-- 底部 -->
		<footer-click></footer-click>
		</div>
</template>

<script>
import { Toast } from "mint-ui";
import common from "../../kits/common.js"; //api
import { MessageBox } from "mint-ui";
import LunboOne from "./lunboone.vue";
import "../../kits/jquery.min.js";
import footer from '../../kits/common/footer';
export default {
  components: {
    LunboOne,
    "footer-click":footer
  },
  data(){
    return {
      ImgUrl: common.apimain,
      animate: false,
      iframe: false,
      closeOnClickModal: false,
      fun: "",
      lunbo: "",
      ads: "",
      zixun: "",
      second: "1",
      zhufuyu: [],
      xiaoxi: [],
      wgtVer: "",
      wgtUrl: ""
    };
  },
  computed: {
      author () {
        return this.$store.state.author
      }
    },
  created() {
    setInterval(this.scroll, 10000); // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
    this.getlist();
    if (window.plus) {
      this.plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
  methods: {
    plusReady() {
      var that = this;
      // 获取本地应用资源版本号
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        var wgtVer = inf.version;
        console.log("当前应用版本：" + wgtVer);
        that.checkUpdate(wgtVer);
      });
    },
    checkUpdate(e) {
      //检测升级
      var that = this;
     // plus.nativeUI.showWaiting("检测更新...");
      var url = common.apimain + "/api/package";
      var json = {
        version: e
      };
      console.log("当前：" + e);
      that.$http
        .post(url, json, { emulateJSON: true }, { timeout: 15000 })
        .then(
          response => {
            plus.nativeUI.closeWaiting();
            var body = response.body;
            if (body.code == 1000) {
              that.wgtUrl = common.apimain + "/" + body.data.name;
              console.log(that.wgtUrl);
              that.downWgt(); // 下载升级包
            } else {
              console.log("无新版本可更新！");
              //plus.nativeUI.alert("无新版本可更新！");
            }
          },
          response => {
            console.log("检测更新失败！");
            plus.nativeUI.closeWaiting();
            //Toast({ message: "检测更新失败！", duration: 800 });
          }
        );
    },
    downWgt() {
      var that = this;
      plus.nativeUI.showWaiting("下载更新文件...");
      plus.downloader
        .createDownload(that.wgtUrl, { filename: "_doc/update/" }, function(
          d,
          status
        ) {
          if (status == 200) {
            console.log("下载wgt成功：" + d.filename);
            that.installWgt(d.filename); // 安装wgt包
          } else {
            console.log("下载wgt失败！");
            plus.nativeUI.alert("下载更新文件失败！");
          }
          plus.nativeUI.closeWaiting();
        })
        .start();
    },
    installWgt(path) {
      plus.nativeUI.showWaiting("安装中...");
      plus.runtime.install(
        path,
        {},
        function() {
          plus.nativeUI.closeWaiting();
          console.log("更新成功！");
          plus.nativeUI.alert("应用资源更新完成！", function() {
            plus.runtime.restart();
          });
        },
        function(e) {
          plus.nativeUI.closeWaiting();
          console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
          plus.nativeUI.alert("更新文件失败[" + e.code + "]：" + e.message);
        }
      );
    },
    scroll() {
      var that = this;
      that.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        that.xiaoxi.push(that.xiaoxi[0]); // 将数组的第一个元素添加到数组的
        that.xiaoxi.shift(); //删除数组的第一个元素
        that.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 500);
    },
    isshow(e) {
     // this.openurl = e.target.alt;
      //if (this.openurl != "") {
     //   this.iframe = true;
     // }
      //console.log(this.openurl)
      this.iframe = true;
    },
    hidePicker() {
      this.iframe = false;
    },
    getlist() {
      //console.log(123)
      let vm = this;
      let token = window.localStorage.getItem("token");
      var url = common.apimain + "/api/user/index";
      var json = {
        token: token
      };
      //console.log(json)
      vm.$http.post(url, json, { emulateJSON: true }, { timeout: 15000 }).then(
        response => {
          var body = response.body;
          //console.log(body);
          if (body.code == 1000) {
            vm.fun = body.data.function;
            vm.lunbo = body.data.lunbo;
            vm.ads = body.data.ads;
            vm.zixun = body.data.zixun;
            vm.zhufuyu = body.data.announcement;
            vm.xiaoxi = body.data.task;
            //console.log(vm.lunbo)
            if (vm.zhufuyu == null) {
              $("#lunbo").css("display", "none");
            }
          } else if (body.code == 1013) {
            Toast({ message: body.message, duration: 800 });
            vm.$router.push({ path: "/loginuser" });
          } else {
            Toast({ message: body.message, duration: 800 });
          }
        },
        response => {
          //console.log('网络连接错误，请稍后重试');
          Toast({ message: "网络连接错误，请稍后重试", duration: 800 });
        }
      );
    }
  },
  watch: {},
  activated() {
    this.getlist();
  }
};
</script>

<style scoped>
.mint-popup {
  width: 100%;
  height: 100vh;
}
#lunbo {
  height: 28px;
  width: 80%;
  margin-left: 50px;
  font-size: 14px;
  line-height: 28px;
  text-align: center;
  border-radius: 5px;
}

#muiul {
  margin-top: 0;
}
/* 滚动 */

.one {
  width: 100%;
  max-width: 40rem;
  height: 50px;
  top: 0;
  padding-top: 11px;
  position: fixed;
  z-index: 200;
}
.one img {
  position: absolute;
  top: 0.9375rem;
  left: 1.1875rem;
  width: 1.125rem;
  height: 1.125rem;
}

.anim {
  transition: all 0.5s;
}
#con1 li {
  list-style: none;
  line-height: 30px;
  height: 30px;
}
.updown {
  height: 7.5rem;
  border: 1px solid transparent;
  overflow: hidden;
  background-color: #fff;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 10px;
  position: relative;
  border-bottom: 1px solid #d5d7db;
  border-top: 1px solid #d5d7db;
}
.updown li {
  width: 82%;
  float: right;
  text-align: left;
  font-weight: 500;
  font-size: 0.875rem;
  padding-right: 5px;
  padding-left: 5px;
  overflow: hidden;
}
.updown li:nth-child(odd) {
  color: #fc3b3d;
  overflow: hidden;
}
.updown li:nth-child(even) {
  color: #fc3b3d;
}
.updown span {
  color: #fc3b3d;
  width: 20%;
  overflow: hidden;
}
.updown .right {
  color: #ffcf40;
}
.updown img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  margin-top: -25px;
  left: 0.75rem;
}

/*轮播图样式*/
.mint-swipe {
  height: 132px;
}
.mint-swipe-item img {
  width: 100%;
  height: 132px;
}
.mint-swipe-item input {
  width: 0;
  height: 0;
  opacity: 0;
}
.mint-swipe-item {
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
.mui-content ul {
  margin-top: 0;
}
.mui-table-view-cell span {
  display: inline-block;
  width: 3.125rem;
  height: 3.125rem;
}
.mui-table-view-cell span img {
  width: 3.125rem;
  height: 3.125rem;
}

.banner img {
  width: 100%;
  max-width: 640px;
  height: 132px;
}
.ls > img {
  width: 100vw;
  height: 80vw;
}


.ggbox {
  margin-top: 10px;
  margin-bottom: 74px;
}
.guanggao {
  width: 100%;
  max-width: 640px;
  height: 125px;
}
.guanggao img {
  width: 100%;
  height: 125px;
}
.banner{
  margin-top: 50px;
}


.icon-shouye{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>