<template>
    <el-aside :width="width">
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
        >
        <h3 v-show="!isCollapse">通用后台管理系统</h3>
        <h3 v-show="isCollapse">后台</h3>
        <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path">
          <component :is="item.icon" class = "icons"></component>
          <span>{{item.label}}</span>
        </el-menu-item>      

        <!-- 有子菜单项 -->
        <el-sub-menu :index="item.path" v-for="item in hasChildren" :key="item.path">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subItem.path">
              <component :is="subItem.icon" class = "icons"></component>
              <span>{{subItem.label}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

      </el-menu>
    </el-aside>
</template>

<script setup> 
import { isCollapsible } from "element-plus/es/components/splitter/src/hooks/usePanel.mjs";
import {ref, computed} from "vue";
import { useAllDataStore } from "@/stores";
import { storeToRefs } from "pinia";
    // 菜单折叠功能
    const allDataStore = useAllDataStore();
    const isCollapse = computed(() => allDataStore.state.isCollapse);
    const width = computed(() => allDataStore.state.isCollapse ? '64px' : '180px');
    //菜单折叠组合式版本
    // const {isCollapse} = storeToRefs(allDataStore);
    // const width = computed(() => isCollapse.value ? '64px' : '180px');
    // 渲染菜单列表
    const list =ref([
      	{
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'house',
          url: 'Home'
      	},
        {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'video-play',
            url: 'Mall'
        },
        {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'User'
        },
        {
            path: 'other',
            label: '其他',
            icon: 'location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Page1'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'Page2'
                }
            ]
        }
])
    //分类菜单选项用于v-for遍历
    const noChildren = computed(() => list.value.filter(item => !item.children))
    const hasChildren =computed(() => list.value.filter(item => item.children))

    const clickMenu=(item)=>{
        router.push(item.path)
}
</script>

<style lang="less" scoped>
    .icons{
        width: 18px;
        height: 18px;
        margin-right: 5px;
    
    }
    .el-menu{
        border-right: none;
        h3{
            color: #fff;
            text-align: center;
            line-height: 48px;
        }
    } 
    .el-aside{
        background-color: #545c64;
        height: 100%;
    }
</style>