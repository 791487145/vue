import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import login from '@/components/account/login.vue'
import loginphone from '@/components/account/loginphone.vue'
import loginuser from '@/components/account/loginuser.vue'
import register from '@/components/account/register.vue'
import setpwd from '@/components/account/setpwd.vue'
import activation from '@/components/account/activation.vue'
import home from '@/components/home/newhome.vue'
import zhufu from '@/components/home/zhufu.vue'
import mission from '@/components/mission/mission.vue'
import missionlist from '@/components/mission/missionlist.vue'
import agree from '@/components/account/agree.vue'
import car from '@/components/shopcar/car.vue'
import yaoqing from '@/components/home/yaoqing.vue'

// 个人中心
import user from '@/components/user/user.vue'
import settingUp from '@/components/user/setting_up.vue'
import aboutUs from '@/components/user/about_us.vue'
import questions from '@/components/user/questions.vue'
//个人信息填写
import perInfo from '@/components/user/per_info.vue'
import usermod from '@/components/user/userinfo/usermod.vue'
import authenInfo from '@/components/user/userinfo/authen_info.vue'
import securityInfo from '@/components/user/userinfo/security_info.vue'
import securitycode from '@/components/user/userinfo/securitycode.vue'
import securitypassword from '@/components/user/userinfo/securitypassword.vue'
import studentcode from '@/components/user/userinfo/studentcode.vue'
import area_school from '@/components/user/userinfo/area_school.vue'
import native from '@/components/user/userinfo/native.vue'
import major from '@/components/user/userinfo/major.vue'
import pay_num from '@/components/user/userinfo/pay_num.vue'
import systemclass from '@/components/user/userinfo/systemclass.vue'
import original_secucode from '@/components/user/userinfo/original_secucode.vue'
import address from '@/components/user/userinfo/address.vue'
import alterContent from '@/components/user/userinfo/alter_content.vue'
import autograph from '@/components/user/userinfo/autograph.vue'
import phoneNum from '@/components/user/userinfo/phone_num.vue'
import verification from '@/components/user/userinfo/verification.vue'
import changephonenumber from '@/components/user/userinfo/changephonenumber.vue'

import myAchievement from '@/components/user/my_achievement.vue'
import iossuedTask from '@/components/user/iossued_task.vue'
import iossuedTaskList from '@/components/user/iossued_task_list.vue'
import userTasks from '@/components/user/user_tasks.vue'
import userTasksList from '@/components/user/user_tasks_list.vue'
import FotoPlace from '@/components/user/FotoPlace.vue'
// 我的钱包
import myWallet from '@/components/user/my_wallet.vue'
import pay from '@/components/user/wallet/pay.vue'
import paySucceed from '@/components/user/wallet/pay_succeed.vue'
import withdraw from '@/components/user/wallet/withdraw.vue'
import withdrawSucceed from '@/components/user/wallet/withdraw_succeed.vue'


import myRedPackets from '@/components/user/my_red_packets.vue'
import transaction_records from '@/components/user/transaction_records.vue'
import employer from '@/components/user/employer.vue'
import huntsman from '@/components/user/huntsman.vue'
import bonusCash from '@/components/user/bonus_cash.vue'
import clothes from '@/components/user/clothes.vue'
import MyExperience from '@/components/user/my_experience.vue'
import signin from '@/components/user/signin.vue'

// dx
import releaseTask from '@/components/releaseTask/releaseTask.vue'
import taskContent from '@/components/releaseTask/taskContent.vue'

// 设置地址
import newAddress from '@/components/user/userinfo/address/newAddress.vue'
import updataAddress from '@/components/user/userinfo/address/updataAddress.vue'

import Action from '../components/Message/Message_Action.vue'
import Question from '../components/Message/Message_Question.vue'
import Rank from '../components/Message/Message_Rank.vue'
import SchoolZP from '../components/Message/Message_SchoolZP.vue'
import Deploy from '../components/Message/Message_Deploy.vue'
//xiangqingye
import MessagePage from '../components/Message/MessagePage.vue'
import MessagePage2 from '../components/Message/MessagePage2.vue'

