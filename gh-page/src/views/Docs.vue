<template>
    <div class="docs">
        <div class="docs-side-menu">
            <el-menu>
                <el-menu-item index="icon-sheet">
                    icon-sheet
                </el-menu-item>
                <el-sub-menu
                    v-for="(block, className) in MenuJson"
                    :index="className" :key="className">
                    <template #title>
                        <i class="label-class"/>
                        <b style="font-size: 16px">{{ className }}</b>
                    </template>
                    <el-menu-item
                        v-for="(fieldSet, fieldName) in block"
                        :index="`${className}-${fieldName}`" :key="`${className}-${fieldName}`"
                        @click="jumpTo(className, fieldName)">
                        <i :class="'label-'+fieldSet.type" />
                        <i :class="'label-'+fieldSet.permission" />
                        <i class="label-static" v-if="fieldSet.static"></i>
                        <i>{{ fieldName }}</i>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="docs-item-docs">
<!--            <router-view />-->
            {{ query }}
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {ElMenu, ElSubMenu, ElMenuItem} from "element-plus";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";

type MenuQuery = {
    class: MenuItem
    field: string
}
type MenuConfig = { [k in MenuItem]: MenuBlock }
type MenuItem = 'clone' | 'queue' | 'search' | 'stack' | 'tree'
type MenuBlock = {
    [k: string]: {
        type: 'constructor' | 'parameter' | 'method'
        static: boolean
        permission: 'public' | 'private'
        description: string
        declare: string
        example: string
    }
}

export default defineComponent({
    name: "Docs",
    components: {
        ElMenu, ElSubMenu, ElMenuItem
    },
    computed: {
        query(): MenuQuery {
            return useRoute().query
        }
    },
    setup() {
        const router = useRouter()

        const MenuJson = ref<Partial<MenuConfig>>({})
        // region request the menu config json file
        axios.get('/MenuJson.json')
            .then(({data}: { data: MenuConfig }) => {
                MenuJson.value = data
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
        // endregion

        // region menu item click callback
        const jumpTo = (className: string, fieldName: string) => {
            console.log('clicked: ', className, fieldName)
            router.push({ query: { class: className, field: fieldName } })
        }
        // endregion

        return {
            MenuJson,
            jumpTo
        }
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
        width: 260px;
        height: 100%;
    }
    .docs-item-docs {
        position: relative;
        width: calc(100% - 260px);
        height: 100%;
    }
}
</style>