<template>
    <div class="test">
        test page here <br>
        ...
        <div id="code-container"></div>

        <button @click="changeStr">change</button>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, shallowRef} from "vue";
import {EditorView, EditorState, basicSetup} from "@codemirror/basic-setup";
import {javascript} from "@codemirror/lang-javascript";

export default defineComponent({
    name: "Test",
    setup() {
        const codeBlock = shallowRef<EditorView | null>(null)

        onMounted(() => {
            codeBlock.value = new EditorView({
                parent: document.getElementById('code-container'),
                state: EditorState.create({
                    doc: 'type JumpList = {\n' +
                        '    npm: string\n' +
                        '    github: string\n' +
                        '}',
                    extensions: [basicSetup, javascript({ typescript: true })]
                }),
            })
        })

        onUnmounted(() => {
            codeBlock.value?.destroy()
        })

        const changeStr = () => {
            if(!codeBlock.value) return

            codeBlock.value?.dispatch({
                changes: [{ ...codeBlock.value.viewport, insert: 'hello world' }]
            })
        }

        return {
            changeStr
        }
    }
})
</script>

<style lang="scss" scoped>
@import "styles/mixin";
.test {
    position: relative;
    width: 100%;
    height: 100%;

    #code-container {
        @include scrollBarStyle(#cccccc80);
        position: relative;
        width: 200px;
        height: 30px;
        border: solid 1px #cccccc;
        overflow-y: auto;
    }
}
</style>