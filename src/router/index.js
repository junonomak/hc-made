import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

// 解决路由爆红
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}



const Home = () => import('../views/home/Home.vue')
const LookBookItems = () => import('../views/lookBook/lookBookChild/LookBookItems.vue')
const ShowGoodsList = () => import('../views/onelineStore/ShowGoodsList.vue')
const ShowGoodsDetail = () => import('../views/onelineStore/ShowGoodsDetail.vue')
const UserCenter = () => import('../views/user/UserCenter.vue')
const Login = () => import('../views/user/Login.vue')
const Register = () => import('../views/user/Register.vue')
const AddGoods = () => import('../views/addGoods/AddGoods.vue')
const AddLookBooks = () => import('../views/addGoods/AddLookBooks.vue')
const Cart = () => import('../views/user/Cart.vue')

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
    component: UserCenter,
    beforeEnter: (to, from, next) => {
    if(store.state.isUserLogin === false){
      if(to.path == '/usercenter'){
        next({path : '/login'})
      }
    }else if(store.state.isUserLogin === true){
      next()
    }
    }
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
  },
  {
    path: '/addlookbooks',
    component: AddLookBooks
  },
  {
    path: '/cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if(store.state.isUserLogin === false){
        if(to.path == '/cart'){
          next({path : '/login'})
        }
      }else if(store.state.isUserLogin === true){
        next()
      }
      }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
