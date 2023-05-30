<template>
    <k-rect ref="rect" :config="finalConfig" v-bind="$attrs" />
</template>

<script>
import KBaseShape from "src/components/k-base-shape";

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
    },

    methods: {
        getStage() {
            return this.$refs.rect.getStage();
        }
    }
};
</script>
