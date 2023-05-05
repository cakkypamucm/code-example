<template>
    <div v-show="show" class="wrapper-page">
        <header v-if="$slots.header" class="main-header">
            <slot name="header" />
        </header>
        <main v-if="$slots.default" class="main">
            <slot />
        </main>
        <footer v-if="$slots.footer" class="main-footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper-page {
    min-width: 300px;
}

.main {
    flex: 1 0 auto;
}
</style>
