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
    allDataStore.token = res.token;
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
}

</style>