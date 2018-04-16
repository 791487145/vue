<template>
    <div class="teleasetask">
        <div>
                    <com-header :title="title"></com-header>
                    <div class="tasktitle paddinglr">  
                        <i>任务标题:</i> <input type="text" v-model="tasktitle" value="你好 Vue！" placeholder="请输入发布任务的标题">
                    </div>
                    <div class="taskmain">
                        <ul>
                            <li @click="time = true"><i>显示时间</i><span>{{publicity_at}}小时 <img src="../../../statics/imgs/centralofme_35.png" alt=""></span></li>
                            <li @click="address = true">
                                <i>区域限制</i><span>{{taskaddress}} <img src="../../../statics/imgs/centralofme_35.png" alt=""></span>
                            </li>
                            <li class="in"><i>赏金数额</i><b>最少为1元</b><div><input type="number" v-model.number="moneynum"><div class="grey">元</div> </div></li>
                            <li class="task">
                                <i class="task_content">任务内容</i>
                                 <div id="mission"> 
                                    <textarea  placeholder="请填写任务详细需求及交付地点" name="" id="mission-text" v-model="tvalue" input="if(value.length>100) value=value.substr(0,100)">{{tvalue | valuenum}}</textarea>
                                 </div>
                                
                            </li>
                            <li class="in"><i>限定时间</i><b>任务完成时间,0为不限</b><div><input type="number" v-model.number="xianzhitime"><div class="grey">分</div> </div></li>
                            <li class="in"><i>等级限制</i><b>接受任务限制,0为不限</b><div><input type="number" v-model.number="taskrequire"><div class="grey">级</div> </div></li>
                        </ul>
                    </div>
                    <div class="footer">
                        <ul>
                            <!-- <li @click="service = true"><i>增值服务</i><span>{{service_kind}} <img src="../../../statics/imgs/centralofme_35.png" alt=""></span></li> -->
                            <li><i>增值服务</i><b></b><span>暂未开放 <img src="../../../statics/imgs/centralofme_35.png" alt=""></span></li>
                            <li class="phone"><i>联系电话</i><input type="number" placeholder="请输入电话" v-model.number="phone"> <span @click="clearphone"><img src="../../../statics/imgs/xxx.png" alt=""></span></li>
                        </ul>
                    </div>
                    <button @click="console" class="divcss">发布</button>
                    <!-- 支付余额 -->
                    <div class="pushtask" v-if="zhifu">
                        <div class="pmotai">
                            请输入支付密码: <input type="password" class="password" v-model.number="password" maxlength="6">
                            <button @click="zhifucall">确认</button>
                            <img @click="zhifu = false" src="../../../statics/imgs/xxx.png" alt="">
                        </div>
                    </div>
                    <div class="pushtask" v-if="zhifusuccess == 1000">
                        <div class="pmotai">
                            支付成功
                            <button @click="success">确认</button>
                            <img @click="zhifusuccess = 0" src="../../../statics/imgs/xxx.png" alt="">
                        </div>
                    </div>
                    
                    <div class="pushtask" v-if="zhifusuccess == 1001">
                            <div class="pmotai">
                                支付失败<br>
                                <span>{{callzhifu}}</span>
                                <router-link to="/user/my_wallet/pay"  v-if="callzhifu == '您的余额不足，请充值'">
                                    <button @click="zhifu = true;zhifusuccess = 0">前往充值</button>
                                </router-link>
                                <button @click="zhifu = true;zhifusuccess = 0"  v-if="callzhifu == '支付密码错误'">重输密码</button>
                                <img @click="zhifusuccess = 0" src="../../../statics/imgs/xxx.png" alt="">
                            </div>
                    </div>
                    <!-- 地区 -->
                    <div class="motai" v-if="address">
                        <div class="boomotai">
                            <div class="padding">
                                <span @click="school = null;address = false">取消</span>
                                <span @click="address = false" class="float-right">完成</span>
                            </div>
                            <div class="anniu">
                                <!-- <div>
                                    <label>不限</label>
                                    <span></span><input name="radio" type="radio" v-model="region_limit" value="0">
                                </div>
                                <div>
                                    <label>{{taskSchool.school_name}}</label>
                                    <span></span><input name="radio" type="radio" v-model="region_limit" :value="taskSchool.school">
                                </div> -->
                                <form>
                                        <div>
                                            <input id="item1" type="radio" name="radio" v-model="region_limit" value="0">
                                            <label for="item1"></label>
                                            <span>不限</span>
                                        </div>
                                        <div>
                                            <input id="item2" type="radio" name="radio" v-model="region_limit" :value="taskSchool.school">
                                            <label for="item2"></label>
                                            <span>{{taskSchool.school_name}}</span>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>         
                    <!-- 时间 -->
                    <div class="motai" v-if="time">
                        <div class="boomotai">
                            <div class="padding">
                                <span @click="publicity_at = 24;time = false">取消</span>
                                <span @click="time = false" class="float-right">完成</span>
                            </div>
                            <div class="anniu">
                                <!-- <input name="radio" type="radio" v-model="publicity_at" value="24">
                                <input name="radio" type="radio" v-model="publicity_at" value="48">
                                <input name="radio" type="radio" v-model="publicity_at" value="72"> -->
                                <form>
                                        <div>
                                            <input id="time1" type="radio" name="time" v-model="publicity_at" value="24">
                                            <label for="time1"></label>
                                            <span>一天</span>
                                        </div>
                                        <div>
                                            <input id="time2" type="radio" name="time" v-model="publicity_at" value="48">
                                            <label for="time2"></label>
                                            <span>两天</span>
                                        </div>
                                        <div>
                                            <input id="time3" type="radio" name="time" v-model="publicity_at" value="72">
                                            <label for="time3"></label>
                                            <span>三天</span>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>         
                    <!-- 服务 -->
                    <div class="motai" v-if="service">
                            <div class="boomotai">
                                <div class="padding">
                                    <span @click="task_service = 0;service = false">取消</span>
                                    <span @click="service = false" class="float-right">完成</span>
                                </div>
                                <div class="mui-content">
                                        <div class="mui-card">
                                            <form class="mui-input-group">
                                                <div class="mui-input-row mui-radio">
                                                    <label>无</label>
                                                    <input name="radio" type="radio" v-model="task_service" value="0">
                                                </div>
                                                <div class="mui-input-row mui-radio">
                                                    <label>钻石置顶 ￥ 30.00</label>
                                                    <input name="radio" type="radio" v-model="task_service" value="30.00">
                                                </div>
                                                <div class="mui-input-row mui-radio">
                                                    <label>普通置顶 ￥ 5.00</label>
                                                    <input name="radio" type="radio" v-model="task_service" value="5.00">
                                                </div>
                                                <div class="mui-input-row mui-radio">
                                                    <label>标题修饰 ￥ 2.00</label>
                                                    <input name="radio" type="radio" v-model="task_service" value="2.00">
                                                </div>
                                            </form>
                                        </div>
                                </div>
                            </div>
                        </div>        
                    
                    
        </div>
    </div>
