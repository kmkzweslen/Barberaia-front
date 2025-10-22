import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue'; // Não esqueça de criar esse arquivo também
import NossaMarca from '../views/NossaMarca.vue';
import BarbaCabelo from '../views/BarbaCabelo.vue';
import Agende from '../views/Agende.vue';
import Login from '../views/Login.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/nossa-marca', name: 'nossaMarca', component: NossaMarca },
  { path: '/barba-cabelo', name: 'barbaCabelo', component: BarbaCabelo },
  { path: '/agende', name: 'agende', component: Agende },
  { path: '/login', name: 'login', component: Login },
  { path: '/admin', name: 'admin', component: AdminDashboard },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
