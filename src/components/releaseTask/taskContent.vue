<template>
    <div class="taskcontent">
            <div class="head">
                    <span>任务内容</span>
                    <span @click="areav">完成</span>
                    <span @click="back"><img src="../../../statics/imgs/jiantou-1.png" alt=""></span>
            </div>
            <div class="taskc">
                <textarea  placeholder="请填写任务详细需求及交付地点" name="" id="" v-model="tvalue" input="if(value.length>100) value=value.substr(0,100)">{{tvalue | valuenum}}</textarea>
                <!-- <span class="fontnum">{{tvaluelength}}/100</span> -->
                <img src="../../../statics/imgs/lz.png" alt="">
            </div>
    </div>
  </template>
  
  <script>
    import "../../kits/jquery.min.js"
    import bus from './bus.js'
    export default {
      name: 'taskcontent',
      props: ['taskc'],
      data() {
        return {
            tvalue: '',
            tvaluelength: null,
        }
      },
      mounted() {
        $("textarea").focus();
        this.tvalue = this.taskc;
      },
      methods: { 
        back(){
            bus.$emit('back',false);
        },
        areav(){
            bus.$emit('areav',this.tvalue,false);
        }
      },
      watch: {
        tvalue(old, val) {
        //   console.log(val.length);
        this.tvaluelength = val.length+1;
            if(val.length < 100){
                    $("textarea").css("color","#000").removeClass('redbor');
                    $(".fontnum").css("color","#ccc");
                }
            if((val.length) > 100){
                    $(".fontnum").css("color","red");
                    $("textarea").css("color","red").addClass('redbor');
            }

        },
      },
        filters: {
            valuenum:function(value){
                if(value.length>100){
                    this.tvalue= value.substr(0,100)
                    console.log(this.tvalue);
                    console.log(this.tvalue.length);
                    return this.tvalue;
                }else{
                    return this.tvalue;
                }
            }.bind(this),
        }
    }
  
  </script>
  
  <style scoped>
    .taskcontent{
        /* height: 600px; */
        padding-bottom: 4.125rem;
        background-size: 100% 100%;
        height: 100vh;
        position: relative;
    }
    textarea{
        width: 90vw;
        height: 12.5rem /* 200/16 */;
        display: block;
        margin: 0 auto;
        border: none;
    }
    .head{
		max-width: 40rem /* 640/16 */;
	 	min-width: 20rem /* 320/16 */;
		position: fixed;
		top: 0;
		width: 100%;
		height: 3.125rem /* 50/16 */;
		background-color: #4171AE;
		z-index: 100;
	}
	.head span:nth-of-type(1){
		display: inline-block;
		height: 3.125rem /* 50/16 */;
		width: 100%;
		text-align: center;
		line-height: 50px;
		color: white;
	}
    .head span:nth-of-type(2){
        position: absolute;
        right: 1.4rem;
        top: 0.9rem;
        font-size: .8rem; /* 12/16 */
        color: #fff;
    }
    .head span:nth-of-type(3){
        position: absolute;
        left: 1.4rem;
        top: 0.9rem;
    }
    .head span img{
        width: 1rem;
    }
    .redbor{
        border: 1px solid red;
    }
    .fontnum{
        color: #ccc;
        position: absolute;
        top: 10.6rem;
        right: 2rem;
        z-index: 1;
    }
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
    .taskc{
        position: relative;
    }
    .taskc img{
        display: block;
        margin: 0 auto;
        width: 90vw;
        height: 53.9vw;
        border-radius: .625rem /* 10/16 */;
        margin-top: 1rem;
    }
  </style>
  