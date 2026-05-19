<template>
    <div class="exception">
        <img :src="getImageUrl('404')" alt="404 Not Found" />
        <el-button @click="goBack" class="btn-home">回到上一个页面</el-button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getImageUrl } from '../utils/image';

const router = useRouter()
const goBack = () => {
  if (window.history.length <= 1) {
    // 如果没有上一页，直接跳首页
    router.push({ name: 'home' })
  } else {
    router.back()
  }
}
</script>

<style lang="less" scoped>
.exception {
position: relative;
img {
    width: 100%;
    height: 100vh;
}
.btn-home {
    position: absolute;
    left: 50%;
    bottom: 200px;
    margin-left: -150px; 
    width: 300px;
    height: 80px;
    font-size: 28px;
    border-width: 4px;
}
}
</style>