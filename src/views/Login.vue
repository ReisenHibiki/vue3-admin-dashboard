<template>
        <div class="body-login">
            <el-form class="login-container" :model="loginForm">
                <h1>欢迎，请登录</h1>
                <el-form-item>
                    <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入密码" v-model="loginForm.password" type="password" @keyup.enter="handleLogin"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="btn-box">
                    <el-button width="100%" type="primary" @click="handleLogin">登录</el-button>
                    </div>
                </el-form-item>

            <!-- 双账号展示方便面试官查看我的Demo -->
            <div class="demo-accounts">
                <div class="item">
                    <span class="title">管理员</span>
                    <span class="text">账号：admin</span>
                    <span class="text">密码：admin</span>
                </div>
                <div class="item">
                    <span class="title">普通用户</span>
                    <span class="text">账号：lele</span>
                    <span class="text">密码：lele</span>
                </div>
            </div>

            </el-form>

        </div>
</template>

<script setup>
import {reactive,getCurrentInstance} from "vue";
import { useAllDataStore } from "@/stores";
import { useRouter } from "vue-router";

const loginForm = reactive({
    username: '',
    password: ''
})
const router = useRouter();
const allDataStore = useAllDataStore();
const {proxy} = getCurrentInstance();
const handleLogin = async () => {
    const res = await proxy.$api.getMenu(loginForm)
    // 获得的菜单列表存储到pinia中
    allDataStore.updateMenuList(res.menuList);
    allDataStore.state.token = res.token;
    allDataStore.state.username = res.username;
    // 根据菜单列表动态添加路由
    allDataStore.addMenu(router);
    // 重置tag数据
    allDataStore.clearTags();
    router.push("/home");
}

</script>

<style lang="less" scoped>

.body-login{
    height: 100%;
    width: 100%;
    background-image: url("@/assets/images/background.png");
    background-size: cover;
    overflow: hidden;
}
.login-container{
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 25px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 250px auto;
    h1{
        text-align: center;
        margin-bottom: 20px;
        color: #505;
    }
    :deep(.el-form-item__content){
        justify-content: center;
    }
    // 另一种居中写法
    // .btn-box{
    // width: 100%;
    // text-align: center;
    // }

.demo-accounts {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;

        .item {
            width: 48%;
            text-align: center;
            font-size: 12px;

            .title {
                display: block;
                font-weight: bold;
                margin-bottom: 5px;
                color: #333;
            }

            .text {
                display: block;
                color: #666;
                line-height: 1.4;
            }
        }
    }
}

</style>