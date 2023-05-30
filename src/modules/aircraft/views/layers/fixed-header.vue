<template>
    <k-layer ref="layer">
        <template v-if="store.aircrafts.length">
            <opaque-rect
                :config="{
                    x: 0,
                    y: 0,
                    width: module.timeline.totalWidth(),
                    height: config.fixedHeader.height - 1
                }"
            />
            <slot name="timeline-legend" />
            <app-k-line
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
import module from "../../index";
import useStore from "../../store";
import config from "../../config";
import OpaqueRect from "../../components/opaque-rect";

export default {
    components: {
        OpaqueRect
    },
    data() {
        return {
            module,
            store: useStore(),
            config
        };
    },
    methods: {
        getStage() {
            return this.$refs.layer.getStage();
        }
    }
};
</script>
