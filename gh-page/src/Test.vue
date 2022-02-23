<template>
    <div class="test">
        test page here <br>
        ...
        <div id="code-container"></div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {EditorView, EditorState, basicSetup} from "@codemirror/basic-setup";
import {javascript} from "@codemirror/lang-javascript";

export default defineComponent({
    name: "Test",
    setup() {
        onMounted(() => {
            const view = new EditorView({
                state: EditorState.create({
                    doc: 'const length: number = new Queue<string>(5).length',
                    extensions: [basicSetup, javascript()]
                }),
                parent: document.getElementById('code-container')
            })
        })
    }
})
</script>

<style lang="scss" scoped>
.test {
    position: relative;
    width: 100%;
    height: 100%;

    #code-container {
        position: relative;
        width: 200px;
        height: 100px;
        border: solid 1px #cccccc;
    }
}
</style>