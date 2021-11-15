import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const LookBookItems = () => import('../views/lookBook/lookBookChild/LookBookItems.vue')
const ShowGoodsList = () => import('../views/onelineStore/ShowGoodsList.vue')
const ShowGoodsDetail = () => import('../views/onelineStore/ShowGoodsDetail.vue')
const UserCenter = () => import('../views/user/UserCenter.vue')
const Login = () => import('../views/user/Login.vue')
const Register = () => import('../views/user/Register.vue')
const AddGoods = () => import('../views/addGoods/AddGoods.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/lookbook/:routerName',
    component: LookBookItems
  }, 
  {
    path: '/onelinestore/:routerName',
    component: ShowGoodsList
  }, 
  {
    path: '/onelinestore',
    redirect: '/onelinestore/allgoods'
  },
  {
    path: '/onelinestore/goodsdetail/:goodsid',
    component: ShowGoodsDetail
  },
  {
    path: '/usercenter',
    component: UserCenter
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/addGoods',
    component: AddGoods
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
