<template>
    <div class="root">
        <div class="root-nav-bar">
            <div class="root-logo-container">
                <img src="" alt="">
            </div>
            <div class="root-operate-container">
                <i class="iconfont icon-github" />
            </div>
        </div>
        <div class="root-body">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Root"
})
</script>

<style lang="scss" scoped>
.root {
    position: relative;
    width: 100%;
    height: 100%;

    .root-nav-bar {
        position: relative;
        width: 100%;
        height: 59px;
        border-bottom: solid 1px #dcdfe6;
    }

    .root-body {
        position: relative;
        width: 100%;
        height: calc(100% - 60px);
    }
}
</style>