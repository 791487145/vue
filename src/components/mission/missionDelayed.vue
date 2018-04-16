<template>
        <div id="missionDelayed">
            <div class="delayed">
                    <div>您已拒绝延时,请选择</div>
                    <button @click="delayed">放弃任务</button>
                    <button @click="delayed">重新发布</button>
            </div>
        </div>
    </template>
    <script>
    export default {
        name:'missionDelayed',
        data(){
             return {

             }
        },
        components:{},
        methods: {
            delayed(){
                this.$emit('delayed',false);
            }
        }
    }
    </script>
    <style scoped>
        #missionDelayed{
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, .42);
            position: fixed;
            top: 0;
        }
        .delayed{
            width: 18.25rem /* 212/16 */;
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
        .delayed>div{
            padding: 3rem;
            font-weight: 700;
        }
        button{
            display: inline-block;
            width: 8rem;
            height: 2rem;
            background-color: #4171ae;
            color: #fff;
        }
        button:nth-of-type(1){
            background-color: #e6e6e6;
            color: #aeaeae;
        }
    </style>