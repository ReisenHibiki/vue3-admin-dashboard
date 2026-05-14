<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">+新增</el-button>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="请输入">
            <el-input v-model="formInline.keyword" @keyup.enter="handleSerch" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSerch">搜索</el-button>
          </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="list">
        <el-table-column
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :width="item.width ? item.width : 125"
        />
        <el-table-column fixed="right" label="操作" min-width="180">
            <template #="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
                >编辑</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(scope.row)"
                >删除</el-button
            >
            </template>
        </el-table-column>
        </el-table>

        <el-pagination
            size="small"
            background
            layout="prev, pager, next"
            :total=config.total
            @current-change="handleChange"
            class="pager"
        />
    </div>
    
</template>
<script setup>
import {reactive, ref, getCurrentInstance, onMounted} from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
const formInline = reactive({
  keyword: "",
})
const config = reactive({
  name: "",
  page: 1,
  total: 0,
})
const handleAdd = () => {
}
// 搜索
const handleSerch = () => {
    config.name = formInline.keyword;
    getUserData();
}
// 换页变化
const handleChange = (page) => {
    config.page = page;
    getUserData();
}
const handleDelete = (val) => {
    ElMessageBox.confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await proxy.$api.deleteUser({id: val.id});
        ElMessage({
          type: 'success',
          message: '删除成功!',
        });
        getUserData();
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除/删除失败',
        });
      });
}
const list = ref([])
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 400,
  },
])
// 获取用户数据
const {proxy} = getCurrentInstance();
const getUserData = async () => {
  const res = await proxy.$api.getUserData(config);
  list.value = res.list.map(item => {
    return {
      ...item,
      sexLabel: item.sex === 1 ? "男" : "女"
    };
    
  });
    config.total = res.count;
};
onMounted(() => {
  getUserData();
})
</script>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}

.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table {
    width: 100%;
    height: 500px;
  }
}
.select-clearn{
    display:flex;
}
</style>