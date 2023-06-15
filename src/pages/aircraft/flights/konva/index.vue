<template>
    <app-layout-page-default>
        <div class="fps">FPS: {{ fps }}</div>
        <h3 class="chart-title">
            {{ moduleConfig.chartTitle }} -
            <a :href="productionAbsoluteUrl + '/code-example/blob/master/src/docs/research/konva.md'">research</a>
        </h3>
        <div ref="stageContainer" class="stage-container">
            <k-stage v-if="configs.stage.height" ref="stage" :config="configs.stage">
                <main-layer
                    ref="main"
                    :width-correction-px="widthCorrectionPx"
                    :height-correction-px="heightCorrectionPx"
                    @flight-service-pointerdown="
                        toast.showInfo(module.getFlightSummary($event), {
                            timeout: moduleConfig.mainLayer.flightRectTimeoutMs
                        })
                    "
                    @flight-service-pointerenter="stage.container().style.cursor = 'pointer'"
                    @flight-service-pointerleave="stage.container().style.cursor = 'default'"
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
import toast from "src/modules/toast";

import module from "src/modules/aircraft";
import useStore from "src/modules/aircraft/store";
import moduleConfig from "src/modules/aircraft/config";

import TimelineGrid from "src/modules/aircraft/views/timeline-grid";
import TimelineLegend from "src/modules/aircraft/views/timeline-legend";
import MainLayer from "src/modules/aircraft/views/layers/konva-main";
import FixedAsideLayer from "src/modules/aircraft/views/layers/fixed-aside";
import FixedHeaderLayer from "src/modules/aircraft/views/layers/fixed-header";
import StageScrollbarLayer from "src/modules/aircraft/views/layers/stage-scrollbar";

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
            module,
            store: useStore(),
            moduleConfig,

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

            widthCorrectionPx: moduleConfig.fixedAside.width,
            heightCorrectionPx: moduleConfig.fixedHeader.height,

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
            module.timeline.setWidthCorrectionPx(this.widthCorrectionPx);
            module.timeline.setHeightCorrectionPx(this.heightCorrectionPx);
            await module.fetch(aircraftsCount, flightsCount);
            await this.initStage();
        },

        async initStage() {
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
                setTimeout(this.actualizeStageDimensions, 0);
                return;
            }
            this.stage.getContainer().style.border = `${this.store.aircrafts.length ? "1px solid black" : "none"}`;
        }
    }
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "src/css/_base";

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
    z-index: 2;
    left: 0;
}

$width: 80;
$height: 80;

.stage-container {
    display: flex;
    width: $width * 1vw;
    width: $width * 1svw;
    min-width: calc(v-bind("moduleConfig.mainLayer.noAircraftsMessage.width") * 1px);
    height: $height * 1vh;
    height: $height * 1svh;
    min-height: calc(v-bind("moduleConfig.mainLayer.noAircraftsMessage.height") * 1px);
    align-items: center;
    justify-content: center;
}
</style>
