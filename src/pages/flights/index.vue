<template>
    <app-layout-page-default>
        <div class="fps">FPS: {{ fps }}</div>
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
import module from "@/modules/airplane";
import useStore from "@/modules/airplane/store";

import MainLayer from "@/modules/airplane/views/main-layer";
import FixedAsideLayer from "@/modules/airplane/views/fixed-aside-layer";
import FixedHeaderLayer from "@/modules/airplane/views/fixed-header-layer";
import StageScrollbarLayer from "@/modules/airplane/views/stage-scrollbar-layer";
import TimelineGrid from "@/modules/airplane/views/timeline-grid";
import TimelineLegend from "@/modules/airplane/views/timeline-legend";

import toast from "@/modules/toast";
import moduleConfig from "@/modules/airplane/config";

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
            this.stage.getContainer().style.border = `${this.store.airplanes.length ? "1px solid black" : "none"}`;
        }
    }
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "@/assets/scss/_base";

:deep(.main) {
    display: flex;
    align-items: center;
    justify-content: center;
}

.fps {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background: v-bind("moduleConfig.stageBackgroundColor");

    @include base.column-padding;
}

.stage-container {
    display: flex;
    min-width: calc(v-bind("moduleConfig.mainLayer.noAirplanesMessage.width") * 1px);
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
