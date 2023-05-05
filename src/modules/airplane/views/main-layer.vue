<template>
    <k-layer ref="layer" @pointerdown="onPointerdownLayerHandler">
        <template v-if="airplanes.length">
            <template v-for="(airplane, airplaneIndex) in airplanes" :key="airplane.id">
                <k-line
                    :config="{
                        points: [
                            0,
                            fixedHeaderHeight + rowHeight * airplaneIndex,
                            module.timeline.totalWidth(),
                            fixedHeaderHeight + rowHeight * airplaneIndex
                        ],
                        stroke: betweenItemsLineStroke
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
                        x: fixedAsideWidth + module.timeline.dateToPx(flight.departureDate),
                        y: fixedHeaderHeight + rowHeight * airplaneIndex + padding,
                        width:
                            module.timeline.dateToPx(flight.arrivalDate) -
                            module.timeline.dateToPx(flight.departureDate),
                        height: rowHeight - 2 * padding,
                        fill: regularFill,
                        stroke: regularFill,
                        strokeWidth: 2,
                        perfectDrawEnabled: false
                    }"
                    @pointerenter="$emit('flight-rect-pointerenter', flight.id)"
                    @pointerleave="$emit('flight-rect-pointerleave', flight.id)"
                />
            </template>
        </template>
        <template v-else>
            <k-text :config="module.timeline.setTextDefaults(module.timeline.noAirplanesMessageConfig)" />
        </template>
    </k-layer>
</template>

<script>
// TODO улучшить производительность на мобильных
import Konva from "konva";
import Color from "color";
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
        betweenItemsLineStroke: {
            type: String,
            required: true
        },
        flightRectTimeoutMs: {
            type: Number,
            required: true
        }
    },
    emits: {
        "flight-rect-pointerdown": (id) => !!id,
        "flight-rect-pointerenter": (id) => !!id,
        "flight-rect-pointerleave": (id) => !!id
    },
    data() {
        const regularFill = "#8eaaff";
        return {
            module,
            airplanes: useStore().airplanes,
            regularFill,
            activeFill: Color(regularFill).darken(0.25).hex(),
            padding: 6
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
            rect.fill(this.activeFill);
            rect.stroke(this.activeFill);

            setTimeout(() => {
                rect.fill(this.regularFill);
                rect.stroke(this.regularFill);
            }, this.flightRectTimeoutMs);
        },

        // eslint-disable-next-line vue/no-unused-properties
        getStage() {
            return this.$refs.layer.getStage();
        }
    }
};
</script>
