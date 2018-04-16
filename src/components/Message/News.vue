<template>
    <div id="action">
          <div v-model="selected" class="in_div divcss">
            <div class="include divcss" >
             <!-- <mt-tab-item  v-for="item in list" :id="item.id" :key="item.id">{{item.name}}</mt-tab-item>-->
             <ul class="drag_list" @click='chooseLi' @dragstart='drag($event)'>
             	<li v-for="(item,index) in list" :id="item.id" :key="item.id" class="drag_list_name" @click="change(index)" :class='{active:index===number}'>{{item.name}}</li>
             </ul>
             
            </div>
            
          </div>
	<div class="UserAdd divcss" @click="addtip">+</div>

         <!-- tab-container -->
            
         <div class="templet">
             
             <ul>
                 <li class="templet_div" v-for="item in news" :key="item.id">
                     
                     	
                     <!-- 文字模板 -->
                     
                     <p class="templet_contone" v-if="item.type == 1">
                     	{{item.title}}
                     	<br />
                     <button class="templet_button">{{item.statu}}</button>
                     <span class="templet_spanone">{{item.where}}&nbsp;&nbsp;{{item.pinglun}}评论&nbsp;&nbsp;{{item.time}}</span>
                     
                     </p>
                     
                     
                     
                     
                     <!-- 左文右图模板 -->
                     
                     <div class="templet_conttwo" v-else-if="item.type == 2">
                     	<p class="templet_contfive">
                     		<span class="templet_spantwo">
                     		{{item.title}}
                     		</span>
                     		
                     	</p>
                     	
                     	<button class="templet_hot">{{item.statu}}</button>
                     	<span class="templet_spanthree">{{item.where}}&nbsp;&nbsp;{{item.pinglun}}评论&nbsp;&nbsp;{{item.time}}</span>
                     	
                     	<img :src="item.img" class="templet_img"/>
                     </div>
                     
                     
                     <!-- 上文下三图模板 -->
                     
                     <div class="templet_contthree"  v-else-if="item.type == 3">
                     	<span class="templet_spanfour">
                     		{{item.title}}
                     	</span>
                     	<img :src="item.img" class="templet_imgone"/>
                     	<img :src="item.img" class="templet_imgtwo"/>
                     	<img :src="item.img" class="templet_imgthree"/>
                     	<p class="clear"></p>
                     	<span class="templet_spanfive">{{item.where}}&nbsp;&nbsp;{{item.pinglun}}评论&nbsp;&nbsp;{{item.time}}</span>
                     </div>
                     
                     
                     <!-- 大图模板 -->
                     <p class="templet_contfour"  v-else-if="item.type == 4">
                     	<span class="templet_spansix">
                     		{{item.title}}
                     	</span>
                     	<img :src="item.img" class="templet_imgfour"/>
                     	<span class="templet_spanseven">无限模式限免</span>
                     	<button class="templet_go">立即下载</button>
                     	<button class="templet_ad">广告</button>
                     	<span class="templet_spaneight">全民塔防线&nbsp;&nbsp;{{item.time}}</span>
                     </p>
                     
                     
                     
                 </li>
             </ul> 
            

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
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import { Cell } from "mint-ui";
import "../../kits/jquery.min.js";
import MessageActionModule from "./MessageActionModule.vue";
import common from "../../kits/common.js";
//import { Navbar, TabItem } from "mint-ui";
//import { TabContainer, TabContainerItem } from "mint-ui";
import footer from "../../kits/common/footer";
import { Popup } from "mint-ui"; //用户自定义标签
export default {
  name: "action",
  data() {
    return {
      selected: "1",
      addtipshow:false,
      newval: 3,
      left: 0,
      content:'1',
      bar_width:"",
      number: 0,
      list: [
        { name: "官方", id: "1" },
        { name: "推荐", id: "2" },
        { name: "任务", id: "3" },
        { name: "招聘", id: "4" },
        { name: "资讯", id: "5" },
      ],
      alllist: [
        { name: "选项九", id: "9" },
        { name: "选项十", id: "10" },
        { name: "选项十一", id: "11" },
      ],
      length: 0,
      news:[
          {type:"1",title:"我是标题",img:"../../../statics/imgs/cbd.jpg",statu:"置顶",where:"新华网",pinglun:"13",time:"30分钟前"},
          {type:"1",title:"我是标题",img:"../../../statics/imgs/cbd.jpg",statu:"热",where:"新华网",pinglun:"13",time:"30分钟前"},
          {type:"2",title:"我是标题",img:"../../../statics/imgs/cbd.jpg",statu:"hot",where:"新华网",pinglun:"13",time:"30分钟前"},
          {type:"2",title:"我是标题",img:"../../../statics/imgs/cbd.jpg",statu:"置顶",where:"新华网",pinglun:"13",time:"30分钟前"},
          {type:"4",title:"我是标题",img:"../../../statics/imgs/cbd.jpg",statu:"置顶",where:"新华网",pinglun:"13",time:"30分钟前"},
          {type:"3",title:"我是标题",img:"../../../statics/imgs/cbd.jpg",statu:"置顶",where:"新华网",pinglun:"13",time:"30分钟前"}

      ],
    };
  },
  components: { MessageActionModule, "footer-click": footer},
 
  methods: {
    getConent(id) {
      var id = id || 'hso';
      this.content = id;
  },
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
    change: function(index) {  
                this.number= index; 
                console.log(this.number)
    },
    chooseLi:function(e) {
      var newval = Number(e.target.id 

        );
      this.getConent(newval);
      this.newval = Number(this.newval);
      if(newval > this.newval && newval != this.length && this.length -1-this.newval>=2 ){
	        var a = newval - this.newval;
	        if(newval == this.length-1){
		          a=1;
		          newval=this.length-2;
	        }
	        this.left -= this.bar_width*a;
	       // console.log('1',this.left);
	        this.newval = newval;
      }else if(newval < this.newval && newval != 1 && newval != this.length && this.newval -2 >=2) {
        	var a = this.newval - newval;
      		if(newval == 2){
		          a=1;
		          newval=3;
        	}
        	this.left += this.bar_width*a;
        	//console.log('2',this.left);
        	this.newval = newval;
      }

      $('.include').animate({left:this.left+'px'},'slow');
    },


  },
  mounted() {
    this.length = this.list.length;
    this.bar_width=(window.screen.width-35)/5;
    $('.include').css('width',this.length*this.bar_width)
    $(".mint-tab-item-label").css("width", this.bar_width); //动态设置bar选项宽度
    $(".mint-tab-item-label").css("margin", "0 auto"); //动态设置bar选项宽度
    this.$refs.list.style.height =
      document.documentElement.clientHeight - 106 + "px";
  },

  watch: {
    selected(newval, oldval) {
      newval = Number(newval);
      this.newval = Number(this.newval);
      if(newval > this.newval && newval != this.length && this.length -1-this.newval>=2 ){
	        var a = newval - this.newval;
	        if(newval == this.length-1){
		          a=1;
		          newval=this.length-2;
	        }
	        this.left -= this.bar_width*a;
	       // console.log('1',this.left);
	        this.newval = newval;
      }else if(newval < this.newval && newval != 1 && newval != this.length && this.newval -2 >=2) {
        	var a = this.newval - newval;
      		if(newval == 2){
		          a=1;
		          newval=3;
        	}
        	this.left += this.bar_width*a;
        	//console.log('2',this.left);
        	this.newval = newval;
      }

      $('.include').animate({left:this.left+'px'},'slow');
    }
  },
  mounted() {
    this.length = this.list.length;
    this.bar_width=(window.screen.width-35)/5;
    $('.drag_list').css('width',this.length*this.bar_width)
    $(".drag_list_name").css("width", this.bar_width); //动态设置bar选项宽度
    $(".drag_list_name").css("margin", "0 auto"); //动态设置bar选项宽度
    $(".drag_list_name").css("font-size", "14px"); //动态设置bar选项字体大小
    this.$refs.list.style.height = document.documentElement.clientHeight - 106 + "px";
	this.getConent();
  }
  
};
</script>
<style scoped>
	
.in_div {
	overflow-x: auto;
	position: relative;
	height:50px;
	line-height: 50px;
}
	
.drag_list_name {
	display: inline-block;
	
}

.active {
	color:#0000FF;
}

.drag_list {
	height:50px;
	

}

.clear {
	clear: both;
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
	overflow-x: auto;
	position: relative;
	height:3.125rem /* 50/16 */;
}
.mint-navbar .mint-tab-item {
    float: left;
}

.AddTip{
    width: 100%;
    height: 100%;
    padding-top: 3.125rem /* 50/16 */;
}
.UserAdd{
    width: 2.1875rem /* 35/16 */;
    text-align: center;
    line-height: 2.625rem /* 42/16 */;
    font-weight: 500;
    font-size: 1.5625rem /* 25/16 */;
    position: absolute;
    top: 4px;
    right: 0;
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
</style>
