<template>
    <div class="addresscontent">
            <div class="head">
                    <span>任务内容</span>
                    <span @click="success">完成</span>
                    <span @click="back"><img src="../../../../../statics/imgs/jiantou-1.png" alt=""></span>
            </div>
            <div class="addressc">
                <textarea  placeholder="请填写详细地址" name="" id="" v-model="tvalue" >{{tvalue}}</textarea>
                <!-- <span class="fontnum">{{tvaluelength}}/100</span> -->
            </div>
    </div>
</template>
  
<script>
    import "../../../../kits/jquery.min.js"
    import bus from '../../../../kits/bus.js'
    export default {
      name: 'addresscontent',
      props: ['addressc'],
      data() {
        return {
            tvalue: '',
        }
      },
      mounted() {
        $("textarea").focus();
        this.tvalue = this.addressc;
      },
      methods: { 
        back(){
            bus.$emit('back',false);
        },
        success(){
            bus.$emit('success',this.tvalue,false);
        }
      },
      watch: {
        tvalue(old, val) {
        //   console.log(val.length);
       
      },
    }
}
</script>
  
<style scoped>
    .addresscontent{
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
</style>
  