<template>
    <div class="profile-page">
        <div class="profile-header">
            <el-avatar :src="avatar" size="90" />
            <div class="user-info">
                <h2>{{ nickname }}</h2>
                <p class="username">账号: {{ username }}</p>
                <el-input type="textarea" v-model="signature" maxlength="100" placeholder="编辑个性签名..." rows="3"
                    @blur="saveSignature" />
            </div>
        </div>

        <div class="user-stats">
            <div class="stat-item">
                <strong>{{ collections.length }}</strong>
                <p>收藏</p>
            </div>
            <div class="stat-item">
                <strong>{{ totalLikes }}</strong>
                <p>点赞</p>
            </div>
            <div class="stat-item">
                <strong>{{ works.length }}</strong>
                <p>我的作品</p>
            </div>
        </div>

        <div class="collections-list">
            <h3>我的收藏</h3>
            <el-card v-for="item in collections" :key="item.id" class="collection-card">
                <p>{{ item.name }}</p>
            </el-card>
        </div>

        <div class="works-list">
            <h3>我的作品</h3>
            <el-card v-for="item in works" :key="item.id" class="work-card">
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
                <el-button size="small" @click="viewWork(item)">查看详情</el-button>
            </el-card>
        </div>

        <el-button type="danger" @click="logout" class="logout-btn">
            退出登录
        </el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const nickname = ref('')
const avatar = ref('https://i.pravatar.cc/150')
const signature = ref('这家伙很懒，什么个性签名都没有留下。')

// 模拟收藏数据
const collections = ref([
    { id: 1, name: '用户收藏项目A' },
    { id: 2, name: '用户收藏项目B' },
    { id: 3, name: '用户收藏项目C' }
])

// 模拟点赞数量统计
const totalLikes = ref(0)

// 模拟作品数据
const works = ref([
    { id: 1, title: '作品A', description: '这是作品A的简介。' },
    { id: 2, title: '作品B', description: '这是作品B的简介。' },
    { id: 3, title: '作品C', description: '这是作品C的简介。' }
])

onMounted(() => {
    username.value = localStorage.getItem('username') || '用户'
    nickname.value = localStorage.getItem('nickname') || username.value
    avatar.value = localStorage.getItem('avatar') || 'https://i.pravatar.cc/150'
    signature.value = localStorage.getItem('signature') || signature.value
    totalLikes.value = Math.floor(Math.random() * 1000)
})

// 个性签名保存本地
function saveSignature() {
    localStorage.setItem('signature', signature.value)
}

// 查看作品详情（模拟）
function viewWork(work) {
    alert(`查看作品: ${work.title}\n详情: ${work.description}`)
}

// 退出登录
function logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('nickname')
    localStorage.removeItem('avatar')
    localStorage.removeItem('signature')
    localStorage.removeItem('isLogin')
    router.push('/login')
}
</script>

<style scoped>
.profile-page {
    padding: 30px;
    max-width: 700px;
    margin: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgb(0 0 0 / 10%);
    font-family: "Helvetica Rounded", Arial, sans-serif;
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 20px;
}

.user-info {
    flex: 1;
}

.username {
    color: #777;
    margin-bottom: 10px;
}

.el-input__inner {
    border-radius: 10px;
    font-size: 14px;
    resize: none;
}

.user-stats {
    display: flex;
    gap: 40px;
    margin: 30px 0;
    font-weight: 600;
    font-size: 18px;
    justify-content: center;
    color: #333;
}

.stat-item p {
    font-weight: 400;
    font-size: 14px;
    color: #666;
    margin-top: 6px;
}

.collections-list,
.works-list {
    margin-bottom: 40px;
}

.collection-card,
.work-card {
    margin-bottom: 12px;
    padding: 10px 15px;
    font-size: 15px;
    cursor: pointer;
    transition: box-shadow 0.3s;
}

.collection-card:hover,
.work-card:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.logout-btn {
    width: 100%;
}
</style>
