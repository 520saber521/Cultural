<template>
  <div id="app">
    <!-- 导航栏（临时简单实现，后续可优化为组件） -->
    <nav style="background: #3e63dd; padding: 15px; margin-bottom: 20px;">
      <router-link to="/" style="color: white; margin-right: 20px;">首页</router-link>
      <router-link to="/culture" style="color: white; margin-right: 20px;">文化库</router-link>
      <router-link to="/design" style="color: white; margin-right: 20px;">AI 设计</router-link>
      <router-link to="/works" style="color: white;">我的作品</router-link>
    </nav>

    <!-- 路由出口：页面内容会在这里渲染 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
// 暂时无需额外逻辑
</script>

<style scoped>
/* 可添加局部样式，或在 style.css 中写全局样式 */
</style>