</template>
      
<script>
        import { Toast } from 'mint-ui';
        import { Indicator } from 'mint-ui';
        import { Cell } from 'mint-ui';
        import common from '../../kits/common.js';
        import "../../kits/jquery.min.js"
        import bus from './bus.js'
        import comheader from '../../kits/comheader.vue';
        export default {
          name: 'teleasetask',
          props: {

          },
          components:{
             ComHeader:comheader,
          },
          filters: {
            valuenum:function(value){
                if(value.length>10){
                    this.tvalue= value.substr(0,10) + "...";
                    return this.tvalue;
                }else{
                    this.tvalue= value;
                    return this.tvalue;
                }
            }.bind(this),
          },
          data() {
            return {
                tasktitle: '',
                publicity_at: '24',       // 显示时间
                region_limit: null,     // 地区限制
                bounty: '',               // 余额
                desc: '',                 // 任务描述
                task_message:'',
                xianzhitime: 0,
                taskrequire: 0,
                showTime: false,
                showService: false,
                task_service: 0,          // 服务数值
                service_kind: '无',       // 服务类型(显示)
                moneynum: null,
                phone: null,
                title:"发布任务",
                // 支付状态
                zhifu :false,
                password: null,
                callzhifu: {},
                taskID: null,
                zhifusuccess: null,
                address: false,
                school: 0,

                // 显示时间
                time: false,
                service: false,

                // 发布者所在地区省份学校
                taskSchool: null,
                taskaddress: null,           //限制区域
                // region: null,   //地区
                // province: null, //省份
                // school_name: null,  //学校名
                // uid: null,          // 学校id

                 tvalue: '',
            }
          },
          watch: {
            school() {
                console.log(this.school);
                if(n == 44){
                    this.region_limit = "太原城市职业技术学院" ;
                }
                if(n == 45){
                    this.region_limit = "山西水利职业技术学院"; 
                }
                if(n == 46){
                    this.region_limit = "中北大学"; 
                }
            },
            region_limit() {
                console.log(this.region_limit);
                if(this.region_limit == 0){
                    this.taskaddress = '无'
                }else{
                    this.taskaddress = this.taskSchool.school_name
                }
            },
            task_service() {
                console.log(this.task_service);
                var ser = this.task_service;
                if(ser == 0){
                    this.service_kind = "无" ;
                }
                if(ser == 30.00){
                    this.service_kind = "钻石置顶"; 
                }
                if(ser == 5.00){
                    this.service_kind = "普通置顶"; 
                }
                if(ser == 2.00){
                    this.service_kind = "标题修饰"; 
                }
            },
          },
          mounted () {

            // 请求电话
            let token = window.localStorage.getItem('token');
			var url = common.apimain + '/api/user/getUserInfo?token='+token;
			//console.log(token)
			var _this=this;
			_this.$http.get(url,{timeout:5000}).then(resData=>{
                // console.log(resData);
                _this.phone =  resData.body.data.mobile;
            });
            // 请求学校
            var url1 = common.apimain + '/api/tasks/userInfo?token='+token;
            _this.$http.get(url1,{timeout:5000}).then(resData=>{
                console.log(resData.data.data)
                _this.taskSchool = resData.data.data
                _this.taskaddress = _this.taskSchool.school_name
            });
            //动态改变文本狂高达
                    document.querySelector('#mission-text').addEventListener('input',function(){  
                    this.style.height='auto';  
                    this.style.height = this.scrollHeight + 'px';  
                });  
          },          
          methods: {
            back(){
                window.history.back();
            },
            clearphone() {
                this.phone = null;
            },
            zhifucall(){
                this.zhifu = true;
                var that = this;
                let token = window.localStorage.getItem('token');
            
                // console.log(that.taskID);
                var data2 = {
                        task_id:that.taskID,
                        token: token,
                        password: that.password,
                    };
                var url = common.apimain+'/api/pay/taskService';
                    //console.log(url);
                console.log(typeof(that.password));
                console.log(that.password);
                that.zhifu = false;
                    
                this.$http.post(url,data2,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    that.callzhifu = resData.body.message;
                    console.log(resData);
                    that.zhifusuccess = resData.body.code;
                });
            },
            success(){
                this.back();
            },
            // 创建任务---
            console() {
                // console.log('显示时间:   '+this.publicity_at);
                // console.log('赏金数额:   '+this.moneynum);
                // console.log('任务内容:   '+this.task_message);
                // console.log('增值服务:   '+this.service_kind);
                // console.log('联系电话:   '+this.phone);
                let token = window.localStorage.getItem('token');
                // console.log(token);
                var that = this;
                //console.log(this.region_limit);
                var data = {};
                if(this.region_limit == 0){
                    data = {
                        token:token,
                        title: this.tasktitle,                     // 任务标题
                        desc: this.tvalue,                            // 任务描述
                        cate_id: '0',                          // 任务类型
                        bounty: this.moneynum,                 // 预算
                        phone: this.phone,                     // 电话
                        publicity_at: this.publicity_at,       // 显示时间
                        worker_num: '1',                       // 参与人数
                        work_time: this.xianzhitime,           // 任务完成事件
                        hunter_grade_limit: this.taskrequire,  // 猎人等级限制
                        region_limit: 0,             // 学校, 默认为登录用户所在的学校, 不限选项暂时为0

                        // task_service: this.task_service,
                    };
                }else{
                    data = {
                        token:token,
                        title: this.tasktitle,                     // 任务标题
                        desc: desc,                            // 任务描述
                        cate_id: '0',                          // 任务类型
                        bounty: this.moneynum,                 // 预算
                        phone: this.phone,                     // 电话
                        publicity_at: this.publicity_at,       // 显示时间
                        worker_num: '1',                       // 参与人数
                        work_time: this.xianzhitime,           // 任务完成事件
                        hunter_grade_limit: this.taskrequire,  // 猎人等级限制
                        // region_limit: 0,             // 学校, 默认为登录用户所在的学校, 不限选项暂时为0

                        // task_service: this.task_service,
                        region: this.taskSchool.region,
                        province: this.taskSchool.province,
                        area: this.taskSchool.school
                    };
                }
                console.log(data);
                var url = common.apimain+'/api/myTask/createTask';
                    
                this.$http.post(url,data,{emulateJSON: true},{timeout:15000}).then(function(resData){
                    console.log(resData);
                    if(resData.body.code == 1000){
                        that.taskID = resData.body.data.id;
                        this.zhifu = true;
                    }else if(resData.body.code == 1001){
                        Indicator.close();
                        Toast({
                            message: '创建失败, '+resData.body.data,
                            duration: 3000
                        });
                        // this.$router.push({path:'/loginuser'}) // 跳转school_name
                    }
                });
            },
          }
        }
      
