<template>
    <div class="docs">
        <div class="docs-side-menu">
            <el-menu style="height: 100%;"
                :default-active="`${query.class}-${query.field}`">
                <el-menu-item index="icon-sheet" @click="showIconMap">
                    <i class="label-map /" />
                    <b style="font-size: 16px">Icon comparison table</b>
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
            <el-collapse class="class-collapse" v-model="activeItemField">
                <el-collapse-item
                    v-for="(value, field) in activeItemDoc"
                    :title="field" :name="field" :key="field">
                    <div>
                        {{ value }}
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {
    ElMenu, ElSubMenu, ElMenuItem,
    ElCollapse, ElCollapseItem
} from "element-plus";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {customMessage} from "@/scripts";

// region types for menu
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
// endregion

export default defineComponent({
    name: "Docs",
    components: {
        ElMenu, ElSubMenu, ElMenuItem,
        ElCollapse, ElCollapseItem
    },
    setup() {
        const router = useRouter()
        const _message = customMessage()

        const MenuJson = ref<Partial<MenuConfig>>({})

        // region computed params
        // current query object
        const query = computed((): MenuQuery => {
            return useRoute().query
        })
        // current active item`s value
        const activeItemDoc = computed(() => {
            return MenuJson.value[query.value.class]
        })
        // endregion

        // region request the menu config json file
        axios.get('/MenuJson.json')
            .then(({data}: { data: MenuConfig }) => {
                MenuJson.value = data
            })
            .catch(() => {
                _message({
                    type: 'error',
                    message: 'Failed to get the configuration file of the menu, please refresh and try again.'
                })
            })
        // endregion

        // region icon comparison table
        const iconMapVisible = ref(false)
        const showIconMap = () => {
            iconMapVisible.value = true
        }
        // endregion

        // region view and switch
        // key of active item in collapse
        const activeItemField = ref('')
        // menu item click callback
        const jumpTo = (className: string, fieldName: string) => {
            router.push({ query: { class: className, field: fieldName } })
        }
        // endregion

        return {
            MenuJson,
            query, activeItemDoc,
            iconMapVisible, showIconMap,
            jumpTo, activeItemField
        }
    }
})
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.docs {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .docs-side-menu {
        @include scrollBarStyle();
        position: relative;
        width: 260px;
        height: 100%;
        overflow: hidden auto;
    }
    .docs-item-docs {
        @include scrollBarStyle(#cccccc);
        position: relative;
        width: calc(100% - 260px - 100px);
        height: calc(100% - 100px);
        padding: 50px;
        overflow: hidden auto;

        .class-collapse {

        }
    }
}
</style>