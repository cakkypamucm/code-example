<template>
    <k-layer ref="layer">
        <template v-if="store.aircrafts.length">
            <template v-for="(aircraft, aircraftIndex) in store.aircrafts" :key="aircraft.id">
                <app-k-line
                    :config="{
                        points: [
                            0,
                            widthCorrectionPx + config.row.height * aircraftIndex,
                            module.timeline.totalWidth(),
                            heightCorrectionPx + config.row.height * aircraftIndex
                        ],
                        stroke: config.betweenItemsLineStroke
                    }"
                />
            </template>
            <slot name="timeline-grid" />
            <template v-for="(aircraft, aircraftIndex) in store.aircrafts" :key="aircraft.id">
                <template v-for="flight in aircraft.flights" :key="flight.id">
                    <template v-if="flight.linkTo && flight.id < flight.linkTo">
                        <app-k-arrow
                            :config="{
                                x: getPosElemX(flight),
                                y: getPos(flight).center.y,
                                points: [
                                    0,
                                    0,
                                    getPosRelativeLinkToX(flight),
                                    getPos(store.getFlight(flight.linkTo)).center.y - getPos(flight).center.y
                                ],
                                pointerLength: config.arrow.pointerSize,
                                pointerWidth: config.arrow.pointerSize,
                                fill: config.arrow.color,
                                stroke: config.arrow.color,
                                strokeWidth: config.arrow.strokeWidth
                            }"
                        />
                    </template>
                    <flight-service-type
                        v-if="flight.type.id === 'service'"
                        v-bind="getFlightCommonProps(flight, aircraftIndex)"
                        :id="flight.id"
                        :text="flight.type.text"
                        :fill="flight.type.fill"
                        @flight-service-pointerenter="$emit('flight-service-pointerenter', flight.id)"
                        @flight-service-pointerleave="$emit('flight-service-pointerleave', flight.id)"
                        @flight-service-pointerdown="$emit('flight-service-pointerdown', flight.id)"
                    />
                    <flight-usual-type
                        v-else-if="flight.type.id === 'usual'"
                        v-bind="getFlightCommonProps(flight, aircraftIndex)"
                        :departure-date="flight.departureDate"
                        :arrival-date="flight.arrivalDate"
                    />
                </template>
            </template>
        </template>
        <template v-else>
            <app-k-text
                :config="{
                    text: config.mainLayer.noAircraftsMessage.text,
                    fontSize: config.mainLayer.noAircraftsMessage.fontSize,
                    fill: config.mainLayer.noAircraftsMessage.fill
                }"
            />
        </template>
    </k-layer>
</template>

<script>
import module from "../../index";
import useStore from "../../store";
import config from "../../config";
import FlightUsualType from "../../components/flight-type-usual";
import FlightServiceType from "../../components/flight-type-service";

export default {
    components: { FlightUsualType, FlightServiceType },
    props: {
        widthCorrectionPx: {
            type: Number,
            required: true
        },
        heightCorrectionPx: {
            type: Number,
            required: true
        }
    },
    emits: {
        "flight-service-pointerdown": (id) => !!id,
        "flight-service-pointerenter": (id) => !!id,
        "flight-service-pointerleave": (id) => !!id
    },
    data() {
        return {
            module,
            store: useStore(),
            config
        };
    },

    methods: {
        onPointerdownRectHandler({ id, rect }) {
            this.$emit("flight-service-pointerdown", id);

            rect.fill(this.config.mainLayer.rect.activeFill);
            rect.stroke(this.config.mainLayer.rect.activeFill);

            setTimeout(() => {
                rect.fill(this.config.mainLayer.rect.regularFill);
                rect.stroke(this.config.mainLayer.rect.regularFill);
            }, this.config.mainLayer.flightRectTimeoutMs);
        },

        getStage() {
            return this.$refs.layer.getStage();
        },

        getStartXFlight(flight) {
            return this.widthCorrectionPx + module.timeline.dateToPx(flight.departureDate);
        },

        getStartYFlight(aircraftIndex) {
            return this.heightCorrectionPx + config.row.height * aircraftIndex;
        },

        getPos(flight, aircraftIndex) {
            const aircraft = this.store.getAircraftByFlightId(flight.id);
            if (!aircraftIndex) {
                aircraftIndex = this.store.aircrafts.indexOf(aircraft);
            }

            return {
                start: {
                    x: this.getStartXFlight(flight),
                    y: this.getStartYFlight(aircraftIndex)
                },
                end: {
                    x:
                        this.getStartXFlight(flight) +
                        module.timeline.dateToPx(flight.arrivalDate) -
                        module.timeline.dateToPx(flight.departureDate),
                    y: this.getStartYFlight(aircraftIndex) + config.row.height
                },
                center: {
                    x:
                        this.getStartXFlight(flight) +
                        (module.timeline.dateToPx(flight.arrivalDate) -
                            module.timeline.dateToPx(flight.departureDate)) /
                            2,
                    y: this.getStartYFlight(aircraftIndex) + config.row.height / 2
                }
            };
        },

        getPosElemX(flight) {
            const posElem = this.getPos(flight);
            const posElemLinkTo = this.getPos(this.store.getFlight(flight.linkTo));

            if (posElemLinkTo.start.x > posElem.end.x) {
                return this.getPos(flight).end.x;
            }
            return this.getPos(flight).start.x;
        },

        getPosRelativeLinkToX(flight) {
            const posElem = this.getPos(flight);
            const posElemLinkTo = this.getPos(this.store.getFlight(flight.linkTo));
            if (posElemLinkTo.start.x > posElem.end.x) {
                return posElemLinkTo.start.x - posElem.end.x - config.arrow.pointerSize;
            }
            return posElemLinkTo.end.x - posElem.start.x + config.arrow.pointerSize;
        },

        getFlightCommonProps(flight, aircraftIndex) {
            return {
                pos: this.getPos(flight, aircraftIndex)
            };
        },

        getRectConfig(flight, aircraftIndex) {
            const pos = this.getPos(flight, aircraftIndex);
            return {
                x: pos.start.x,
                y: pos.start.y + config.row.padding,
                width: pos.end.x - pos.start.x,
                height: pos.end.y - pos.start.y - 2 * config.row.padding,
                fill: "green",
                stroke: "green",
                strokeWidth: config.mainLayer.rect.strokeWidth,
                perfectDrawEnabled: false
            };
        }
    }
};
</script>
