<script lang="ts" setup>

</script>

<template>
    <div class="menu-panel">
        <div class="menu-title">123</div>
        <div class="menu-item">1</div>
        <div class="menu-item">2</div>
        <div class="menu-item">3</div>
        <div class="menu-item">3</div>
        <div class="menu-item">3</div>
        <div class="menu-item">3</div>
        <div class="menu-item">3</div>
        <div class="menu-item">3</div>
        <div class="menu-item">3</div>
    </div>
</template>

<style lang="scss" scoped>
@use "src/styles/mixin";

.menu-panel {
    @include mixin.useScrollbar();
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden auto;
    box-sizing: content-box;

    .menu-title {
        position: sticky;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 40px;
        background-color: #e4e7ed;
    }

    .menu-item {
        width: 100%;
        height: 40px;
        padding: 0 20px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: background-color 1s ease-out;
        &:hover{
            background-color: #83e5cf80;
        }
    }
}
</style>
