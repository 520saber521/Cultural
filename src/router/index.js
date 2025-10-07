// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 1. 导入页面组件（就是你提到的这部分代码）
import HomeView from '../views/HomeView.vue';
import CultureLibraryView from '../views/CultureLibraryView.vue';
import AiDesignView from '../views/AiDesignView.vue';
import WorksView from '../views/WorksView.vue';

// 2. 定义路由规则（关联路径和组件）
const routes = [
    { path: '/', component: HomeView }, // 访问根路径时，显示 HomeView 组件
    { path: '/culture', component: CultureLibraryView }, // 访问 /culture 时，显示文化库组件
    { path: '/design', component: AiDesignView }, // 访问 /design 时，显示 AI 设计组件
    { path: '/works', component: WorksView } // 访问 /works 时，显示作品组件
];

// 3. 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 4. 导出路由实例（供 main.js 使用）
export default router;