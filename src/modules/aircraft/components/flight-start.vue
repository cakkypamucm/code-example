<template>
    <app-k-arrow
        :config="{
            x: baseX,
            y: baseY,
            points: [0, config.arrow.length, 0, 0],
            pointerLength: config.arrow.pointerSize,
            pointerWidth: config.arrow.pointerSize,
            fill: config.arrow.color,
            stroke: config.arrow.color,
            strokeWidth: config.arrow.strokeWidth
        }"
    />
    <app-k-text
        :config="{
            text: dateFormatted,
            x: baseX + padding.date,
            y: baseY - config.arrow.correctionRelatedFontDateY,
            rotation: 90,
            align: 'left',
            fontSize: config.arrow.fontSize
        }"
    />
</template>

<script>
import helper from "src/helpers/frontend";
import config from "../config";

export default {
    props: {
        pos: {
            type: Object,
            required: true
        },
        departureDate: {
            type: Date,
            required: true
        },
        padding: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            config,
            helper
        };
    },
    computed: {
        dateFormatted() {
            return dayjs(this.departureDate).format("HH:mm");
        },
        baseX() {
            return this.pos.start.x + this.padding.x;
        },
        baseY() {
            return this.pos.end.y - this.padding.y - this.padding.betweenBodyAndArrows;
        }
    }
};
</script>
