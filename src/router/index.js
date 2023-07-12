import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'signin',
        path: '/sign-in',
        component: () => import('@/views/sign-in-page.vue')
    },
    {
        name: 'signup',
        path: '/sign-up',
        component: () => import('@/views/sign-up-page.vue')
    },
    {
        name: 'home',
        path: '/',
        component: () => import('@/views/home-page.vuetete')
    },
    {
        name: 'notfound',
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
