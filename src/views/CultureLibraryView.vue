<template>
    <div class="culture-container">
        <!-- 筛选区（用 Element Plus 表单组件） -->
        <el-form inline :model="filterForm" class="filter-form">
            <el-form-item label="地域">
                <el-select v-model="filterForm.region" placeholder="全部">
                    <el-option label="江西" value="江西"></el-option>
                    <el-option label="江苏" value="江苏"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="filterForm.category" placeholder="全部">
                    <el-option label="手工艺" value="手工艺"></el-option>
                    <el-option label="建筑" value="建筑"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleFilter">筛选</el-button>
            </el-form-item>
        </el-form>

        <!-- 元素列表（用卡片+复选框） -->
        <div class="element-list">
            <el-card v-for="item in filteredElements" :key="item.id" class="element-card">
                <div class="card-content">
                    <el-checkbox v-model="selectedElements" :label="item.id"></el-checkbox>
                    <img :src="item.imgUrl" class="element-img" alt="元素图片">
                    <div class="element-info">
                        <h3>{{ item.name }}</h3>
                        <p>{{ item.region }} · {{ item.category }}</p>
                    </div>
                </div>
            </el-card>
        </div>

        <!-- 批量操作按钮 -->
        <div class="batch-actions">
            <el-button type="success" @click="$router.push('/design')" :disabled="selectedElements.length === 0">
                选中 {{ selectedElements.length }} 个元素，去设计
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 筛选表单数据
const filterForm = ref({ region: '', category: '' });
// 选中的元素 ID
const selectedElements = ref([]);
// 原始数据
const allElements = ref([
    { id: 1, name: '景德镇陶瓷', region: '江西', category: '手工艺', imgUrl: 'https://picsum.photos/id/1019/300/200' },
    { id: 2, name: '苏州园林', region: '江苏', category: '建筑', imgUrl: 'https://picsum.photos/id/1017/300/200' }
]);
// 筛选后的数据
const filteredElements = computed(() => {
    return allElements.value.filter(item => {
        const matchRegion = !filterForm.value.region || item.region === filterForm.value.region;
        const matchCategory = !filterForm.value.category || item.category === filterForm.value.category;
        return matchRegion && matchCategory;
    });
});
// 筛选触发
const handleFilter = () => { /* 已通过 computed 自动响应 */ };
</script>