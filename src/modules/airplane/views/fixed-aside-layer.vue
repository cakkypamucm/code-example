<template>
    <k-layer ref="layer">
        <template v-if="airplanes.length">
            <k-rect
                :config="{
                    x: 0,
                    y: config.fixedHeader.height,
                    width: config.fixedAside.width,
                    height: module.timeline.totalHeight(),
                    fill: config.stageBackgroundColor
                }"
            />
            <template v-for="(airplane, index) in airplanes" :key="airplane.name">
                <k-text
                    :config="
                        module.timeline.setTextDefaults({
                            x: config.fixedAside.textStartX,
                            y: config.fixedHeader.height + 10 + config.rowHeight * index + 4,
                            text: airplane.name,
                            width: config.fixedAside.width - 2 * config.fixedAside.textStartX,
                            fill: config.fixedLayerBorderStroke
                        })
                    "
                />
                <k-line
                    :config="{
                        points: [
                            0,
                            config.fixedHeader.height + config.rowHeight * index,
                            config.fixedAside.width - 1,
                            config.fixedHeader.height + config.rowHeight * index
                        ],
                        stroke: config.betweenItemsLineStroke
                    }"
                />
            </template>
            <k-line
                :config="{
                    points: [config.fixedAside.width, 0, config.fixedAside.width, module.timeline.totalHeight()],
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
