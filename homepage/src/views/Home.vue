<script lang="ts" setup>
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import MenuPanel from "@/layouts/MenuPanel.vue";

</script>

<template>
    <Splitter class="home">
        <SplitterPanel class="menu-container" :size="20" :min-size="20">
            <MenuPanel/>
        </SplitterPanel>
        <SplitterPanel class="doc-container" :size="80" :min-size="60">
            doc
        </SplitterPanel>
    </Splitter>
</template>

<style lang="scss" scoped>
.home {
    position: relative;
    width: 100%;
    height: 100%;

    .menu-container {

    }

    .doc-container {

    }
}
</style>
