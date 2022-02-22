<template>
    <div class="docs">
        <div class="docs-nav-bar">
            nav
        </div>
        <div class="docs-body">
            <div class="docs-side-menu">
                menu
            </div>
            <div class="docs-item-docs">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Docs"
}
</script>

<style scoped>

</style>