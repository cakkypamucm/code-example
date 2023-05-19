<template>
    <template v-if="!flight.serviceMode">
        <flight-start :flight="flight" :pos="pos" />
        <flight-body :flight="flight" :pos="pos" />
        <flight-end :flight="flight" :pos="pos" />
    </template>
</template>

<script>
import config from "../config";
import module from "../index";
import FlightStart from "../components/flight-start";
import FlightBody from "../components/flight-body";
import FlightEnd from "../components/flight-end";

export default {
    components: {
        FlightStart,
        FlightBody,
        FlightEnd
    },
    props: {
        flight: {
            type: Object,
            required: true
        },
        aircraftIndex: {
            type: Number,
            required: true
        }
    },
    emits: {
        "flight-rect-pointerenter": (id) => !!id,
        "flight-rect-pointerleave": (id) => !!id
    },

    data() {
        const startX = config.fixedAside.width + module.timeline.dateToPx(this.flight.departureDate);
        const startY =
            config.fixedHeader.height + config.rowHeight * this.aircraftIndex + config.mainLayer.rect.padding;
        const flightWidth =
            module.timeline.dateToPx(this.flight.arrivalDate) - module.timeline.dateToPx(this.flight.departureDate);
        const flightHeight = config.rowHeight - 2 * config.mainLayer.rect.padding;

        return {
            module,
            config,
            pos: {
                padding: {
                    x: config.arrow.strokeWidth + 2,
                    y: config.arrow.mainHeight,
                    date: 12
                },
                start: {
                    x: startX,
                    y: startY
                },
                end: {
                    x: startX + flightWidth,
                    y: startY + flightHeight
                },
                flight: {
                    width: flightWidth,
                    height: flightHeight
                }
            }
        };
    }
};
</script>
