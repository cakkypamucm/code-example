<template>
    <k-layer ref="layer">
        <template v-if="airplanes.length">
            <k-rect
                :config="{
                    x: 0,
                    y: 0,
                    width: module.timeline.totalWidth(),
                    height: config.fixedHeader.height - 1,
                    fill: config.stageBackgroundColor
                }"
            />
            <slot name="timeline-legend" />
            <k-line
                :config="{
                    points: [
                        config.fixedAside.width,
                        config.fixedHeader.height - 1,
                        module.timeline.totalWidth(),
                        config.fixedHeader.height - 1
                    ],
                    stroke: config.fixedLayerBorderStroke
                }"
            />
        </template>
    </k-layer>
</template>

<script>
import module from "../index";
import useStore from "../store";
import config from "../config";

export default {
    data() {
        return {
            airplanes: useStore().airplanes,
            config,
            module
        };
    },
    methods: {
        getStage() {
            return this.$refs.layer.getStage();
        }
    }
};
</script>
