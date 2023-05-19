<template>
    <template v-if="flight.serviceMode">
        <app-k-rect
            :config="{
                x: config.fixedAside.width + module.timeline.dateToPx(flight.departureDate),
                y: config.fixedHeader.height + config.rowHeight * aircraftIndex + config.mainLayer.rect.padding,
                width: module.timeline.dateToPx(flight.arrivalDate) - module.timeline.dateToPx(flight.departureDate),
                height: config.rowHeight - 2 * config.mainLayer.rect.padding,
                fill: config.serviceModes[flight.serviceMode.id].color,
                stroke: config.serviceModes[flight.serviceMode.id].color,
                strokeWidth: config.mainLayer.rect.strokeWidth,
                perfectDrawEnabled: false
            }"
        />
        <app-k-text
            :config="{
                dataId: flight.id,
                text: config.serviceModes[flight.serviceMode.id].text,
                x: config.fixedAside.width + module.timeline.dateToPx(flight.departureDate),
                y: config.fixedHeader.height + config.rowHeight * aircraftIndex + config.mainLayer.rect.padding,
                width: module.timeline.dateToPx(flight.arrivalDate) - module.timeline.dateToPx(flight.departureDate),
                height: config.rowHeight - 2 * config.mainLayer.rect.padding,
                verticalAlign: 'middle'
            }"
            @pointerenter="$emit('flight-rect-pointerenter', flight.id)"
            @pointerleave="$emit('flight-rect-pointerleave', flight.id)"
        />
    </template>
</template>

<script>
import config from "../config";
import module from "../index";

export default {
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
        return {
            module,
            config
        };
    }
};
</script>
