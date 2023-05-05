<template>
    <k-layer>
        <template v-if="airplanes.length">
            <k-rect
                v-if="stageConfig.height < module.timeline.totalHeight()"
                ref="vBar"
                :config="vBarConfig"
                @pointerenter="onPointerenterHandler(vBarConfig)"
                @pointerleave="onPointerleaveHandler(vBarConfig)"
                @dragmove="onDragmoveVBarHandler"
            />

            <k-rect
                v-if="stageConfig.width < module.timeline.totalWidth()"
                ref="hBar"
                :config="hBarConfig"
                @pointerenter="onPointerenterHandler(hBarConfig)"
                @pointerleave="onPointerleaveHandler(hBarConfig)"
                @dragmove="onDragmoveHBarHandler"
            />
            <k-rect
                :config="{
                    x: 0,
                    y: 0,
                    width: fixedAsideWidth + 1,
                    height: fixedHeaderHeight + 1,
                    fill: stageBackgroundColor,
                    strokeWidth: 0
                }"
            />
            <k-line
                :config="{
                    points: [fixedAsideWidth, fixedHeaderHeight + 1, fixedAsideWidth, fixedHeaderHeight - 2],
                    stroke: fixedLayerBorderStroke
                }"
            />
            <k-text
                :config="
                    module.timeline.setTextDefaults({
                        x: 20,
                        y: 20,
                        text: 'Номер',
                        fill: fixedLayerBorderStroke,
                        fontSize: 12
                    })
                "
            />
            <k-text
                :config="
                    module.timeline.setTextDefaults({
                        x: 35,
                        y: 5,
                        text: 'Дата/время',
                        fill: fixedLayerBorderStroke,
                        fontSize: 12
                    })
                "
            />
        </template>
    </k-layer>
</template>

<script>
import Color from "color";
import helper from "@/helpers/frontend";
import module from "../index";
import useStore from "../store";

