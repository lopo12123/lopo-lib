<template>
    <div class="docs">
        <div class="docs-side-menu">
            <el-menu>
                <el-sub-menu index="clone" title="clone">
                    <el-menu-item index="deep">deep</el-menu-item>
                    <el-menu-item index="plain">plain</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="queue" title="queue">
                    <el-menu-item index="123">222</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="docs-item-docs">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ElMenu, ElSubMenu, ElMenuItem} from "element-plus";

export default defineComponent({
    name: "Docs",
    components: {
        ElMenu, ElSubMenu, ElMenuItem
    },
    setup() {

    }
})
</script>

<style lang="scss" scoped>
.docs {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .docs-side-menu {
        position: relative;
        width: 259px;
        height: 100%;
        border-right: solid 1px #dcdfe6;
    }
    .docs-item-docs {
        position: relative;
        width: calc(100% - 260px);
        height: 100%;
    }
}
</style>