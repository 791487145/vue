<template>
        <div id="rank">     
                <div id="head"  class="divcss">
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
                                <li class="active_borderOne">
                                <router-link to="/message/action">
                                    活动
                                </router-link>
                            </li>
                            <li class="active_borderTwo">
                                <router-link to="/message/rank">
                                    排行
                                </router-link>
                            </li>
                            <li class="active_borderThree">
                                <router-link to="/message/schoolzp">
                                    招聘
                                </router-link>
                            </li>
                           <span class="border_slide"></span>
                        </ul>
                </div>
        
            <div class="rank">
                <div class="select">
                    <div @click="motai = !motai" class="mydown">
                            <img src="../../../statics/imgs/INFORMATION-CENTRAL_10.png" alt=""> 
                            &nbsp;{{currentfont}} &nbsp;<img src="../../../statics/imgs/INFORMATION-CENTRAL_13.png" alt="">
                    </div>
                    <div>
                            <div v-show="motai" class="motai">
                                    <div ref="recharge">充值榜</div>
                                    <div ref="consume">消费榜</div>
                                    <div ref="income">收入榜</div>
                                    <div ref="gold" class="clearpd">金币榜</div>
                                    <div ref="hunter_grade">猎人榜</div>
                                    <div ref="employer_grade">雇主榜</div>
                                    <div ref="grade">等级榜</div>
                            </div>
                            <div  v-show="motai" class="grey">
                            </div>
                    </div>
                </div>
                <!-- <div class="three">
                        <div>
                            <img src="../../../statics/imgs/INFORMATION-CENTRAL_39.png" alt=""><span></span>
                        </div>
                        <div>
                            <img src="../../../statics/imgs/INFORMATION-CENTRAL_18.png" alt=""><span></span>
                        </div>
                        <div>
                            <img src="../../../statics/imgs/INFORMATION-CENTRAL_30.png" alt=""><span></span>
                        </div>
                </div>
                <div class="threefont">
                        <div>
                            Lebron<br>
                            LV.40
                        </div>
                        <div>
                            史蒂芬小学生<br>
                            LV.42
                        </div>
                        <div>
                            我是杜老二丶 <br>
                            LV.35
                        </div>
                </div> -->
                    <div class="for" v-for="(p,i) in currentRank">
                        <ul>
                            <li>
                                <span class="ranknum"> {{i+1}}</span>
                            </li>
                            <li>
                                <img class="touxiang" src="../../../statics/imgs/INFORMATION-CENTRAL_33.png" alt="">
                            </li>
                            <li>
                                <p>{{p.name}}</p>
                                <span class="dengji">LV.{{p.user_grade_show}}</span> <span><i v-if="i!=0">距离上一名</i><b>{{d_value[i]}}</b>{{d_valueFont}}</span>
                            </li>
                            <li class="lastli">
                                <!-- <img src="../../../statics/imgs/INFORMATION-CENTRAL_44.png" alt=""> -->
                            </li>
                        </ul>
                    </div>
            </div>
        
           <footer-click></footer-click>
        </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Cell } from 'mint-ui';
