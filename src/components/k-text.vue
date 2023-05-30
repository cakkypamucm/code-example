<template>
    <k-text :config="finalConfig" v-bind="$attrs" />
</template>

<script>
import KBaseShape from "src/components/k-base-shape";
import scssVars from "src/css/variables.module";
import helper from "src/helpers/frontend";

export default {
    extends: KBaseShape,
    inheritAttrs: false,

    data() {
        return {
            finalConfig: {
                fontSize: 16,
                fontFamily: scssVars["font-family"],
                verticalAlign: "top",
                align: "center",
                fill: "black",
                wrap: "none",
                ellipsis: true
            }
        };
    },

    created() {
        const width = helper.canvas.getTextWidth({
            text: this.finalConfig.text,
            font: `${this.finalConfig.fontSize}px ${this.finalConfig.fontFamily}`
        });
        const height = helper.canvas.getTextHeight(this.finalConfig);

        if (this.finalConfig.width == null) {
            this.finalConfig.width = width;
        }
        // if (width > this.finalConfig.width) {
        //     console.debug(
        //         `real width ${width} more than passed width ${this.finalConfig.width} for text ${this.finalConfig.text}`
        //     );
        // }

        if (this.finalConfig.height == null) {
            this.finalConfig.height = height;
        }
    }
};
</script>
