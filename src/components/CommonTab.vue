<template>
    <div class="tags">
    <el-tag 
    v-for="tag in tags" 
    :key="tag.name"
    :closeable="tag.name !== 'home'"
    :effect="route.name === tag.name ? 'dark' : 'plain'"
    >
    {{ tag.label }}
    </el-tag>
</div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import { useAllDataStore } from "@/stores";
const allDataStore = useAllDataStore();
const tags = computed(() => allDataStore.state.tags);
const route = useRoute();
</script>

<style lang="less" scoped>
.tags{
  margin: 20px 0 0 20px;
}
.el-tag{
  margin-right: 10px;
}
</style>