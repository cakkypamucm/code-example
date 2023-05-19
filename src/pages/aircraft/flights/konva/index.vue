<template>
    <app-layout-page-default>
        <div class="fps">FPS: {{ fps }}</div>
        <h3 class="chart-title">
            {{ moduleConfig.chartTitle }} -
            <a :href="productionAbsoluteUrl + '/code-example/blob/master/src/docs/konva-research.md'">research</a>
        </h3>
        <div ref="stageContainer" class="stage-container">
            <k-stage v-if="configs.stage.height" ref="stage" :config="configs.stage">
                <main-layer
                    ref="main"
                    @flight-rect-pointerdown="
                        toast.showInfo(module.getFlightSummary($event), {
                            timeout: moduleConfig.mainLayer.flightRectTimeoutMs
                        })
                    "
                    @flight-rect-pointerenter="stage.container().style.cursor = 'pointer'"
                    @flight-rect-pointerleave="stage.container().style.cursor = 'default'"
                >
                    <template #timeline-grid>
                        <timeline-grid />
                    </template>
                </main-layer>
                <fixed-aside-layer ref="fixedAside" />
                <fixed-header-layer ref="fixedHeader">
                    <template #timeline-legend>
                        <timeline-legend />
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
import { useFps } from "@vueuse/core";
import { useRoute } from "vue-router";
import toast from "@/modules/toast";

import module from "@/modules/aircraft";
import useStore from "@/modules/aircraft/store";
import moduleConfig from "@/modules/aircraft/config";

import MainLayer from "@/modules/aircraft/views/main-layer-konva";
import FixedAsideLayer from "@/modules/aircraft/views/fixed-aside-layer";
import FixedHeaderLayer from "@/modules/aircraft/views/fixed-header-layer";
import StageScrollbarLayer from "@/modules/aircraft/views/stage-scrollbar-layer";
import TimelineGrid from "@/modules/aircraft/views/timeline-grid";
import TimelineLegend from "@/modules/aircraft/views/timeline-legend";

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
        return {
            moduleConfig,

            module,
            store: useStore(),

            toast,

            stage: null,

            configs: {
                stage: {
                    width: 0,
                    height: 0
                },
                stageScrollbar: {
                    props: {
                        readyToMount: false
                    }
                }
            },

            fps: useFps()
        };
    },
    watch: {
        "store.aircrafts": {
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
            const { aircraftsCount, flightsCount } = useRoute().query;
            await module.fetch(aircraftsCount, flightsCount);
            await this.initConfigs();
        },

        async initConfigs() {
            window.addEventListener("resize", _.throttle(this.actualizeStageDimensions, 100));
            this.actualizeStageDimensions();

            await this.$nextTick();
            this.stage = this.$refs.stage.getStage();
            this.stage.container().style.backgroundColor = this.moduleConfig.stageBackgroundColor;

            const mainLayer = this.$refs.main.getStage();
            const fixedAsideLayer = this.$refs.fixedAside.getStage();
            const fixedHeaderLayer = this.$refs.fixedHeader.getStage();

            Object.assign(this.configs.stageScrollbar.props, {
                stage: this.stage,
                stageConfig: this.configs.stage,
                mainLayer,
                verticalScrollableLayers: [mainLayer, fixedAsideLayer],
                horizontalScrollableLayers: [mainLayer, fixedHeaderLayer]
            });
            this.configs.stageScrollbar.props.readyToMount = true;
        },

        actualizeStageDimensions() {
            this.configs.stage.width = Math.min(module.timeline.totalWidth(), this.$refs.stageContainer.offsetWidth);
            this.configs.stage.height = Math.min(module.timeline.totalHeight(), this.$refs.stageContainer.offsetHeight);
            if (!this.stage) {
                setImmediate(this.actualizeStageDimensions);
                return;
            }
            this.stage.getContainer().style.border = `${this.store.aircrafts.length ? "1px solid black" : "none"}`;
        }
    }
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "@/assets/scss/_base";

:deep(.main) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fps,
.chart-title {
    position: fixed;
    z-index: 1;
    top: 0;
    background: v-bind("moduleConfig.stageBackgroundColor");

    @include base.column-padding;
}

.fps {
    left: 0;
}

.stage-container {
    display: flex;
    min-width: calc(v-bind("moduleConfig.mainLayer.noAircraftsMessage.width") * 1px);
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
