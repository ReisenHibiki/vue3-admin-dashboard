<template>
    <!-- 面包屑导航和用户头像练手 -->
    <div class = "header">
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <component is="menu" class="icons"></component>
            </el-button>

            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

                <el-breadcrumb-item
                v-for="item in breadcrumbList"
                :key="item.path"
                :to="item.path"
                class="bread"
                >
                {{ item.meta.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')" class="user" alt="User"/>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup> 
    import {ref, computed} from "vue";
    import { useAllDataStore } from "@/stores";
    import { storeToRefs } from "pinia";
    import { getImageUrl } from '@/utils/image.js'
    import { useRouter, useRoute } from "vue-router";

    // 菜单折叠功能
    const allDataStore = useAllDataStore();
    const handleCollapse = () => {
        allDataStore.state.isCollapse = !allDataStore.state.isCollapse;
    }

    const router = useRouter();
    const handleLogout = () => {
        allDataStore.clean();
        router.push("/login");
    }

    // 自动生成面包屑
    const route = useRoute();
    const breadcrumbList = computed(() => {
    return route.matched.filter(item => {
        return item.meta?.label && item.meta.label !== "首页";
    })
    })
</script>

<style lang="less" scoped>
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
        background-color: #333;
    }
    .icons{
        width: 20px;
        height: 20px;
    }
    .l-content{
        display: flex;
        align-items: center;
        .el-button{
            margin-right: 20px;
        }
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    //使用一下样式穿透，修改UI库面包屑组件的样式
    :deep(.bread span){
        color: #fff !important;
        cursor: pointer !important;
    }
</style>