import News from '../components/Message/News.vue'
//dxx

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: login
        },
        { path: '/home', component: home, meta: {
            keepAlive: true // 需要被缓存
            } },
        { path: '/home/zhufu', component: zhufu },
        { path: '/home/yaoqing', component: yaoqing },
        { path: '/mission', component: mission,meta: {
            keepAlive: true // 需要被缓存
            } },
        { path: '/mission/missionlist/:id', component: missionlist },
        { path: '/login', component: login },
        { path: '/loginuser', component: loginuser },
        { path: '/loginphone', component: loginphone },
        { path: '/loginphone', component: loginphone },
        { path: '/register', component: register },
        { path: '/loginphone/activation/:id', component: activation },
        { path: '/setpwd', component: setpwd },
        { path: '/agree', component: agree },
        { path: '/car', component: car },
        // 个人中心
        { path: '/user', component: user,meta: {
            keepAlive: true // 需要被缓存
            } },
        // 设置
        { path: '/user/setting_up', component: settingUp },
        { path: '/user/setting_up/about_us', component: aboutUs },
        { path: '/user/setting_up/questions', component: questions },
        //地址
        { path: '/user/per_info/address', component: address },
        { path: '/user/per_info/address/newaddress', component: newAddress },
        { path: '/user/per_info/address/updataaddress/:id', component: updataAddress },

        //个人信息
        { path: '/user/per_info', component: perInfo },
        //用户信息
        { path: '/user/per_info/usermod', component: usermod ,meta: {
            keepAlive: true // 需要被缓存
            }},
        { path: '/user/usermod/alter_content', component: alterContent },
        { path: '/user/usermod/autograph', component: autograph },
        { path: '/user/per_info/authen_info', component: authenInfo },
        { path: '/user/userinfo/securitycode', component: securitycode },
        { path: '/user/userinfo/securitypassword', component: securitypassword },
        { path: '/user/userinfo/original_secucode', component: original_secucode },
        { path: '/user/userinfo/studentcode', component: studentcode },
        { path: '/user/userinfo/area_school', component: area_school },
        { path: '/user/userinfo/native', component: native },
        { path: '/user/userinfo/major', component: major },
        { path: '/user/userinfo/systemclass', component: systemclass },
        { path: '/user/userinfo/pay_num', component: pay_num },
        //认证信息
        { path: '/user/per_info/security_info', component: securityInfo },
        { path: '/user/security_info/securitycode', component: securitycode },
        { path: '/user/security_info/phone_num', component: phoneNum },
        { path: '/user/security_info/verification', component: verification },
        { path: '/user/security_info/changephonenumber', component: changephonenumber },
        //地址
        { path: '/user/per_info/address', component: address },

        { path: '/user/iossued_task', component: iossuedTask },
        { path: '/user/iossued_task/iossued_task_list/:id', component: iossuedTaskList},
        { path: '/user/user_tasks', component: userTasks },
        { path: '/user/user_tasks/user_tasks_list/:id', component: userTasksList },
        { path: '/user/FotoPlace', component: FotoPlace },
        // 我的钱包
        { path: '/user/my_wallet', component: myWallet },
        { path: '/user/my_wallet/pay', component: pay },
        { path: '/user/my_wallet/pay/pay_succeed', component: paySucceed },
        { path: '/user/my_wallet/withdraw', component: withdraw },
        { path: '/user/transaction_records', component: transaction_records },
        //我的红包
        { path: '/user/my_wallet/withdraw/withdraw_succeed', component: withdrawSucceed },
        { path: '/user/my_red_packets', component: myRedPackets },
        { path: '/user/employer', component: employer },
        { path: '/user/huntsman', component: huntsman },
        { path: '/user/bonus_cash', component: bonusCash },
        { path: '/user/signin', component: signin },
        { path: '/user/clothes', component: clothes },
        { path: '/user/clothes/my_experience', component: MyExperience },
        { path: '/user/clothes/my_achievement', component: myAchievement },


        // dx
        { path: '/releasetask', component: releaseTask },
        { path: '/taskcontent', component: taskContent },

        

        { path: '/message', component: Deploy },
        { path: '/message/action', component: Action,meta: {
            keepAlive: true // 需要被缓存
            }  },
        { path: '/message/question', component: Question },
        { path: '/message/rank', component: Rank },
        { path: '/message/schoolzp', component: SchoolZP },
        { path: '/message/deploy', component: Deploy },
        // xiangqingye
        { path: '/message/qpage/:id', component: MessagePage },
        { path: '/message/qpage2/:id', component: MessagePage2 },
        //dxx
        { path: '/news', component: News },
    ]
})