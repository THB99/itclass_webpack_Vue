
import CurriculumInfo from "../components/CurriculumInfo";
import Home from "../components/Home";
import Login from "../components/Login";
import Pay from "../components/Pay";
import Cart from "../components/Cart";
import Ordernopay from "../components/Ordernopay";
import MyCurriculum from "../components/MyCurriculum";
import test from "../components/test";
import test2 from "../components/test2";
import VideoStudy from "../components/VideoStudy";



export const routes=[
  {
    path:'/',
    name:'Home',
    component:Home
  },
    {
      path:'/curriculumInfo/:cid',
      name:'CurriculumInfo',
      component:CurriculumInfo
    },
  {
    path:'/home',
    name:'Home',
    component:Home
  },
  {
    path: '/ordernopay',
    name:'ordernopay',
    component: Ordernopay
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/pay/:orders',
    name: 'pay',
    component: Pay
  },
  {
    path: '/cart',
    name:'cart',
    component: Cart
  },
  {
    path: '/myCurriculum',
    name: 'myCurriculum',
    component: MyCurriculum
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/test2',
    name: 'test2',
    component: test2
  },
  {
    path: '/videoStudy/:id',
    name: 'videoStudy',
    component: VideoStudy
  }
  ]

