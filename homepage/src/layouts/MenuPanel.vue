<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute()
const router = useRouter()

// region 当前选中的项
const activeBlock = computed(() => {
    return route.path.split('/')[1] ?? ''
})
// endregion

// region 跳转
const jumpToBlock = (componentName: string) => {
    router.push({ name: componentName })
}
// endregion

// region 菜单列表
type MenuBlock = {
    block: string
    componentName: string
}
const menuBlocks: MenuBlock[] = [
    { block: 'debounce', componentName: 'Debounce' },
    { block: 'throttle', componentName: 'Throttle' },
    { block: 'cc', componentName: 'CC' },
]
// endregion
</script>

<template>
    <div class="menu-panel">
        <div class="menu-title">123</div>
        <div :class="item.block === activeBlock ? 'menu-item-active' : 'menu-item-default'"
             v-for="item in menuBlocks" :key="item.block"
             @click="jumpToBlock(item.componentName)">
            {{ item.block }}
        </div>
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

    %menu-item {
        width: 100%;
        height: 40px;
        padding: 0 20px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: background-color 1s ease-out;
    }

    .menu-item-default {
        @extend %menu-item;

        &:hover {
            background-color: #83e5cf33;
        }
    }

    .menu-item-active {
        @extend %menu-item;
        background-color: #83e5cf33;
    }
}
</style>
