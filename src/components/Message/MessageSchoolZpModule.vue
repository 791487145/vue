<template>
    <div id="schoolzpm">
        <ul>
            <li>
                <div>
                    <span>超市导购</span><b>300元每天</b>
                </div>
                <div class="mess">
                    <span>大学城商业街</span>
                    <span>经验不限</span>
                    <span>学历不限</span>
                </div>
                <div>
                    <!-- <img class="qiye" src="../../../statics/imgs/zhuye_35.png" alt=""> -->
                    唐久企业管理有限公司
                    <b class="zp">招聘中</b>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
     name:'schoolzpm',
     data(){
         return {
             schoolZP: null,
         }
     },
     components:{},
     mounted () {
        let token = window.localStorage.getItem('token');
        this.$http.get('/zfy/activeCenter?token='+token).then(res=>{
            this.schoolZP = res.data.data.invites;
            console.log(this.schoolZP);
        });
    },
}
</script>
<style scoped>
#schoolzp{
    width: 100%;
    max-width: 40rem /* 640/16 */;
    min-width: 20rem /* 320/16 */;
    margin: 0 auto;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    background-color: #f8f8fa;
}
li{
    padding: 0.6rem;
    background-color: #fff;
    border-top: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
    margin-bottom: .625rem /* 10/16 */;
}
li>div{
    padding: 0 ;
}
li>div:nth-of-type(1){
    font-size: 1.2rem /* 16/16 */;
    height: 1.3rem;
    line-height: 1.3rem;
}
li>div:nth-of-type(2){
    font-size: 0.8rem /* 16/16 */;
    height: 2.6rem;
    line-height: 2.6rem;
}
li span{
    float: left;
    width: 22vw;
}
li b{
    float: right;
    color: #f5532a;
}
.qiye{
    height: 1.5rem;
    float: left;
    margin-right: 1rem;
}
.zp{
    color: #d1d1d1;
    font-size: .75rem /* 12/16 */;
    font-weight: 400;
}
.mess span{
    text-align: center;
}
</style>