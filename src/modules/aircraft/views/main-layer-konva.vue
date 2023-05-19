<template>
    <k-layer ref="layer" @pointerdown="onPointerdownLayerHandler">
        <template v-if="store.aircrafts.length">
            <template v-for="(aircraft, aircraftIndex) in store.aircrafts" :key="aircraft.id">
                <app-k-line
                    :config="{
                        points: [
                            0,
                            config.fixedHeader.height + config.rowHeight * aircraftIndex,
                            module.timeline.totalWidth(),
                            config.fixedHeader.height + config.rowHeight * aircraftIndex
                        ],
                        stroke: config.betweenItemsLineStroke
                    }"
                />
            </template>
            <slot name="timeline-grid" />
            <template v-for="(aircraft, aircraftIndex) in store.aircrafts" :key="aircraft.id">
                <template v-for="flight in aircraft.flights" :key="flight.id">
                    <flight-service-mode
                        v-if="flight.serviceMode"
                        :flight="flight"
                        :aircraft-index="aircraftIndex"
                        @flight-rect-pointerenter="$emit('flight-rect-pointerenter', flight.id)"
                        @flight-rect-pointerleave="$emit('flight-rect-pointerleave', flight.id)"
                    />
                    <flight-usual-mode v-else :flight="flight" :aircraft-index="aircraftIndex" />
                </template>
            </template>
        </template>
        <template v-else>
            <app-k-text
                :config="{
                    text: config.mainLayer.noAircraftsMessage.text,
                    width: config.mainLayer.noAircraftsMessage.width,
                    fill: config.mainLayer.noAircraftsMessage.fill
                }"
            />
        </template>
    </k-layer>
</template>

<script>
import module from "../index";
import useStore from "../store";
import config from "../config";
import FlightServiceMode from "./flight-service-mode";
import FlightUsualMode from "./flight-usual-mode";

export default {
    components: { FlightServiceMode, FlightUsualMode },
    emits: {
        "flight-rect-pointerdown": (id) => !!id,
        "flight-rect-pointerenter": (id) => !!id,
        "flight-rect-pointerleave": (id) => !!id
    },
    data() {
        return {
            module,
            store: useStore(),
            config
        };
    },

    methods: {
        onPointerdownLayerHandler(event) {
            if (event.target?.attrs?.dataId) {
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
