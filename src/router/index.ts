import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import BarmakerDashboard from '../views/BarmakerDashboard.vue';

// import CartView from '../views/CartView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
//   { path: '/panier', name: 'cart', component: CartView },
  {path : '/register', component: Register},
   {path : '/login', component: Login},
    {
    path: '/barmaker/dashboard',
    name: 'BarmakerDashboard',
    component: BarmakerDashboard,
    meta: { requiresAuth: true, role: 'barmaker' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;