<template>
    <app-k-arrow
        :config="{
            x: baseX,
            y: baseY,
            points: [0, 0, 0, config.arrow.length],
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
            x: baseX + padding.x - 2 * config.arrow.pointerSize - config.arrow.strokeWidth - 1,
            y: baseY - config.arrow.correctionRelatedFontDateY,
            rotation: 90,
            align: 'left',
            fontSize: config.arrow.fontSize
        }"
    />
</template>

<script>
import config from "../config";

export default {
    props: {
        pos: {
            type: Object,
            required: true
        },
        arrivalDate: {
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
            config
        };
    },
    computed: {
        dateFormatted() {
            return dayjs(this.arrivalDate).format("HH:mm");
        },
        baseX() {
            return this.pos.end.x - this.padding.x;
        },
        baseY() {
            return this.pos.start.y + this.padding.y;
        }
    }
};
</script>
