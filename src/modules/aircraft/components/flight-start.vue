<template>
    <app-k-line
        :config="{
            points: [
                baseX,
                baseY + config.arrow.mainHeight,
                baseX,
                baseY,
                baseX + config.arrow.pointerSize,
                baseY + config.arrow.pointerSize,
                baseX - config.arrow.pointerSize,
                baseY + config.arrow.pointerSize
            ],
            stroke: config.arrow.color
        }"
    />
    <app-k-text
        :config="{
            text: date,
            x: baseX + pos.padding.date,
            y: baseY + config.arrow.pointerSize - 5,
            rotation: 90,
            align: 'left',
            width: 50,
            fontSize: 10
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
            config,

            baseX: this.pos.start.x + this.pos.padding.x,
            baseY: this.pos.start.y + this.pos.padding.y,
            date: dayjs(this.flight.departureDate).format("HH:mm")
        };
    }
};
</script>
