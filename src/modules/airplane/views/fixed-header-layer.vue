<template>
    <k-layer ref="layer">
        <template v-if="airplanes.length">
            <k-rect
                :config="{
                    x: 0,
                    y: 0,
                    width: module.timeline.totalWidth(),
                    height: fixedHeaderHeight - 1,
                    fill: stageBackgroundColor
                }"
            />
            <slot name="timeline-legend" />
            <k-line
                :config="{
                    points: [
                        fixedAsideWidth,
                        fixedHeaderHeight - 1,
                        module.timeline.totalWidth(),
                        fixedHeaderHeight - 1
                    ],
                    stroke: fixedLayerBorderStroke
                }"
            />
        </template>
    </k-layer>
</template>

<script>
import module from "../index";
import useStore from "../store";

export default {
    props: {
        fixedAsideWidth: {
            type: Number,
            required: true
        },
        fixedHeaderHeight: {
            type: Number,
            required: true
        },
        stageBackgroundColor: {
            type: String,
            required: true
        },
        fixedLayerBorderStroke: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            module,
            airplanes: useStore().airplanes
        };
    },
    methods: {
        // eslint-disable-next-line vue/no-unused-properties
        getStage() {
            return this.$refs.layer.getStage();
        }
    }
};
</script>
