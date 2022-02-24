<template>
    <div class="doc-block-template">
        <div class="label-box">
            <div class="label-item"><i :class="'label-'+blockValue.type" /> {{ blockValue.type }}</div>
            <div class="label-item"><i :class="'label-'+blockValue.permission" /> {{ blockValue.permission }}</div>
            <div class="label-item" v-if="blockValue.static"><i class="label-static" /> static</div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {DocsBlockValue} from "@/views/Docs.vue";

export default defineComponent({
    name: "DocBlockTemplate",
    props: {
        blockValue: {
            required: true,
            type: Object as PropType<DocsBlockValue>
        }
    },
    setup(props) {

        return {}
    }
})
</script>

<style lang="scss" scoped>
.doc-block-template {
    position: relative;
    width: 100%;
    height: fit-content;

    .label-box {
        position: relative;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

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
</style>