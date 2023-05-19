<template>
    <k-text :config="finalConfig" v-bind="$attrs" />
</template>

<script>
import KBaseShape from "@/components/k-base-shape";

export default {
    extends: KBaseShape,
    inheritAttrs: false,

    data() {
        return {
            finalConfig: {
                fontSize: 16,
                fontFamily: "Helvetica",
                verticalAlign: "top",
                align: "center",
                fill: "black",
                wrap: "none",
                ellipsis: true
            }
        };
    },

    created() {
        if (!this.finalConfig.width) {
            console.warn("нужно задать width для работы ellipsis и align");
        }
        if (this.finalConfig.verticalAlign !== "top" && !this.finalConfig.height) {
            console.debug("нужно задать height для работы verticalAlign");
        }
    }
};
</script>
