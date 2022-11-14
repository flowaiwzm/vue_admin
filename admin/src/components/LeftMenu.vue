<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    :collapse="!$store.state.HomeModule.navBool"
    @open="handleOpen"
    @close="handleClose"
    router
  >
  <!-- 通过设置router就会根据index的值来实现页面的跳转 -->
  <template v-for="(v) in router.options.routes[1].children" :key="v.path">

      <!-- 带下拉的导航 -->
    <el-sub-menu :index="v.path" v-if="v.children">
      <!-- index控制那个路由时选中状态 -->
      <!-- v-if判断是否带子路由 --> 
      <template #title>
        <el-icon><component :is="v.meta.icon"></component></el-icon>
        <!-- 此时component中的动态组件中 -->
            <!-- 图标直接在路由index.ts中配置即可，再在此页面中引用即可 -->
        <span>{{v.meta.title}}</span>
      </template>
      <el-menu-item-group v-for="(val) in v.children" :key="val.path">
        <el-menu-item :index="val.path">{{val.meta.title}}</el-menu-item>
   
      </el-menu-item-group>
    </el-sub-menu>

    <!-- 不带下拉的导航 -->
    <el-menu-item  :index="v.path" v-else>
      <el-icon><component :is="v.meta.icon"></component></el-icon>
      <span>{{v.meta.title}}</span>
    </el-menu-item>
 

  </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
let router=useRouter()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

onMounted(()=>{
  console.log("sss",router.options.routes[1].children)
})
</script>

<style>
</style>