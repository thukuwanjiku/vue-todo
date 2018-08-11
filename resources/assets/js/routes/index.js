import  Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);


const routes = [

    {
        path: '/',
        component: resolve => {
            require(['./../components/Todos.vue'],resolve)
        },
        name: 'todos'
    },
    {
        path: '/forms',
        component: resolve => {
            require(['./../components/Forms.vue'],resolve)
        },
        name: 'forms'
    }

];

export default new VueRouter({
    mode:"history",
    routes
});