</script>
      
<style scoped>
    .teleasetask input{
        margin-bottom: 0 !important;
        padding: 0 15px;
        font-size: 0.96rem;
        font-weight: 500;
        color: #a0a0a0;
    }
    .teleasetask{
        /* height: 600px; */
        padding-top: 4.125rem;
        padding-bottom: 4.125rem;
        background-size: 100% 100%;
    }
    .teleasetask li i{
        font-size: 1rem;
        color: #000;
        font-weight: 500;
    }
    
    .tasktitle{
        height: 3rem /* 43/16 */;
        line-height: 3rem /* 43/16 */;
        width: 100%;
        background-color: #fff;
        margin-bottom: 1rem;
    }
    .tasktitle input{
        width: 12.6rem;
        border: none;
    }
    .paddinglr{
        padding: 0 1.1875rem; 
    }
    .taskmain{
        margin-bottom: 1rem;
    }
    li{
        min-height: 3rem /* 48/16 */;
        line-height: 3rem /* 48/16 */;
        padding: 0 1.1875rem; 
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        position: relative;
    }
    li span{
        position: absolute;
        right: 2rem;
        min-width: 2rem;
        cursor: pointer;
        text-align: right; 
    }
    li img{
        height: 0.8rem /* 16/16 */
    }
    li b{
        font-size: .86rem /* 12/16 */;
        font-weight: 400;
        margin-left: 1rem;
        color: #ccc;
    }
    li .grey{
        display: inline-block;
        color: #a0a0a0;
        margin-left: 0.1rem;
    }
    .task{
        min-height: 80px;
        padding: 5px;
    }
    .task textarea{
        width: 100%;
        border: none;
        font-size: .75rem /* 12/16 */;
        margin: 0;
        padding: 10px 0;
    }
    .head .taskback{
        float: left;
        height: 3.125rem /* 50/16 */;
		line-height: 3.125rem;
        padding-top: 0.4rem;
    }
    .head span img{
        width: 1rem;
    }
    button{
       
        width: 80vw;
        height: 2.4rem /* 47/16 */;
        padding: 0 2.5625rem /* 41/16 */;
        margin: auto;
        margin-top: 1rem;
        display: block;
      
    }
    .footer li span{
        color: #9d9d9d;
    }
    .in>div{
        float: right;
    }
    .in input{
        border: none;
        width: 16vw;
        height: 2rem;
        text-align: center;
        background-color: #eaeef7;
    }
    .phone input{
        border: none;
        width: 50vw;
        /* background-color: #ccc; */
    }
    .pushtask{
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .42);
    }
    .pmotai{
        width: 60vw;
        height: 52vw;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: #fff;
        line-height: 15vw;
        border-radius: 10px;
        text-align: center;
    }
    .pmotai button{
        width: 22vw;
        text-align: center;
        padding: 0;
    }
    .pmotai .password{
        letter-spacing:1.125rem /* 18/16 */;
        font-size: 3rem;
        color: #222;
    }
    .pmotai img{
        position: absolute;
        top: .5625rem /* 9/16 */;
        right: .5625rem /* 9/16 */;
    }
    .padding {
          padding: 15px;
    }
    .float-right {
        float: right;
    }
    .motai{
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .42);
    }
    .boomotai{
        position: absolute;
        bottom: 0;
        background-color: #fff;
        width: 100vw;
        padding-bottom: 2vh;
    }
    .school{
        padding: 0 3rem;
        border: 1px solid #fff;
    }
    .school div{
        margin: 2rem 0;
    }
    .school span{
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        border: 1px solid #000;
        border-radius: 50%;
        margin-top: 0.2rem;
        float: right;
        background-size: 1.2rem 1.2rem;
    }

    /* ls按钮 */
    .anniu{
        padding: 1rem;
        line-height: 2.6rem;
    }
    .anniu div {
        position: relative;
        line-height: 30px;
    }
    .anniu input[type="radio"] {
        width: 20px;
        height: 20px;
        opacity: 0;
        position: absolute;
        right: 1rem /* 16/16 */;
        top: 5px;
    }
        
    .anniu label {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #999;
        position: absolute;
        right: 1rem /* 16/16 */;
        top: 5px;
    }
   
        
        /*设置选中的input的样式*/
        /* + 是兄弟选择器,获取选中后的label元素*/
        .anniu input:checked+label { 
            background-color: #fe6d32;
            border: 1px solid #fe6d32;
        }
        
        .anniu input:checked+label::after {
            position: absolute;
            content: "";
            width: 5px;
            height: 10px;
            top: 3px;
            left: 6px;
            border: 2px solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg)
        }


        #mission{
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            font-size: 14px;
            width: 73%;
            box-sizing: border-box;
          
        }
        .task .task_content{
            display:inline-block;
            width: 25%;
            vertical-align:top;
            text-align: center;
        }
        
</style>
      