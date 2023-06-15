<template>
    <app-layout-page-default>
        <div class="fps">FPS: {{ fps }}</div>
        <h3 class="chart-title">
            {{ moduleConfig.chartTitle }} -
            <a :href="productionAbsoluteUrl + '/code-example/blob/master/src/docs/research/konva.md'">research</a>
        </h3>
        <div ref="scrollContainer" class="scroll-container">
            <div class="large-container">
                <div ref="stageContainer" class="stage-container">
                    <k-stage v-if="configs.stage.height" ref="stage" :config="configs.stage">
                        <main-layer
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
                    </k-stage>
                </div>
            </div>
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
import MainLayer from "src/modules/aircraft/views/layers/konva-main";

export default {
    components: {
        MainLayer,
        TimelineGrid
    },
    data() {
        return {
            moduleConfig,

            module,
            store: useStore(),

            toast,

            fps: useFps(),

            stage: null,

            configs: {
                stage: {
                    width: 0,
                    height: 0,
                    padding: 200
                }
            },

            widthCorrectionPx: 0,
            heightCorrectionPx: 0
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
            // this.testAnimationFrameDuration();
        },

        async initStage() {
            window.addEventListener("resize", _.throttle(this.actualizeStageDimensions, 100));
            this.actualizeStageDimensions();

            await this.$nextTick();
            this.stage = this.$refs.stage.getStage();
            this.stage.container().style.backgroundColor = this.moduleConfig.stageBackgroundColor;

            const { scrollContainer } = this.$refs;
            const repositionStage = () => {
                const dx = scrollContainer.scrollLeft - this.getStagePaddingForAxis("x");
                const dy = scrollContainer.scrollTop - this.getStagePaddingForAxis("y");
                this.stage.container().style.transform = `translate(${dx}px, ${dy}px)`;
                this.stage.x(-dx);
                this.stage.y(-dy);
            };
            scrollContainer.addEventListener("scroll", repositionStage, { passive: true });
            repositionStage();
        },

        getStagePaddingForAxis(axis) {
            if (!this.store.aircrafts.length) {
                return 0;
            }

            let propName;
            if (axis === "x") {
                propName = "width";
            } else if (axis === "y") {
                propName = "height";
            } else {
                return 0;
            }
            propName = _.upperFirst(propName);
            if (
                module.timeline[`total${propName}`]() >
                this.$refs.scrollContainer[`offset${propName}`] + this.configs.stage.padding * 2
            ) {
                return this.configs.stage.padding;
            }
            return 0;
        },

        actualizeStageDimensions() {
            this.configs.stage.width = Math.min(
                module.timeline.totalWidth(),
                this.$refs.scrollContainer.offsetWidth + this.getStagePaddingForAxis("x") * 2
            );
            this.configs.stage.height = Math.min(
                module.timeline.totalHeight(),
                this.$refs.scrollContainer.offsetHeight + this.getStagePaddingForAxis("y") * 2
            );
            this.$refs.stageContainer.style.width = `${this.configs.stage.width}px`;
            this.$refs.stageContainer.style.height = `${this.configs.stage.height}px`;
            if (!this.stage) {
                setTimeout(this.actualizeStageDimensions, 0);
                return;
            }
            this.$refs.scrollContainer.style.border = `${this.store.aircrafts.length ? "1px solid black" : "none"}`;
        },

        testAnimationFrameDuration() {
            requestIdleCallback(() => {
                this.$refs.scrollContainer.scrollLeft = 100;
                requestAnimationFrame(() => {
                    const start = performance.now();
                    requestAnimationFrame(() => {
                        console.log(`'requestAnimationFrame' handler took ${Math.floor(performance.now() - start)}ms`);
                    });
                });
            });
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

.large-container {
    overflow: hidden;
    width: calc(v-bind("module.timeline.totalWidth()") * 1px);
    height: calc(v-bind("module.timeline.totalHeight()") * 1px);
}

$width: 80;
$height: 80;

.scroll-container {
    overflow: auto;
    max-width: $width * 1vw;
    max-width: $width * 1svw;
    max-height: $height * 1vh;
    max-height: $height * 1svh;
}

.stage-container {
    display: flex;
    min-width: calc(v-bind("moduleConfig.mainLayer.noAircraftsMessage.width") * 1px);
    min-height: calc(v-bind("moduleConfig.mainLayer.noAircraftsMessage.height") * 1px);
    align-items: center;
    justify-content: center;
}
</style>