// TODO показывать скроллбары с крайним положением не stage, а layer
// @see https://konvajs.org/docs/sandbox/Canvas_Scrolling.html
export default {
    props: {
        stage: {
            type: Object,
            required: true
        },
        stageConfig: {
            type: Object,
            required: true
        },
        mainlayer: {
            type: Object,
            required: true
        },
        verticalScrollableLayers: {
            type: Array,
            required: true
        },
        horizontalScrollableLayers: {
            type: Array,
            required: true
        },
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
        const minimumGreaterDimension = 64;
        const regularFill = "#c1c1c1";
        return {
            module,
            airplanes: useStore().airplanes,
            scrollBarOptions: {
                minimumGreaterDimension,
                width: helper.isMobileDevice() ? 32 : 12,
                padding: 0,
                regularFill,
                activeFill: Color(regularFill).darken(0.1).hex(),
                opacity: 0.7
            },
            vBarConfig: null,
            hBarConfig: null
        };
    },
    created() {
        const vm = this;

        this.vBarConfig = {
            width: this.scrollBarOptions.width,
            fill: this.scrollBarOptions.regularFill,
            y: this.scrollBarOptions.padding,
            opacity: this.scrollBarOptions.opacity,
            draggable: true,
            dragBoundFunc(pos) {
                pos.x = vm.stageConfig.width - vm.scrollBarOptions.padding - vm.scrollBarOptions.width;
                pos.y = Math.max(
                    //  eslint-disable-next-line vue/no-undef-properties
                    Math.min(pos.y, vm.stageConfig.height - this.height() - vm.scrollBarOptions.padding),
                    vm.scrollBarOptions.padding
                );
                return pos;
            }
        };

        // noinspection JSSuspiciousNameCombination
        this.hBarConfig = {
            height: this.scrollBarOptions.width,
            fill: this.scrollBarOptions.regularFill,
            x: this.scrollBarOptions.padding,
            opacity: this.scrollBarOptions.opacity,
            draggable: true,
            dragBoundFunc(pos) {
                pos.x = Math.max(
                    //  eslint-disable-next-line vue/no-undef-properties
                    Math.min(pos.x, vm.stageConfig.width - this.width() - vm.scrollBarOptions.padding),
                    vm.scrollBarOptions.padding
                );
                pos.y = vm.stageConfig.height - vm.scrollBarOptions.padding - vm.scrollBarOptions.width;
                return pos;
            }
        };

        window.addEventListener("resize", _.throttle(this.onWindowResizeHandler, 100));
        this.onWindowResizeHandler();
    },

    mounted() {
        this.stage.on("wheel", this.onWheelHandler);
    },

    methods: {
        onWindowResizeHandler() {
            Object.assign(this.vBarConfig, {
                x: this.stageConfig.width - this.scrollBarOptions.padding - this.scrollBarOptions.width,
                height: Math.round((this.stageConfig.height * this.stageConfig.height) / module.timeline.totalHeight())
            });

            Object.assign(this.hBarConfig, {
                y: this.stageConfig.height - this.scrollBarOptions.padding - this.scrollBarOptions.width,
                width: this.ensureComfortableScrollbarSize(
                    Math.ceil((this.stageConfig.width * this.stageConfig.width) / module.timeline.totalWidth())
                )
            });
        },

        onPointerenterHandler(config) {
            config.fill = this.scrollBarOptions.activeFill;
        },

        onPointerleaveHandler(config) {
            config.fill = this.scrollBarOptions.regularFill;
        },

        onDragmoveVBarHandler() {
            const vBar = this.$refs.vBar.getStage();

            const availableHeight = this.stageConfig.height - this.scrollBarOptions.padding * 2 - vBar.height();
            const delta = (vBar.y() - this.scrollBarOptions.padding) / availableHeight;
            this.verticalScrollableLayers.forEach((layer) =>
                layer.y(-(module.timeline.totalHeight() - this.stageConfig.height) * delta)
            );
        },

        onDragmoveHBarHandler() {
            const hBar = this.$refs.hBar.getStage();

            const availableWidth = this.stageConfig.width - this.scrollBarOptions.padding * 2 - hBar.width();
            const delta = (hBar.x() - this.scrollBarOptions.padding) / availableWidth;
            this.horizontalScrollableLayers.forEach((layer) =>
                layer.x(-(module.timeline.totalWidth() - this.stageConfig.width) * delta)
            );
        },

        onWheelHandler({ evt }) {
            evt.preventDefault();
            const dx = evt.deltaX;
            const dy = evt.deltaY;

            const vBar = this.$refs.vBar?.getStage();
            const hBar = this.$refs.hBar?.getStage();

            const minX = -(module.timeline.totalWidth() - this.stageConfig.width);
            const maxX = 0;

            const x = Math.max(minX, Math.min(this.mainlayer.x() - dx, maxX));

            const minY = -(module.timeline.totalHeight() - this.stageConfig.height);
            const maxY = 0;

            const y = Math.max(minY, Math.min(this.mainlayer.y() - dy, maxY));
            if (vBar) {
                this.verticalScrollableLayers.forEach((layer) => layer.y(y));
            }
            if (hBar) {
                this.horizontalScrollableLayers.forEach((layer) => layer.x(x));
            }

            const availableHeight = this.stageConfig.height - this.scrollBarOptions.padding * 2 - (vBar?.height() || 0);
            const vy =
                (this.mainlayer.y() / (-module.timeline.totalHeight() + this.stageConfig.height)) * availableHeight +
                this.scrollBarOptions.padding;
            vBar?.y(vy);

            const availableWidth = this.stageConfig.width - this.scrollBarOptions.padding * 2 - (hBar?.width() || 0);

            const hx =
                (this.mainlayer.x() / (-module.timeline.totalWidth() + this.stageConfig.width)) * availableWidth +
                this.scrollBarOptions.padding;
            hBar?.x(hx);
        },

        // участвует в вычислении размера скроллбара, чтобы было удобно взаимодействовать с ним
        ensureComfortableScrollbarSize(value) {
            return Math.max(this.scrollBarOptions.minimumGreaterDimension, value);
        }
    }
};
</script>
