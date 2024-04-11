import { createRouter, createWebHistory } from "vue-router";
import store from "../store"; 

const router = createRouter({
    
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
    {
        path: '/auth',
        component: () => import('../components/AuthPage.vue'),
        beforeEnter: (to, from, next) => {
            const USER_TOKEN = localStorage.getItem('token');
            if(USER_TOKEN){
                next('/');
            }
            else{
                next();
            }
        }
    },
    {
        path: '/',
        component: () => import('../components/BoardsStatus.vue'),
        beforeEnter: (to, from, next) => {
            const USER_TOKEN = localStorage.getItem('token');
            if (!USER_TOKEN) {
                next('/auth');
            }
            else{
                next();
            }
        }
    },
    {
        path: '/board/:id',
        component: () => import('../components/KanbanBoard.vue'),
        beforeEnter: async (to, from, next) => {
            const BOARD_ID = to.params.id;
            const USER_TOKEN = localStorage.getItem('token');
            
            if (!USER_TOKEN) {
                next('/auth');
            }
            else{
                try {
                    await store.dispatch("statusModule/openStatusBoard", {boardId: BOARD_ID});
                    next();
                } catch {
                    next("/");
                }
            }
          },
    },
]
})



export default router