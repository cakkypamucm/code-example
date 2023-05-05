<template>
    <k-layer ref="layer">
        <template v-if="airplanes.length">
            <k-rect
                :config="{
                    x: 0,
                    y: fixedHeaderHeight,
                    width: fixedAsideWidth,
                    height: module.timeline.totalHeight(),
                    fill: stageBackgroundColor
                }"
            />
            <template v-for="(airplane, index) in airplanes" :key="airplane.name">
                <k-text
                    :config="
                        module.timeline.setTextDefaults({
                            x: startX,
                            y: fixedHeaderHeight + 10 + rowHeight * index + 4,
                            text: airplane.name,
                            width: fixedAsideWidth - 2 * startX,
                            fill: fixedLayerBorderStroke
                        })
                    "
                />
                <k-line
                    :config="{
                        points: [
                            0,
                            fixedHeaderHeight + rowHeight * index,
                            fixedAsideWidth - 1,
                            fixedHeaderHeight + rowHeight * index
                        ],
                        stroke: betweenItemsLineStroke
                    }"
                />
            </template>
            <k-line
                :config="{
                    points: [fixedAsideWidth, 0, fixedAsideWidth, module.timeline.totalHeight()],
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
        rowHeight: {
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
        },
        betweenItemsLineStroke: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            module,
            airplanes: useStore().airplanes,
            startX: 15
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
