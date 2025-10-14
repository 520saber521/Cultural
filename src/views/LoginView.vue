<template>
    <div class="login-bg">
        <el-card class="login-card" shadow="always">
            <div class="brand-area">
                <img src="https://www.dpm.org.cn/favicon.ico" alt="logo" class="brand-logo" />
                <h1>AI文化设计平台</h1>
            </div>

            <el-tabs v-model="activeTab" stretch class="login-tabs">
                <el-tab-pane label="登录" name="login">
                    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form" size="large"
                        status-icon>
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable
                                prefix-icon="el-icon-user" autocomplete="off" />
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" clearable
                                prefix-icon="el-icon-lock" show-password />
                        </el-form-item>

                        <el-form-item class="form-actions">
                            <el-button type="primary" size="large" round style="width: 100%;" @click="login">
                                登录
                            </el-button>
                        </el-form-item>

                        <div class="form-extra">
                            <el-link type="primary" @click="forgotPassword">忘记密码？</el-link>
                            <el-link type="success" @click="switchTab('register')">去注册</el-link>
                        </div>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="注册" name="register">
                    <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="login-form"
                        size="large" status-icon>
                        <el-form-item prop="username">
                            <el-input v-model="registerForm.username" placeholder="请输入用户名" clearable
                                prefix-icon="el-icon-user" autocomplete="off" />
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="registerForm.password" placeholder="请输入密码" type="password" clearable
                                prefix-icon="el-icon-lock" show-password />
                        </el-form-item>

                        <el-form-item class="form-actions">
                            <el-button type="success" size="large" round style="width: 100%;" @click="register">
                                注册
                            </el-button>
                        </el-form-item>

                        <div class="form-extra">
                            <el-link type="primary" @click="switchTab('login')">已有账号，去登录</el-link>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const activeTab = ref('login')

const loginForm = ref({ username: '', password: '' })
const loginRef = ref()
const loginRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

function login() {
    loginRef.value.validate(valid => {
        if (!valid) return
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(
            i => i.username === loginForm.value.username && i.password === loginForm.value.password
        )
        if (user) {
            localStorage.setItem('username', loginForm.value.username)
            localStorage.setItem('avatar', 'https://i.pravatar.cc/150?u=' + loginForm.value.username)
            localStorage.setItem('isLogin', 'true')
            ElMessage.success('登录成功')
            router.push('/profile')
        } else {
            ElMessage.error('用户名或密码错误')
        }
    })
}

const registerForm = ref({ username: '', password: '' })
const registerRef = ref()
const registerRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, message: '用户名至少3位', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码至少6位', trigger: 'blur' }
    ]
}

function register() {
    registerRef.value.validate(valid => {
        if (!valid) return
        let users = JSON.parse(localStorage.getItem('users') || '[]')
        if (users.find(i => i.username === registerForm.value.username)) {
            ElMessage.error('此用户名已注册')
            return
        }
        users.push({ username: registerForm.value.username, password: registerForm.value.password })
        localStorage.setItem('users', JSON.stringify(users))
        ElMessage.success('注册成功，请登录')
        registerForm.value.username = ''
        registerForm.value.password = ''
        activeTab.value = 'login'
    })
}

function switchTab(tab) {
    activeTab.value = tab
}

function forgotPassword() {
    ElMessage.info('请联系管理员重置密码。')
}
</script>

<style scoped>
.login-bg {
    min-height: 100vh;
    /* 背景图片设置 */
    background-image: url('E:\Cultural\ai-culture-design\public\background.png');
    background-repeat: no-repeat;
    background-size: cover;
    /* 背景图铺满整个容器 */
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.login-card {
    width: 380px;
    padding: 40px 30px;
    border-radius: 12px;
    box-shadow: 0 12px 30px rgb(62 99 221 / 0.15);
    background: #fff;
}

.brand-area {
    text-align: center;
    margin-bottom: 30px;
}

.brand-logo {
    width: 60px;
    margin-bottom: 12px;
}

.login-tabs>>>.el-tabs__header {
    border-bottom: none;
}

.login-form {
    margin-top: 10px;
}

.form-actions {
    margin-top: 20px;
}

.form-extra {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
}

.el-button {
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1.2px;
}
</style>
