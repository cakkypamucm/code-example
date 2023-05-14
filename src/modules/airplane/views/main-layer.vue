<template>
    <k-layer ref="layer" @pointerdown="onPointerdownLayerHandler">
        <template v-if="airplanes.length">
            <template v-for="(airplane, airplaneIndex) in airplanes" :key="airplane.id">
                <k-line
                    :config="{
                        points: [
                            0,
                            config.fixedHeader.height + config.rowHeight * airplaneIndex,
                            module.timeline.totalWidth(),
                            config.fixedHeader.height + config.rowHeight * airplaneIndex
                        ],
                        stroke: config.betweenItemsLineStroke
                    }"
                />
            </template>
            <slot name="timeline-grid" />
            <template v-for="(airplane, airplaneIndex) in airplanes" :key="airplane.id">
                <k-rect
                    v-for="flight in airplane.flights"
                    :key="flight.id"
                    :config="{
                        dataId: flight.id,
                        x: config.fixedAside.width + module.timeline.dateToPx(flight.departureDate),
                        y: config.fixedHeader.height + config.rowHeight * airplaneIndex + config.mainLayer.rect.padding,
                        width:
                            module.timeline.dateToPx(flight.arrivalDate) -
                            module.timeline.dateToPx(flight.departureDate),
                        height: config.rowHeight - 2 * config.mainLayer.rect.padding,
                        fill: config.mainLayer.rect.regularFill,
                        stroke: config.mainLayer.rect.regularFill,
                        strokeWidth: config.mainLayer.rect.strokeWidth,
                        perfectDrawEnabled: false
                    }"
                    @pointerenter="$emit('flight-rect-pointerenter', flight.id)"
                    @pointerleave="$emit('flight-rect-pointerleave', flight.id)"
                />
            </template>
        </template>
        <template v-else>
            <k-text
                :config="
                    module.timeline.setTextDefaults({
                        text: config.mainLayer.noAirplanesMessage.text,
                        fill: config.mainLayer.noAirplanesMessage.fill
                    })
                "
            />
        </template>
    </k-layer>
</template>

<script>
// TODO улучшить производительность на мобильных
import Konva from "konva";
import module from "../index";
import useStore from "../store";
import config from "../config";

export default {
    emits: {
        "flight-rect-pointerdown": (id) => !!id,
        "flight-rect-pointerenter": (id) => !!id,
        "flight-rect-pointerleave": (id) => !!id
    },
    data() {
        return {
            airplanes: useStore().airplanes,
            config,
            module
        };
    },

    methods: {
        onPointerdownLayerHandler(event) {
            if (event.target instanceof Konva.Rect) {
                this.onPointerdownRectHandler(event.target.attrs.dataId, event);
            }
        },

        onPointerdownRectHandler(id, event) {
            this.$emit("flight-rect-pointerdown", id);

            const rect = event.target;
            rect.fill(this.config.mainLayer.rect.activeFill);
            rect.stroke(this.config.mainLayer.rect.activeFill);

            setTimeout(() => {
                rect.fill(this.config.mainLayer.rect.regularFill);
                rect.stroke(this.config.mainLayer.rect.regularFill);
            }, this.config.mainLayer.flightRectTimeoutMs);
        },

        getStage() {
            return this.$refs.layer.getStage();
        }
    }
};
</script>
