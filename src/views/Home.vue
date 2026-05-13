<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
                <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUrl('user')" class="user"/>
                    <div class="user-info">
                        <p class="user-info-admin">Admin</p>
                        <p class="user-info-p">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2024-06-30</span></p>
                    <p>上次登录地点:<span>北京</span></p>
                </div>
                </el-card>

                <el-card class="user-table" shadow="hover">
                    <el-table :data="tableData" border>
                        <el-table-column v-for="(value,key) in tableLabel" 
                        :prop="key" :label="value" :key="key">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
    </el-row>
</template>

<script setup>
import { getImageUrl } from '@/utils/image.js'
import { ref } from 'vue'; 

// 样式开发临时数据
const tableData = ref([
    {
      name: "钱包一",
      todayBuy: 100,
      monthBuy: 200,
      totalBuy: 300,
    },
    {
      name: "钱包二",
      todayBuy: 100,
      monthBuy: 200,
      totalBuy: 300,
    }
])

const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})
</script>

<style scoped lang="less">
.home{
height:100%;
overflow:hidden;
   .user{
      display:flex;
      align-items:center;
      border-bottom:1px solid #ccc;
      margin-bottom:20px;
      img{
         width:150px;
         height:150px;
         border-radius:50%;
         margin-right:40px; 

      }
      .user-info{
         p{
            line-height:40px;
         }
         .user-info-p{
            color:#999;
         }
         .user-info-admin{
            font-size:35px
         }
      }
   }
   .login-info{
      p{
         line-height:30px;
         font-size:14px;
         color:#999;
         span{
            color:#666;
            margin-left:60px;
         }
      }
   }
}
.user-table{
 margin-top: 20px;
}
</style>