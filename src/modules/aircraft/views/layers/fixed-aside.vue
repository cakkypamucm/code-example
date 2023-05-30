<template>
    <k-layer ref="layer">
        <template v-if="store.aircrafts.length">
            <opaque-rect
                :config="{
                    x: 0,
                    y: config.fixedHeader.height,
                    width: config.fixedAside.width,
                    height: module.timeline.totalHeight()
                }"
            />
            <template v-for="(aircraft, index) in store.aircrafts" :key="aircraft.name">
                <app-k-text
                    :config="{
                        text: aircraft.name,
                        x: 0,
                        y: config.fixedHeader.height + config.row.height * index,
                        width: config.fixedAside.width,
                        height: config.row.height,
                        verticalAlign: 'middle'
                    }"
                />
                <app-k-line
                    :config="{
                        points: [
                            0,
                            config.fixedHeader.height + config.row.height * index,
                            config.fixedAside.width - 1,
                            config.fixedHeader.height + config.row.height * index
                        ],
                        stroke: config.betweenItemsLineStroke
                    }"
                />
            </template>
            <app-k-line
                :config="{
                    points: [config.fixedAside.width, 0, config.fixedAside.width, module.timeline.totalHeight()],
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
