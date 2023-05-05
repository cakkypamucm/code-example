<template>
    <app-layout-page-default>
        <div ref="stageContainer" class="stage-container">
            <k-stage v-if="configs.stage.height" ref="stage" :config="configs.stage">
                <main-layer
                    ref="main"
                    v-bind="configs.mainLayer.props"
                    @flight-rect-pointerdown="
                        toast.showInfo(module.getFlightSummary($event), { timeout: flightRectTimeoutMs })
                    "
                    @flight-rect-pointerenter="stage.container().style.cursor = 'pointer'"
                    @flight-rect-pointerleave="stage.container().style.cursor = 'default'"
                >
                    <template #timeline-grid>
                        <timeline-grid v-bind="configs.timelineGrid.props" />
                    </template>
                </main-layer>
                <fixed-aside-layer ref="fixedAside" v-bind="configs.fixedAside.props" />
                <fixed-header-layer ref="fixedHeader" v-bind="configs.fixedHeader.props">
                    <template #timeline-legend>
                        <timeline-legend v-bind="configs.timelineLegend.props" />
                    </template>
                </fixed-header-layer>
                <stage-scrollbar-layer
                    v-if="configs.stageScrollbar.props.readyToMount"
                    v-bind="configs.stageScrollbar.props"
                />
            </k-stage>
        </div>
    </app-layout-page-default>
</template>

<script>
import Color from "color";
import module from "@/modules/airplane";
import useStore from "@/modules/airplane/store";

import MainLayer from "@/modules/airplane/views/main-layer";
import FixedAsideLayer from "@/modules/airplane/views/fixed-aside-layer";
import FixedHeaderLayer from "@/modules/airplane/views/fixed-header-layer";
import StageScrollbarLayer from "@/modules/airplane/views/stage-scrollbar-layer";
import TimelineGrid from "@/modules/airplane/views/timeline-grid";
import TimelineLegend from "@/modules/airplane/views/timeline-legend";

import toast from "@/modules/toast";

export default {
    components: {
        MainLayer,
        FixedAsideLayer,
        FixedHeaderLayer,
        StageScrollbarLayer,
        TimelineGrid,
        TimelineLegend
    },
    data() {
        const betweenItemsLineStroke = "#cecece";
        return {
            stageBackgroundColor: "white",

            betweenItemsLineStroke,

            timelinePrimaryColor: Color(betweenItemsLineStroke).darken(0.4).hex(),

            rowHeight: 40,

            fixedLayerBorderStroke: "black",
            fixedHeaderHeight: 40,
            fixedAsideWidth: 110,

            flightRectTimeoutMs: 4000,

            module,
            store: useStore(),

            toast,

            stage: null,

            configs: {
                stage: {},
                mainLayer: {},
                fixedAside: {},
                fixedHeader: {},
                stageScrollbar: {
                    props: {
                        readyToMount: false
                    }
                },
                timelineGrid: {},
                timelineLegend: {}
            },

            noAirplanesMessageWidth: module.timeline.noAirplanesMessageWidth
        };
    },
    watch: {
        "store.airplanes": {
            handler() {
                this.actualizeStageDimensions();
            },
            deep: true
        }
    },

    beforeUnmount() {
        toast.clear();
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            await module.fetch();
            module.timeline.setWidthCorrectionPx(this.fixedAsideWidth);
            module.timeline.setHeightCorrectionPx(this.fixedHeaderHeight);
            module.timeline.setRowHeight(this.rowHeight);
            await this.initConfigs();
        },

        /* eslint-disable vue/no-undef-properties */
        async initConfigs() {
            this.configs.mainLayer.props = Object.fromEntries(
                this.entriesThisProps(
                    "fixedAsideWidth fixedHeaderHeight rowHeight betweenItemsLineStroke flightRectTimeoutMs"
                )
            );

            this.configs.fixedAside.props = Object.fromEntries(
                this.entriesThisProps(
                    "fixedAsideWidth fixedHeaderHeight rowHeight stageBackgroundColor fixedLayerBorderStroke betweenItemsLineStroke"
                )
            );

            this.configs.fixedHeader.props = Object.fromEntries(
                this.entriesThisProps("fixedHeaderHeight fixedAsideWidth stageBackgroundColor fixedLayerBorderStroke")
            );

            this.configs.stageScrollbar.props = Object.fromEntries(
                this.entriesThisProps("fixedAsideWidth fixedHeaderHeight stageBackgroundColor fixedLayerBorderStroke")
            );

            this.configs.timelineGrid.props = Object.fromEntries(this.entriesThisProps("timelinePrimaryColor"));

            this.configs.timelineLegend.props = Object.fromEntries(
                this.entriesThisProps("fixedHeaderHeight timelinePrimaryColor")
            );

            window.addEventListener("resize", _.throttle(this.actualizeStageDimensions, 100));
            this.actualizeStageDimensions();

            await this.$nextTick();
            this.stage = this.$refs.stage.getStage();
            this.stage.container().style.backgroundColor = this.stageBackgroundColor;

            const mainlayer = this.$refs.main.getStage();
            const fixedAsideLayer = this.$refs.fixedAside.getStage();
            const fixedHeaderlayer = this.$refs.fixedHeader.getStage();

            Object.assign(this.configs.stageScrollbar.props, {
                stage: this.stage,
                stageConfig: this.configs.stage,
                mainlayer,
                verticalScrollableLayers: [mainlayer, fixedAsideLayer],
                horizontalScrollableLayers: [mainlayer, fixedHeaderlayer]
            });
            this.configs.stageScrollbar.props.readyToMount = true;
        },

        entriesThisProps(props) {
            return props.split(" ").map((prop) => [prop, this[prop]]);
        },

        actualizeStageDimensions() {
            this.configs.stage.width = Math.min(module.timeline.totalWidth(), this.$refs.stageContainer.offsetWidth);
            this.configs.stage.height = Math.min(module.timeline.totalHeight(), this.$refs.stageContainer.offsetHeight);
            if (!this.stage) {
                setImmediate(this.actualizeStageDimensions);
                return;
            }
            this.stage.getContainer().style.border = `${this.store.airplanes.length ? "1px solid black" : "none"}`;
        }
        /* eslint-enable */
    }
};
</script>

<style lang="scss" scoped>
@use "sass:math";

:deep(.main) {
    display: flex;
    align-items: center;
    justify-content: center;
}

.stage-container {
    display: flex;
    min-width: calc(v-bind(noAirplanesMessageWidth) * 1px);
    min-height: 300px;
    align-items: center;
    justify-content: center;

    @media not all and (any-pointer: coarse) {
        width: 60vw;
        width: 60svw;
        height: 60vh;
        height: 60svh;
    }

    @media (any-pointer: coarse) {
        width: 90vw;
        width: 90svw;
        height: 80vh;
        height: 80svh;
    }
}
</style>
