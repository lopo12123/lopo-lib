<template>
    <div class="code-block">

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, shallowRef} from "vue";
import {EditorView} from "@codemirror/basic-setup";

export default defineComponent({
    name: "CodeBlock",
    setup() {
        const codeBlock = shallowRef<EditorView | null>(null)

        onMounted(() => {

        })
        onUnmounted(() => {

        })
    }
})
</script>

<style lang="scss" scoped>
.code-block {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>