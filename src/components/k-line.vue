<template>
    <k-line :config="finalConfig" v-bind="$attrs" />
</template>

<script>
import KBaseShape from "@/components/k-base-shape";

export default {
    extends: KBaseShape,
    inheritAttrs: false,

    data() {
        return {
            finalConfig: {
                // for dev purposes
                fill: "aquamarine"
            }
        };
    }
};
</script>
