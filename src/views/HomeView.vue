<template>
    <div class="home-container">
        <!-- 轮播图（用 Element Plus 轮播组件） -->
        <el-carousel height="400px" indicator-position="outside">
            <el-carousel-item v-for="item in carouselData" :key="item.id">
                <img :src="item.imgUrl" class="carousel-img" alt="文化元素">
            </el-carousel-item>
        </el-carousel>

        <!-- 功能入口（用 Element Plus 按钮） -->
        <div class="action-buttons">
            <el-button type="primary" size="large" @click="$router.push('/culture')" icon="Search">
                浏览文化库
            </el-button>
            <el-button type="success" size="large" @click="$router.push('/design')" icon="Brush">
                开始 AI 设计
            </el-button>
        </div>

        <!-- 推荐文化元素（用卡片组件） -->
        <div class="recommend-section">
            <h2>热门文化元素</h2>
            <div class="card-grid">
                <el-card v-for="item in recommendElements" :key="item.id" class="culture-card"
                    @click="$router.push(`/design?elementId=${item.id}`)">
                    <template #header>{{ item.name }}</template>
                    <img :src="item.imgUrl" class="card-img" alt="元素图片">
                    <div class="card-info">
                        <span>{{ item.region }} · {{ item.category }}</span>
                    </div>
                </el-card>
            </div>
        </div>
    </div>

</template>

<script setup>
// 示例数据
const carouselData = [
    { id: 1, imgUrl: 'https://picsum.photos/id/1019/1200/400' },
    { id: 2, imgUrl: 'https://picsum.photos/id/1017/1200/400' }
];
const recommendElements = [
    { id: 1, name: '景德镇陶瓷', region: '江西', category: '手工艺', imgUrl: 'https://picsum.photos/id/1019/300/200' }
];
</script>

<style scoped>
/* 补充自定义样式 */
.carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.action-buttons {
    margin: 30px 0;
    text-align: center;
    gap: 20px;
    display: flex;
    justify-content: center;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.culture-card {
    cursor: pointer;
    transition: transform 0.3s;
}

.culture-card:hover {
    transform: translateY(-5px);
}

.card-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}
</style>