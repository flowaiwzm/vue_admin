<template>
  <router-view/>
</template>
<!-- scoped不会作用于全局 -->
<script setup>
    import * as echarts from "echarts"
    import {provide, Provider} from "vue"
    provide ("echarts",echarts)
</script>
<style lang="scss">

</style>
