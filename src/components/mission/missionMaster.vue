    <template>
        <div id="missionMaster">
           <div class="master">
               雇主信息
           </div>
           <div class="masterMess">
                <ul>
                    <li class="touxiang">
                        <slot name="touxiang"></slot>
                    </li>
                    <li>
                        <div>
                                <slot name="name"></slot><img src="" alt=""><img src="" alt="">
                        </div>
                        <div>
                            雇主等级: <slot name="dengji"></slot>
                        </div>
                    </li>
                </ul>                
           </div>
        </div>
    </template>
    <script>
    export default {
        name:'missionMaster',
        data(){
             return {

             }
        },
        components:{},
    }
    </script>
    <style scoped>
        #missionMaster{
            background-color: #f1f5fa;
        }
        #missionMaster>div{
            padding: .9375rem /* 15/16 */;
        }
        .master{
            border-top: 1px solid #e6e6e6;
            border-bottom: 1px solid #e6e6e6;
            font-weight: 700;
        }
        .masterMess{
            height: 5.25rem /* 84/16 */;
        }
        .masterMess li{
            float: left;
        }
        .masterMess li div{
            height: 1.8rem;
            line-height: 1.8rem;
            padding-left: 1rem;
        }
        .touxiang img{
            width: 3.5625rem /* 57/16 */;
            border-radius: 50%;
        }
    </style>