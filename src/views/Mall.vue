<template>
  <div class="goods-wrap">

    <el-row :gutter="20">
      <el-col :span="16">
        <el-input v-model="searchName" placeholder="搜索商品名称" clearable />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="openAdd">新增</el-button>
      </el-col>
    </el-row>

    <el-table :data="showList" border style="margin:20px 0; width:100%">
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="name" label="商品名称" align="center" />
      <el-table-column prop="price" label="价格" align="center" />
      <el-table-column prop="stock" label="库存" align="center" />
      <el-table-column prop="desc" label="描述" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" type="warning" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @change="getList"
    />

    <!-- 弹窗部分 -->
    <el-dialog v-model="visible" title="商品信息">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model.number="form.price" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model.number="form.stock" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useGoodsStore } from '@/stores/goodsStore'

const goodsStore = useGoodsStore()


const searchName = ref('')
const page = ref(1)
const size = ref(5)

const visible = ref(false)
const isEdit = ref(false)
const form = ref({ id: '', name: '', price: 0, stock: 0, desc: '' })

// 过滤和分页
const showList = computed(() => {
  let arr = goodsStore.goodsList.filter(item => item.name.includes(searchName.value))
  const start = (page.value - 1) * size.value
  return arr.slice(start, start + size.value)
})

const total = computed(() => goodsStore.goodsList.length)

const getList = () => {}
const search = () => (page.value = 1)

// 新增功能
const openAdd = () => {
  isEdit.value = false
  form.value = { id: '', name: '', price: 0, stock: 0, desc: '' }
  visible.value = true
}


const openEdit = (row) => {
  isEdit.value = true
  form.value = { ...row }
  visible.value = true
}


const submit = () => {
  if (!form.value.name) return ElMessage.warning('请输入名称')
  if (isEdit.value) {
    goodsStore.updateGoods(form.value)
    ElMessage.success('修改成功')
  } else {
    goodsStore.addGoods(form.value)
    ElMessage.success('新增成功')
  }
  visible.value = false
}

// 删除功能
const del = (id) => {
  ElMessageBox.confirm('确定删除？', '提示', { type: 'warning' }).then(() => {
    goodsStore.deleteGoods(id)
    ElMessage.success('删除成功')
  })
}
</script>

<style lang="less" scoped>
.goods-wrap {
  padding: 20px;
}
</style>