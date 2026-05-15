<template>
    <div class="tags">
    <el-tag 
    v-for="(tag, index) in tags" 
    :key="tag.name"
    :closable="tag.name !== 'home'"
    :effect="route.name === tag.name ? 'dark' : 'plain'"
    @click="handleMenu(tag)"
    @close="handleClose(tag, index)"
    >
    {{ tag.label }}
    </el-tag>
</div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import { useAllDataStore } from "@/stores";
const allDataStore = useAllDataStore();

const tags = computed(() => allDataStore.state.tags);
const route = useRoute();
const router = useRouter();

const handleMenu = (item) => {
    allDataStore.selectMenu(item);
    router.push(item.name);
}
const handleClose = (tag, index) => {
// 通过pinia管理
    allDataStore.updateMenu(tag);
// 如果点击的关闭的tag 不是对应的当前页面
if(tag.name !== route.name) return
// 删除后跳回上一个访问的界面
    // 如果关闭的标签页是最后一个
    if(index === allDataStore.state.tags.length){
    allDataStore.selectMenu(tags.value[index-1])
    router.push(tags.value[index-1].name)
    }else{
    // 如果关闭的标签页不是最后一个
    allDataStore.selectMenu(tags.value[index])
    router.push(tags.value[index].name)
    }
}
</script>

<style lang="less" scoped>
.tags{
  margin: 20px 0 0 20px;
}
.el-tag{
  margin-right: 10px;
}
</style>