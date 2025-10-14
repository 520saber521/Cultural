// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 1. 导入页面组件
import HomeView from '../views/HomeView.vue';
import CultureLibraryView from '../views/CultureLibraryView.vue';
import AiDesignView from '../views/AiDesignView.vue';
import WorksView from '../views/WorksView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';

// 2. 定义路由规则
const routes = [
    { path: '/', component: HomeView }, // 访问根路径时，显示 HomeView
    { path: '/culture', component: CultureLibraryView },
    { path: '/design', component: AiDesignView },
    { path: '/works', component: WorksView },
    { path: '/login', component: LoginView }, // 登录页面路由
    { path: '/profile', component: ProfileView },
];

// 3. 创建并导出路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
