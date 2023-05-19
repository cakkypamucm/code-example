<template>
    <app-k-line
        :config="{
            points: [
                pos.start.x,
                pos.start.y + pos.flight.height - config.brackets.size,
                pos.start.x,
                pos.start.y + pos.flight.height,
                pos.start.x + pos.flight.width,
                pos.start.y + pos.flight.height,
                pos.start.x + pos.flight.width,
                pos.start.y + pos.flight.height - config.brackets.size
            ],
            stroke: config.brackets.strokeColor
        }"
    />
</template>

<script>
import config from "../config";

export default {
    props: {
        flight: {
            type: Object,
            required: true
        },
        pos: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            config
        };
    }
};
</script>
