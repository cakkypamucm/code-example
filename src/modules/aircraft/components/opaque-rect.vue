<template>
    <app-k-rect :config="rectConfig" v-bind="$attrs" />
</template>

<script>
import config from "../config";

export default {
    inheritAttrs: false,
    props: {
        config: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            rectConfig: {
                fill: config.stageBackgroundColor
            }
        };
    },

    watch: {
        config: {
            deep: true,
            immediate: true,
            handler() {
                Object.assign(this.rectConfig, this.config);
            }
        }
    }
};
</script>
