<template>
    <div class="docs">
        <div class="docs-side-menu">
            <el-menu style="height: 100%;"
                :default-active="`${query.class}-${query.field}`">
                <el-menu-item index="icon-sheet" @click="showIconMap">
                    <i class="label-map" />
                    <b style="font-size: 16px">Icon comparison table</b>
                </el-menu-item>
                <el-sub-menu
                    v-for="(block, className) in DocsJson"
                    :index="className" :key="className">
                    <template #title>
                        <i class="label-class"/>
                        <b style="font-size: 16px">{{ className }}</b>
                    </template>
                    <el-menu-item
                        v-for="(fieldSet, fieldName) in block"
                        :index="`${className}-${fieldName}`"
                        :key="`${className}-${fieldName}`"
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
                    :name="field" :key="field">
                    <template #title>
                        <span :id="field" class="field-name">{{ field }}</span>
                        <div class="label-item"><i :class="'label-'+value.type" /> {{ value.type }}</div>
                        <div class="label-item"><i :class="'label-'+value.permission" /> {{ value.permission }}</div>
                        <div class="label-item" v-if="value.static"><i class="label-static" /> static</div>
                    </template>
                    <doc-block-template :block-name="field" :block-value="value" />
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
    ElMenu, ElSubMenu, ElMenuItem,
    ElCollapse, ElCollapseItem
} from "element-plus";
import axios from "axios";
import {customMessage, smoothScrollById} from "@/scripts";
import DocBlockTemplate from "@/components/Docs/DocBlockTemplate.vue";

// region types for menu
// all items
type DocsItem = 'Clone' | 'Queue' | 'Search' | 'Stack' | 'Tree'
// the query param of url
type DocsQuery = {
    class: DocsItem
    field: string
}
// whole DocsConfig.json
type DocsConfig = { [k in DocsItem]: DocsBlock }
type DocsBlock = {
    [k: string]: DocsBlockValue
}
export type DocsBlockValue = {
    type: 'constructor' | 'parameter' | 'method'
    static: boolean
    permission: 'public' | 'private'
    description: string
    declare: string
    example: string
}
// endregion

export default defineComponent({
    name: "Docs",
    components: {
        ElMenu, ElSubMenu, ElMenuItem,
        ElCollapse, ElCollapseItem,
        DocBlockTemplate
    },
    setup() {
        const router = useRouter()
        const _message = customMessage()

        const DocsJson = ref<Partial<DocsConfig>>({})

        // region computed params
        // current query object
        const query = computed((): DocsQuery => {
            return useRoute().query as DocsQuery
        })
        // current active item`s value
        const activeItemDoc = computed(() => {
            return DocsJson.value[query.value.class]
        })
        // endregion

        // region request the menu config json file
        axios.get('/DocsConfig.json')
            .then(({data}: { data: DocsConfig }) => {
                DocsJson.value = data
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
        const activeItemField = ref<string[]>([])
        // menu item click callback
        const jumpTo = (className: string, fieldName: string) => {
            router.push({ query: { class: className, field: fieldName } })
            if(!activeItemField.value.includes(fieldName)) activeItemField.value.push(fieldName)
            nextTick(() => {
                smoothScrollById(`${fieldName}`)
            })
        }
        // endregion

        return {
            DocsJson,
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
            .field-name {
                margin-right: 20px;
                font-size: 16px;
                font-family: Consolas, monospace;
            }
            .label-item {
                position: relative;
                width: fit-content;
                height: 30px;
                margin-right: 10px;
                padding: 0 10px;
                border: solid 1px #eeeeee;
                border-radius: 15px;
                background-color: #f5f7fa;
                color: #777777;
                font-style: italic;
                display: flex;
                align-items: center;
                justify-content: space-between;
                user-select: none;
            }
        }
    }
}
</style>