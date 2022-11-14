<template>
    <div>
        <el-icon @click="ck" > <CaretLeft v-if="$store.state.HomeModule.navBool"/> <CaretRight v-else/></el-icon>
        <span style="font-family: kaiti ;font-size: 30px;line-height:70px ;margin-left: 500px;">数据后台管理页面</span>
    </div>
</template>

<script setup>
import {CaretRight,CaretLeft} from '@element-plus/icons-vue'
import {useStore} from "vuex"
import {ref} from 'vue'
// let bool=ref(true)
let store=useStore()
let ck=()=>{
    //  bool.value=!bool.value
    store.commit("SET_NAV_BOOL");
    // 触发store中的方法名称

}

</script>

<style lang="scss">
.el-header{
    line-height: 70px;
    .el-icon{
        font-size:20px;
    }
}
</style>