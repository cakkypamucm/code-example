<template>
    <flight-start :departure-date="departureDate" :pos="pos" :padding="padding" />
    <flight-body :pos="pos" />
    <flight-end :arrival-date="arrivalDate" :pos="pos" :padding="padding" />
</template>

<script>
import config from "../config";
import module from "../index";
import FlightStart from "./flight-start";
import FlightBody from "./flight-body";
import FlightEnd from "./flight-end";

export default {
    components: {
        FlightStart,
        FlightBody,
        FlightEnd
    },
    props: {
        pos: {
            type: Object,
            required: true
        },
        departureDate: {
            type: Date,
            required: true
        },
        arrivalDate: {
            type: Date,
            required: true
        }
    },
    data() {
        return {
            module,
            config,

            padding: {
                betweenBodyAndArrows: 7,
                x: 2 * config.arrow.strokeWidth,
                y: config.arrow.length + config.row.padding,
                date: 12
            }
        };
    }
};
</script>
