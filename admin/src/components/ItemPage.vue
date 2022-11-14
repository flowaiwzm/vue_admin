<template>
  <div class="item">
    <!-- 布局容器 -->
    <slot name="main"></slot>
    <!-- 插槽 -->
  </div>
</template>

<script setup>

</script>

<style lang="scss">
    .item{
        height: 5.125rem;
        // border: 1px solid rgb(168, 166, 166);
        margin: 0.25rem;
        background-color: rgba(147, 147, 147, 0.889);
    }
</style>