/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// import Vue from 'vue'
// import Router from 'vue-router'
import {
  Toast
} from 'vant';

Vue.use(VueRouter).use(Toast)

let base = `${process.env.BASE_URL}` // 动态获取二级目录

const router = new VueRouter({
  // 使用真实url
  mode: 'history',
  base: base,
  routes: [{
      path: '/',
      name: 'redirect',
      component: () => import('./views/Redirect.vue'),
    }, {
      path: '/sLogin',
      name: 'studentLogin',
      component: () => import('./views/StudentLogin.vue'),
    }, {
      path: '/tLogin',
      name: 'teacherLogin',
      component: () => import('./views/TeacherLogin.vue'),
    }, {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/student/Register.vue'),
    },
    {
      path: '/pickRole',
      name: 'pickRole',
      component: () => import('./views/PickRole.vue'),
    }, {
      path: '/s',
      name: 'student',
      component: () => import('./views/Student.vue'),
      children: [
        // Home 会被渲染在 Main 的 <router-view> 中作为首屏
        {
          path: 'home',
          component: () => import('./views/student/Home.vue'),
        },
        // ...其他子路由
        {
          path: 'radar',
          component: () => import('./views/student/Radar.vue')
        },
        {
          path: 'user',
          component: () => import('./views/student/User.vue')
        }, {
          path: 'studentInfo',
          component: () => import('./views/student/StudentInfo.vue')
        },
        {
          path: 'selectCourse',
          component: () => import('./views/student/SelectCourse.vue')
        },
        {
          path: 'myWorks',
          component: () => import('./views/student/MyWorks.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'notify',
          component: () => import('./views/student/Notify.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'activity',
          component: () => import('./views/student/Activity.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'activityintroduce',
          component: () => import('./views/student/ActivityIntroduce.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'choiceTeam',
          component: () => import('./views/student/ChoiceTeam.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'addTeam',
          component: () => import('./views/student/AddTeam.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'myOrder',
          component: () => import('./views/student/MyOrder.vue'),
          meta: {
            keepAlive: true
          }
        }, {
          path: 'myCourse',
          component: () => import('./views/student/MyCourse.vue'),
          meta:{
            keepAlive:true
          }
        }, {
          path: 'workWall',
          component: () => import('./views/student/WorkWall.vue'),
        },
        {
          path: 'team',
          component: () => import('./views/student/Team.vue'),
        },
        {
          path: 'evaluation',
          component: () => import('./views/student/Evaluation.vue'),
          children: [{
              // 家庭评价会作为首页显示
              path: '',
              component: () => import('./views/student/FamilyEvaluation.vue'),
              meta: {
                keepAlive: true
              }
            },
            {
              path: 'studentEvaluation',
              component: () => import('./views/student/StudentEvaluation.vue'),
              meta: {
                keepAlive: true
              }
            },
            {
              path: 'friendsEvaluation',
              component: () => import('./views/student/FriendsEvaluation.vue'),
              meta: {
                keepAlive: true
              }
            }
          ]
        },
        {
          path: 'declare',
          component: () => import('./views/student/Declare.vue'),
          meta: {
            keepAlive: true
          }
        }
      ]
    }, {
      path: '/t',
      name: 'teacher',
      component: () => import('./views/Teacher.vue'),
      children: [
        // Home 会被渲染在 Main 的 <router-view> 中作为首屏
        {
          path: 'home',
          component: () => import('./views/teacher/Home.vue'),
          children: [{
              path: "",
              component: () => import('./views/teacher/Remark.vue'),
              meta: {
                keepAlive: true,
              }
            },
            {
              path: "rankList",
              component: () => import('./views/teacher/RankList.vue'),
              meta: {
                keepAlive: true,
              }
            },
            {
              path: "activityWall",
              component: () => import('./views/teacher/ActivityWall.vue')
            },
            {
              path: "inform",
              component: () => import('./views/teacher/Inform.vue'),
              meta: {
                keepAlive: true,
              }
            },
            {
              path: "evaluationAudit",
              component: () => import('./views/teacher/EvaluationAudit.vue'),
              meta: {
                keepAlive: true,
              }
            },
            {
              path:"classMangement",
              component:() => import('./views/teacher/ClassMangement.vue')
            }
          ]
        },
        // ...其他子路由
        {
          path: 'course',
          component: () => import('./views/teacher/Course.vue'),
          meta: {
            keepAlive: true,
          }
        },
        {
          path: 'attendance',
          component: () => import('./views/teacher/Attendance.vue'),
          meta: {
            keepAlive: true,
          }
        },
        {
          path: 'works',
          component: () => import('./views/teacher/Works.vue')
        },
        {
          path: 'user',
          component: () => import('./views/teacher/User.vue'),
          meta: {
            keepAlive: true,
          }
        },
      ],
    },
    // 不要底部栏的就如下面一样注册，注意要带对应的身份，方便用路由的钩子
    { //教案审批
      path: '/t/teachPlan',
      component: () => import('./views/teacher/TeachPlan.vue')
    }, { //督导打分
      path: '/t/teachScore',
      component: () => import('./views/teacher/TeachScore.vue')
    }, { //重置学生密码
      path: '/t/resetStudentPassword',
      component: () => import('./views/teacher/ResetStudentPassword.vue')
    }, {
      path: '/t/requestPass',
      component: () => import('./views/teacher/RequestPass.vue')
    }, {
      path: '/t/leaveRequest',
      component: () => import('./views/teacher/LeaveRequest.vue')
    }, {
      //好友管理
      path: '/s/addFriend',
      component: () => import('./views/student/AddFriend.vue')
    },{
      //下载中转页
      path:'/s/downloadPopup',
      name:'downloadPopup',
      component: () => import('./views/student/DownloadPopup')
    },{
      //广告页
      path:'/s/advertisement',
      name:'advertisement',
      component:() => import('./views/student/Advertisement')
    },{
      //404页面！！！！之后所有需要注册的路由都写在这里上面！！！
      path:'*',
      name:'notFound',
      component:() => import('./views/NotFound')
    }
  ]
})
// 处理某段chunk未能加载的error
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

// 路由守卫，登录鉴权
// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(window.localStorage.getItem("user"))
//   // 前往登录页自己就放行
//   if (to.path == ['/','/pickRole','/s/myOrder']) {
//     next();
//   } else {
//     // 没登录
//     if (!user) {
//       Toast.fail('您还没有登录')
//       next('/');
//     } else {
//       // 已登录放行
//       next()
//     }
//   }
// })
// 路由守卫，清除微信openid的单例
// router.afterEach((to, from) => {
//   if(from.path == '/' && to.path != '/' &&  window.localStorage.getItem("authorize")){
//     window.localStorage.setItem("authorize",false)
//   }
// })

export default router;