<template>
    <div class="index">
        <router-view />
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Index"
})
</script>

<style lang="scss" scoped>
.index {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>