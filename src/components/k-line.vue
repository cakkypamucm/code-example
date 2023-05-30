<template>
    <k-line :config="finalConfig" v-bind="$attrs" />
</template>

<script>
import KBaseShape from "src/components/k-base-shape";

export default {
    extends: KBaseShape,
    inheritAttrs: false
};
</script>
