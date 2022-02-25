<template>
    <div class="doc-block-template">
        <el-descriptions :column="2" border>
            <el-descriptions-item width="25%" label="Name">
                {{ blockName }}
            </el-descriptions-item>
            <el-descriptions-item width="25%" label="Type">
                {{ blockValue.type }}
            </el-descriptions-item>
            <el-descriptions-item width="25%" label="Permission" >
                {{ blockValue.permission }}
            </el-descriptions-item>
            <el-descriptions-item width="25%" label="Static" >
                {{ blockValue.static }}
            </el-descriptions-item>
            <el-descriptions-item width="25%" label="Description" :span="2">
                {{ blockValue.description }}
            </el-descriptions-item>
            <el-descriptions-item width="25%" label="Declare" :span="2">
                <code class="language-typescript" v-highlight>{{ blockValue.declare }}</code>
            </el-descriptions-item>
            <el-descriptions-item width="25%" label="Example">
                <code-block v-if="blockValue.example && blockValue.example !== ''" :doc-content="blockValue.example" />
                <div v-if="!blockValue.example || blockValue.example === ''" class="code-line-dark">no example</div>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ElDescriptions, ElDescriptionsItem} from "element-plus";
import type {DocsBlockValue} from "@/views/Docs.vue";
import CodeBlock from "@/components/Misc/CodeBlock.vue";

export default defineComponent({
    name: "DocBlockTemplate",
    components: {
        ElDescriptions, ElDescriptionsItem,
        CodeBlock
    },
    props: {
        blockName: {
            required: true,
            type: String
        },
        blockValue: {
            required: true,
            type: Object as PropType<DocsBlockValue>
        }
    },
    setup() {

        return {}
    }
})
</script>

<style lang="scss" scoped>
.doc-block-template {
    position: relative;
    width: 100%;
    height: fit-content;

    //:deep(.el-descriptions__label) {
    //}
    :deep(.el-descriptions__content) {
        color: #666666;
        //font-style: italic;
    }
}
</style>