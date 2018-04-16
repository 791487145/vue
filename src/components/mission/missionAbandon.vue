<template>
        <div id="missionAbandon">
            <div class="abandon">
                <h1>
                    <img src="../../../statics/imgs/SHOUYE_70.png" alt="">
                </h1>
                <div>
                    <div>您已提交完成任务</div>
                    <div>请等待雇主确认</div>
                    <button @click="abandon">知道了</button>
                </div>
            </div>
        </div>
    </template>
    <script>
    export default {
        name:'missionAbandon',
        data(){
             return {

             }
        },
        components:{},
        methods: {
            abandon(){
                this.$emit('abandon',false);
            }
        }
    }
    </script>
    <style scoped>
        #missionAbandon{
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, .42);
            position: fixed;
            top: 0;
        }
        .abandon{
            width: 13.25rem /* 212/16 */;
            height: 10.0625rem /* 145/16 */;
            border-radius: 10px;
            background-color: #fff;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
        }
        .abandon>div{
            padding: 1rem;
        }
        h1{
            background-color: #4171ae;
            position: relative;
            height: 2rem;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        h1>img{
            width: 3rem;
            border: 2px solid #979797;
            border-radius: 50%;
            position: absolute;
            top: -1.5rem;
            left: 5.2rem;
        }
        button{
            margin: 1rem;
            width: 8rem;
            height: 2rem;
            background-color: #4171ae;
            color: #fff;
        }
    </style>