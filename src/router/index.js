import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

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
        component: () => import('@/views/home-page.vue')
    },
    {
        name: 'dictionary',
        path: '/dictionary',
        component: () => import('@/views/dictionary-page.vue')
    },
    {
        name: 'test',
        path: '/test',
        component: () => import('@/views/test-page.vue')
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

router.beforeEach(async (to, from) => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
        if (to.name === 'signin' || to.name === 'signup') {
            return { name: 'home' };
        }
    } else {
        if (to.name !== 'signin' && to.name !== 'signup') {
            return { name: 'signin' };
        }
    }
})

export default router;
