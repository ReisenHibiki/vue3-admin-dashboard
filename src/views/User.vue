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
    <!-- 新增/编辑 用户对话框 -->
    <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
       <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，通过给他设置一个class=select-clearn
		在css进行处理-->
    <el-form :inline="true"  :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select  v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="danger" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    </el-dialog>
    
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
const userForm = ref()
//新增用户按钮显示对话框
const handleAdd = () => {
action.value="add"
//打开对话窗
dialogVisible.value=true
}
//对话框右上角的关闭事件
const handleClose = () => {
    //获取到表单dom，执行resetFields重置表单
    userForm.value.resetFields()
    //关闭对话框
    dialogVisible.value=false
}
//对话框右下角的取消事件
const handleCancel = () => {
    userForm.value.resetFields()
    dialogVisible.value=false
}
//格式化日期，格式化为：1997-01-02这种
const timeFormat = (time) => {
    var time = new Date(time);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    function add(m) {
        return m < 10 ? "0" + m : m;
    }
    return year + "-" + add(month) + "-" + add(date);
}
// 对话框提交事件
const onSubmit = () => {
    //执行userForm表单的validate进行规则校验，传入一个回调函数，回调函数会接受到一个是否校验通过的变量
    userForm.value.validate(async (valid)=>{
        //如果校验成功
        if (valid) {
            //res用于接收添加用户或者编辑用户接口的返回值
            let res=null
            //这里无论是新增或者是编辑，都要对这个日期进行一个格式化
            //如果不是1997-01-02这种格式，使用timeFormat方法进行格式化
            formUser.birth=/^\d{4}-\d{2}-\d{2}$/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth)
            //如果当前的操作是新增，则调用新增接口
            if (action.value == "add") {
                res = await proxy.$api.addUser(formUser);
            }else if(action.value == "edit"){
                // 之后写编辑接口
            }
            //如果接口调用成功
            if(res){
                    //关闭对话框，重置表单，重新请求用户数据
                    dialogVisible.value = false;
                    userForm.value.resetFields()
                    getUserData()
            }
		//如果校验失败
        }else{
          ElMessage({
            showClose: true,
            message: "请输入正确的内容",
            type: "error",
          })
        }
    })
}
// 新增和编辑共用一个窗口，用action区分
const action = ref("add");
const dialogVisible = ref(false);
const formUser = reactive({})
//表单校验规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr:[{ required: true, message: '地址是必填项' }]
})
// 删除
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