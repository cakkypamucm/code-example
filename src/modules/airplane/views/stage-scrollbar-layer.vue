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
                    width: config.fixedAside.width + 1,
                    height: config.fixedHeader.height + 1,
                    fill: config.stageBackgroundColor
                }"
            />
            <k-line
                :config="{
                    points: [
                        config.fixedAside.width,
                        config.fixedHeader.height + 1,
                        config.fixedAside.width,
                        config.fixedHeader.height - 2
                    ],
                    stroke: config.fixedLayerBorderStroke
                }"
            />
            <k-text
                :config="
                    module.timeline.setTextDefaults({
                        x: config.fixedAside.textStartX,
                        y: config.stageScrollbarLayer.airplaneNumber.y,
                        text: config.airplane.number,
                        fill: config.fixedLayerBorderStroke,
                        fontSize: config.stageScrollbarLayer.airplaneNumber.fontSize
                    })
                "
            />
            <k-text
                :config="
                    module.timeline.setTextDefaults({
                        x: config.stageScrollbarLayer.datetime.x,
                        y: config.stageScrollbarLayer.datetime.y,
                        text: config.stageScrollbarLayer.datetime.text,
                        fill: config.fixedLayerBorderStroke,
                        fontSize: config.stageScrollbarLayer.datetime.fontSize
                    })
                "
            />
        </template>
    </k-layer>
</template>

<script>
import module from "../index";
import useStore from "../store";
import config from "../config";

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
        mainLayer: {
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
        }
    },
    data() {
        return {
            airplanes: useStore().airplanes,
            config,
            module,
            scrollBarOptions: {
                width: config.stageScrollbarLayer.bar.width,
                padding: config.stageScrollbarLayer.bar.padding,
                regularFill: config.stageScrollbarLayer.bar.regularFill,
                activeFill: config.stageScrollbarLayer.bar.activeFill,
                opacity: config.stageScrollbarLayer.bar.opacity
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

            const layerX = Math.max(minX, Math.min(this.mainLayer.x() - dx, maxX));

            const minY = -(module.timeline.totalHeight() - this.stageConfig.height);
            const maxY = 0;

            const layerY = Math.max(minY, Math.min(this.mainLayer.y() - dy, maxY));
            if (vBar) {
                this.verticalScrollableLayers.forEach((layer) => layer.y(layerY));
            }
            if (hBar) {
                this.horizontalScrollableLayers.forEach((layer) => layer.x(layerX));
            }

            const availableHeight = this.stageConfig.height - this.scrollBarOptions.padding * 2 - (vBar?.height() || 0);
            const vy =
                (this.mainLayer.y() / (-module.timeline.totalHeight() + this.stageConfig.height)) * availableHeight +
                this.scrollBarOptions.padding;
            vBar?.y(vy);

            const availableWidth = this.stageConfig.width - this.scrollBarOptions.padding * 2 - (hBar?.width() || 0);

            const hx =
                (this.mainLayer.x() / (-module.timeline.totalWidth() + this.stageConfig.width)) * availableWidth +
                this.scrollBarOptions.padding;
            hBar?.x(hx);
        },

        // участвует в вычислении размера скроллбара, чтобы было удобно взаимодействовать с ним
        ensureComfortableScrollbarSize(value) {
            return Math.max(config.stageScrollbarLayer.bar.minimumGreaterDimension, value);
        }
    }
};
</script>
