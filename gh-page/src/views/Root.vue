<template>
    <div class="root">
        <div class="root-nav-bar">
            <div class="root-logo-container">
<!--                <img src="" alt="">-->
                <span>logo</span>
            </div>
            <div class="root-operate-container">
                <i class="iconfont icon-github" title="Go to GitHub" @click="jumpTo('github')" />
                <i class="iconfont icon-npm" title="Go to NPM" @click="jumpTo('npm')" />
            </div>
        </div>
        <div class="root-body">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

type JumpList = {
    npm: string
    github: string
}

export default defineComponent({
    name: "Root",
    setup() {
        // region 链接跳转
        const jumpList: JumpList = {
            npm: 'https://www.npmjs.com/package/lopo-lib',
            github: 'https://github.com/lopo12123/lopo-lib'
        }
        const jumpTo = (to: keyof JumpList) => {
            window.open(jumpList[to], '_blank')
        }
        // endregion

        return {
            jumpTo
        }
    }
})
</script>

<style lang="scss" scoped>
.root {
    position: relative;
    width: 100%;
    height: 100%;

    .root-nav-bar {
        position: relative;
        width: calc(100% - 60px);
        height: 59px;
        padding: 0 30px;
        border-bottom: solid 1px #dcdfe6;
        box-shadow: #dcdfe6 0 5px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .root-logo-container {
            position: relative;
            width: 200px;
            height: 100%;
        }
        .root-operate-container {
            position: relative;
            width: calc(100% - 200px);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            > i {
                margin: 0 10px;
                font-size: 32px;
                cursor: pointer;
            }
        }
    }

    .root-body {
        position: relative;
        width: 100%;
        height: calc(100% - 60px);
    }
}
</style>