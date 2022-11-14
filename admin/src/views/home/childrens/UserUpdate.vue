<template>
    <div>
        <!-- currentPage4:当前页面 pageSize4：当前页面条数 -->
      <el-table :data="tableData.listdata.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" style="width: 100%">
        <el-table-column prop="id" label="编号"  />
        <el-table-column prop="title" label="楼盘名称"  />
        <el-table-column prop="type" label="房源类型" />
        <el-table-column prop="num" label="门牌号" />
        <el-table-column prop="hometype" label="房源户型" />
        <el-table-column prop="name" label="户主" />
        <el-table-column>
            <!-- 插入到头部 绑定search变量 -->
            <template #header>
                <el-input v-model="search" size="small" placeholder="请输入查询内容" @blur="searchLink"/>
                <!-- v-model绑定一个变量  @blur 是当元素失去焦点时所触发的事件searchLink-->
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      <!-- 分页区域 -->
      <el-pagination
        v-model:currentPage="currentPage4"
        v-model:page-size="pageSize4"
        :current-page="currentPage4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.listdata.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
          <!-- 引入修改的弹出框 -->
    <Ud/>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref,onMounted,reactive} from 'vue'
  import link from "../../../api/link.js"
  import apiUrl from "../../../api/url.js"
  import Ud from "../../../components/UpdateDialog.vue"
  import {useStore} from "vuex"
  let store=useStore()
  let search=ref("")
  // 初始化一个变量
  const currentPage4 = ref(1)
  // currentpage4当前页数
  const pageSize4 = ref(15)
  // 显示条数
  const small = ref(false)
  const background = ref(false)
  const disabled = ref(false)
//   更改页面的条数
  const handleSizeChange = (val: number) => {
    pageSize4.value=val
  }
//   更改页面
  const handleCurrentChange = (val: number) => {
   currentPage4.value=val
  }
  interface User {
  date: string;
  name: string;
  address: string;
}
const handleEdit = (index: number, row: User) => {
  console.log(index, row);

store.commit("SET_DIALOG",row)
// 调用vuex中的方法并把row传递给vuex

};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
//   触发vuex删除操作
  store.dispatch("DEL_DATA",row)
  // 触发异步操作
};
  
  let tableData=reactive({
      listdata:[]
  })
  
  let searchLink=()=>{
       link(apiUrl.userlist,"get",{},{name:search.value}).then((ok:any)=>{
          console.log(ok)
          tableData.listdata=ok.data
      })
  }
  
  onMounted(()=>{
    // 请求事件
      link(apiUrl.userlist).then((ok:any)=>{
          console.log(ok)
          tableData.listdata=ok.data
          // 请求来的数据直接将原有数据进行代替
      })
  })
  
  </script>
  
  
  <style>
  </style>