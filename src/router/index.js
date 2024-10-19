import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import LogoutView from '@/views/LogoutView.vue'
import AddBookView from '@/views/AddBookView.vue'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/Firelogin',
    name: 'Firelogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/Logout',
    name: 'Logout',
    component: LogoutView
  },
  {
    path: '/AddBook',
    name: 'AddBook',
    component: AddBookView
  }
]


export default router
