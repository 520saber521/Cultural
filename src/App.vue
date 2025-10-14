<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const menu = [
  { title: '首页', to: '/' },
  { title: '文化库', to: '/culture' },
  { title: 'AI 设计', to: '/design' },
  { title: '我的作品', to: '/works' }
]

const isSticky = ref(false)
const isLogin = ref(false)
const username = ref('')
const avatar = ref('https://i.pravatar.cc/150')  // 默认头像

onMounted(() => {
  window.addEventListener('scroll', () => {
    isSticky.value = window.scrollY > 60
  })
  updateUserInfo()
})

function updateUserInfo() {
  isLogin.value = localStorage.getItem('isLogin') === 'true';
  username.value = localStorage.getItem('username') || '';
  avatar.value = localStorage.getItem('avatar') || 'https://i.pravatar.cc/150';
}
onMounted(() => {
  updateUserInfo();
});


function goLogin() {
  router.push('/login')
}

function logout() {
  localStorage.removeItem('isLogin')
  localStorage.removeItem('username')
  localStorage.removeItem('avatar')
  isLogin.value = false
  ElMessage.success('已退出登录')
  router.push('/login')
}

function goProfile() {
  router.push('/profile')
}
</script>

<template>
  <nav :class="['navbar', { sticky: isSticky }]">
    <div class="nav-menu">
      <router-link v-for="item in menu" :key="item.to" :to="item.to" class="nav-item" active-class="active">
        {{ item.title }}
      </router-link>
    </div>

    <div v-if="!isLogin" class="login-area">
      <el-button type="primary" @click="goLogin">登录</el-button>
    </div>

    <div v-else class="user-area">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar :src="avatar" />
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goProfile">个人主页</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
  <router-view />
</template>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px 30px;
  margin: 0 auto 20px auto;
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease;
  z-index: 1000;
}

.nav-menu {
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 30px;
}

.nav-item {
  color: black;
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

.login-area {
  margin-left: auto;
}

.user-area {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.el-avatar {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 600;
}
</style>