import "../../kits/jquery.min.js"
import Mhead from './Mhead.vue'
import common from '../../kits/common.js';
import Scroll from './scroll.vue';
import footer from '../../kits/common/footer';
export default {
         name:'rank',
         data(){
             return {
                motai: false,
                currentRank: null,      // 当前显示数据
                currentfont: '充值榜',   // 模态框上显示字
                currentfont: '充值榜',   // 模态框上显示字
                d_value: null,           // 每人之间的差值
                d_valueFont: null,           // 差值显示字

                employer_grade: null,   // 雇主等级 1
                hunter_grade : null,    // 猎人的等级2
                gold: null,             // 金币3
                grade: null,            // 用户等级4
                income: null,           // 收入5
                recharge: null,         // 充值6
                consume: null,          // 消费7

                rank: [],               // ref对象数组
             }
         },
         components:{
         	Mhead,
         	'v-scroll': Scroll,
         	"footer-click":footer
         },
         methods: {
            ranks(){
                // 充值榜
                var that = this;
                let token = window.localStorage.getItem('token');
                var url = common.apimain+'/api/user/statistics?type=6';
                Indicator.open();
                this.$http.get(url).then(resData=>{
                    if(resData.body.code == 1000){
                        Indicator.close();
                        // console.log(resData);
                        that.recharge = resData.body.data;
                        //console.log(that.recharge);
                        that.currentfont = '充值榜';
                        that.d_valueFont = "元";
                        that.currentRank = resData.body.data;
                        console.log(that.currentRank);
                        var property = [];
                        for(var i = 0; i<that.recharge.length;i++){
                            // console.log(that.recharge[i].emp_value);
                            if(i==0){
                                property.push(that.recharge[0].emp_value)
                            }else{
                                property.push(that.recharge[i-1].emp_value-that.recharge[i].emp_value)
                            }
                        }
                        that.d_value = property;
                    }else if(resData.body.code == 1013){
                        Indicator.close();
                        Toast({
                            message: '登录过期，重新登录',
                            duration: 2000
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
                    Indicator.close();
                    Toast('网络连接错误');
                });
                // 猎人等级
                var url = common.apimain+'/api/user/statistics?type=2';
                this.$http.get(url).then(resData=>{
                    that.hunter_grade = resData.body.data;
                    // console.log(this.hunter_grade);
                },function(){
                    Toast('网络连接错误');
                });
                // 金币等级
                var url = common.apimain+'/api/user/statistics?type=3';
                this.$http.get(url).then(resData=>{
                    that.gold = resData.body.data;
                    // console.log(this.gold);
                },function(){
                    Toast('网络连接错误');
                });
                // 用户等级
                var url = common.apimain+'/api/user/statistics?type=4';
                this.$http.get(url).then(resData=>{
                    that.grade = resData.body.data;
                    // console.log(this.grade);
                },function(){
                    Toast('网络连接错误');
                });
                // 收入等级
                var url = common.apimain+'/api/user/statistics?type=5';
                this.$http.get(url).then(resData=>{
                    that.income = resData.body.data
                    // console.log(this.income);
                },function(){
                    Toast('网络连接错误');
                });
                // 充值等级
                var url = common.apimain+'/api/user/statistics?type=1';
                this.$http.get(url).then(resData=>{
                    that.employer_grade = resData.body.data;
                    // console.log(this.recharge);
                },function(){
                    Toast('网络连接错误');
                });
                // 消费等级
                var url = common.apimain+'/api/user/statistics?type=7';
                this.$http.get(url).then(resData=>{
                    that.consume = resData.body.data;
                    // console.log(this.consume);
                },function(){
                    Toast('网络连接错误');
                });
            },
         },
         mounted () {
            var that = this;
            // ref对象插入及当前排行数组变换
            this.rank.push(this.$refs.recharge);
            this.rank.push(this.$refs.consume);
            this.rank.push(this.$refs.income);
            this.rank.push(this.$refs.gold);
            this.rank.push(this.$refs.hunter_grade);
            this.rank.push(this.$refs.employer_grade);
            this.rank.push(this.$refs.grade);

            //ref对象遍历
            this.rank.forEach(function(value, index) {
                that.rank[index].onclick=function(){
                    var property = [];
                    if(index == 0){
                        that.currentRank = that.recharge;
                        that.currentfont = '充值榜';
                        that.d_valueFont = "充值金额";
                        for(var i = 0; i<that.recharge.length;i++){
                            // console.log(that.recharge[i].emp_value);
                            if(i==0){
                                property.push(that.recharge[0].emp_value)
                            }else{
                                property.push(that.recharge[i-1].emp_value-that.recharge[i].emp_value)
                            }
                        }
                        that.d_value = property;
                    }else if(index == 1){
                        that.currentfont = '消费榜';
                        that.currentRank = that.consume;
                        that.d_valueFont = "消费金额";
                        for(var i = 0; i<that.consume.length;i++){
                            // console.log(that.consume[i].emp_value);
                            if(i==0){
                                property.push(that.consume[0].emp_value)
                            }else{
                                property.push(that.consume[i-1].emp_value-that.consume[i].emp_value)
                            }
                        }
                        that.d_value = property;
                        // console.log(property);
                    }else if(index == 2){
                        that.currentfont = '收入榜';
                        that.currentRank = that.income;
                        that.d_valueFont = "收入金额";
                        for(var i = 0; i<that.income.length;i++){
                            // console.log(that.income[i].emp_value);
                            if(i==0){
                                property.push(that.income[0].emp_value)
                            }else{
                                property.push(that.income[i-1].emp_value-that.income[i].emp_value)
                            }
                        }
                        that.d_value = property;
                    }else if(index == 3){
                        that.currentfont = '金币榜';
                        that.currentRank = that.gold;
                        that.d_valueFont = "枚金币";
                        for(var i = 0; i<that.gold.length;i++){
                            // console.log(that.gold[i].grade_name);
                            if(i==0){
                                property.push(that.gold[0].grade_name)
                            }else{
                                property.push(that.gold[i-1].grade_name-that.gold[i].grade_name)
                            }
                        }
                        that.d_value = property;
                    }else if(index == 4){
                        that.currentfont = '猎人榜';
                        that.currentRank = that.hunter_grade;
                        that.d_valueFont = "经验值";
                        for(var i = 0; i<that.hunter_grade.length;i++){
                            // console.log(that.hunter_grade[i].emp_value);
                            if(i==0){
                                property.push(that.hunter_grade[0].emp_value)
                            }else{
                                property.push(that.hunter_grade[i-1].emp_value-that.hunter_grade[i].emp_value)
                            }
                        }
                        that.d_value = property;
                    }else if(index == 5){
                        that.currentfont = '雇主榜';
                        that.currentRank = that.employer_grade;
                        that.d_valueFont = "经验值";
                        for(var i = 0; i<that.employer_grade.length;i++){
                            // console.log(that.employer_grade[i].emp_value);
                            if(i==0){
                                property.push(that.employer_grade[0].emp_value)
                            }else{
                                property.push(that.employer_grade[i-1].emp_value-that.employer_grade[i].emp_value)
                            }
                        }
                        that.d_value = property;
                    }else if(index == 6){
                        that.currentfont = '等级榜';
                        that.currentRank = that.grade;
                        that.d_valueFont = "级";
                        for(var i = 0; i<that.grade.length;i++){
                            // console.log(that.grade[i].emp_value);
                            if(i==0){
                                property.push(that.grade[0].user_grade_show)
                            }else{
                                property.push(that.grade[i-1].user_grade_show-that.grade[i].user_grade_show)
                            }
                        }
                        that.d_value = property;
                    }
                    that.motai = false;
                    //console.log(that.currentRank);
                }
            });
            // console.log(this.rank);
            let token = window.localStorage.getItem('token');
            //console.log(token)
            // 清除缓存
            var url = common.apimain+'/api/user/statistics?type=8';
            this.$http.get(url).then(resData=>{
                if(resData.body.code == 1000){
                    that.ranks();
                }
            },function(){
				Indicator.close();
				Toast('网络连接错误');
		    });
            
        },
    
}
</script>
<style scoped>
    #rank{
        width: 100%;
		max-width: 40rem /* 640/16 */;
		min-width: 20rem /* 320/16 */;
		margin: 0 auto;
		background-size: cover;
		background-repeat: no-repeat;
        min-height: 100vh;
        background-color: #fff;
        padding-top: 5.4rem;
        padding-bottom: 5rem;
    }
    .rank{
        border-radius: 10px;
        position: relative;
    }
    /* 
    .rank li{
        width: 15vw;
        height: 8vw;
        line-height: 8vw;
        float: left;
        font-size: .75rem;
        text-align: center;
        background-color: #ccc;
        color: #4171AE;
    }
    .rank li:hover,.rank li:active{
        color: #fff;
        background-color: #4171AE;
    } */
    button{
        background-color: #4171ae;
        width: 80vw;
        height: 2.9375rem /* 47/16 */;
        padding: 0 2.5625rem /* 41/16 */;
        margin: auto;
        margin-top: 1rem;
        display: block;
        color: #fff;
    }
    
    .mydown{
        border-bottom: 1px solid #ebebeb;
    }
    .select{
        background-color: #fff;
        text-align: center;
        height: 2.6rem;
        line-height: 2.6rem;
        width: 100vw;
        font-size: 1rem;
        position: fixed;
        top: 2.8rem;
        z-index: 10;
    }
    .mydown img{
        height: 1.2rem;
    }
    .mydown img:nth-of-type(2){
        height: 0.6rem;
    }
    .motai{
        padding: 1rem;
        padding-bottom: 0;
        width: 100%;
        font-size: .875rem /* 14/16 */;
        background-color: #f4f2f3;
        height: 8rem;
        position: absolute;
        z-index: 2;
    }
    .motai div{
        background-color: #e6e5e5;
        width: 18.7vw;
        float: left;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
    .motai .clearpd{
        margin-right: 0;
    }
    .mrb{
        margin-bottom: 1rem;
    }
    .grey{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,.6);
        z-index: 1;
    }
    .select>div:nth-of-type(1){
        position: relative;
        z-index: 2;
        background-color: #fff;
    }
    .select .three>img{
        height: 5rem;
    }
    .select .three>img:nth-of-type(1),.select .three>img:nth-of-type(3){
        height: 4rem;
    }
    .three{
        display: flex;
        justify-content: space-around;
        border: 1px solid rgba(0,0,0,0);
        margin-top: 1.6rem;
        background-color: #fff;
    }
    .three>div{
        width: 4.1rem /* 80/16 */;
        height: 4rem /* 80/16 */;
        border-radius: 50%;
        position: relative;
    }
    .three>div>img{
        width: 4.6rem /* 80/16 */;
        height: 5.4rem /* 80/16 */;
        position: absolute;
        top: -0.8rem;
        left: -0.4rem;
    }
    .three>div:nth-of-type(1){
        background-image: url(../../../statics/imgs/4.png);
    }
    .three>div:nth-of-type(2){
        background-image: url(../../../statics/imgs/5.png);
    }
    .three>div:nth-of-type(3){
        background-image: url(../../../statics/imgs/6.png);
    }
    .three>div:nth-of-type(1),.three>div:nth-of-type(3){
        margin-top: 1rem;
    }
    .three span{
        position: absolute;
        top: 3rem;
        left: 4rem;
        width: 1rem;
        height: 1.1rem;
        display: inline-block;
    }
    .three span:nth-of-type(1){
        background-image: url(../../../statics/imgs/INFORMATION-CENTRAL_42.png);
    }
    .three span:nth-of-type(2){
        background-image: url(../../../statics/imgs/INFORMATION-CENTRAL_44.png);
    }
    .three span:nth-of-type(3){
        background-image: url(../../../statics/imgs/INFORMATION-CENTRAL_44.png);
    }
    .threefont{
        margin-top: 1rem;
        padding-bottom: 1rem;
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        text-align: center;
        background-color: #fff;
        font-weight: 500;
    }
    .threefont>div{
        width: 25vw;
        line-height: 1rem;
    }
    .threefont>div:nth-of-type(1){
        color: #89afd7;
    }
    .threefont>div:nth-of-type(2){
        color: #e74602;
    }
    .threefont>div:nth-of-type(3){
        color: #ec7d3f;
    }
    .for{
        border-top:  1px solid #ebebeb;;
    }
    .for ul{
        padding: 0.8rem;
        overflow: hidden;
    }
    .for li{
        float: left;
        min-width: 7vw;
        height: 3.3125rem /* 53/16 */;
        text-align: center;
        position: relative;
        padding-right: 0.6rem !important;
        padding-top: 0.5rem;
    }
    .for li p{
        text-align: left;
        font-size: .875rem /* 14/16 */;
        font-weight: 500;
    }
    .for li span{
        text-align: left;
        font-size: .75rem /* 12/16 */;
        color: #959595;
    }
    .for li
    .for li:nth-of-type(2){
        line-height: 1.2rem;
        height: 2.4rem;
    }
    .for li:nth-of-type(3){
        line-height: 1.2rem;
        height: 2.4rem;
    }
    .ranknum{
        display: inline-block;
        width: .84rem /* 13.44/16 */;
        height: .84rem /* 13.44/16 */;
        position: absolute;
        top: 0 /* 16/16 */;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-color: #ddd;
        font-size: 12px;
        line-height: 1rem;
        text-shadow: 2px 2px 2px #fff;
        text-align: center !important;
    }
    .dengji{
        margin-right: 1rem;
    }
    .for li.lastli{
        float: right;
        padding-top: 1rem;
    }
    .touxiang{
        height: 2.22rem /* 35.52/16 */;
    }


    /* lshead */
    #head{
        height: 2.8rem;
        line-height: 2.8rem;
        text-align: center;
     
        z-index: 100;
      
        position: fixed;
        top: 0;
        width: 100vw;
    }
    #head a:link,#head a:visited{
        color: #fff;
    }
    #head a:hover,#head a:active{
        color: #fff;
    }
    #head>ul{
        height: 2.8rem;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
    }
    .messhead li{
        height: 2.8rem;
        line-height: 2.8rem;
        border-bottom: 1px solid #ccc;
        text-align: center;
        float: left;
        width: 33.33vw;
    }

    .messhead   li:nth-of-type(4){
        background: url(../../../statics/imgs/INFORMATION-CENTRAL_03.png) no-repeat;
        background-size: 36% 5%;
        background-position: 1.4875rem /* 19/16 */ 2.1875rem /* 35/16 */;
    }

     .border_slide {
    	position: absolute;
    	bottom: 1px;
    	left: 33%;
    	width: 33.33%;
    	height: 5px;
        background:#fff;
        border-radius: 3px;
    }
</style>