<template>
  <div id="app">
    <nav :class="['navbar', { sticky: isSticky }]">
      <router-link v-for="item in menu" :key="item.to" :to="item.to" class="nav-item" active-class="active">
        {{ item.title }}
      </router-link>
    </nav>
    <router-view></router-view>
    <!-- 绑定日期 -->

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const menu = [
  { title: '首页', to: '/' },
  { title: '文化库', to: '/culture' },
  { title: 'AI 设计', to: '/design' },
  { title: '我的作品', to: '/works' },
];

const isSticky = ref(false);


const handleScroll = () => {
  isSticky.value = window.scrollY > 60;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px 30px;
  margin: 0 auto 20px auto;
  max-width: 1200px;
  /* 设置最大宽度 */
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease;
  z-index: 1000;
}

.sticky {
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  /* 使固定定位时居中 */
  max-width: 1200px;
  /* 保持同样的宽度 */
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  animation: slideDown 0.3s ease forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

.nav-item {
  color: black;
  margin: 0 20px;
  font-family: 'Helvetica Rounded', Arial, sans-serif;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.nav-item:hover {
  color: #666600;
  text-shadow: 2px 2px 5px rgba(255, 255, 0, 0.8);
}

.router-link-active {
  color: #a67c00 !important;
  text-decoration: underline;
  font-weight: 700;
  text-shadow: 2px 2px 6px rgba(166, 124, 0, 0.9);
}
</style>
