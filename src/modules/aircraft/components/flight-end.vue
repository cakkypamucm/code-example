<template>
    <app-k-line
        :config="{
            points: [
                baseX,
                baseY,
                baseX,
                baseY + config.arrow.mainHeight,
                baseX - config.arrow.pointerSize,
                baseY + config.arrow.mainHeight - config.arrow.pointerSize,
                baseX,
                baseY + config.arrow.mainHeight,
                baseX + config.arrow.pointerSize,
                baseY + config.arrow.mainHeight - config.arrow.pointerSize
            ],
            stroke: config.arrow.color
        }"
    />
    <app-k-text
        :config="{
            text: date,
            x: pos.end.x - config.arrow.pointerSize - 5,
            y: pos.end.y - pos.padding.y + config.arrow.pointerSize - pos.padding.date,
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

            baseX: this.pos.end.x - this.pos.padding.x,
            baseY: this.pos.end.y - this.pos.flight.height + this.pos.padding.y,

            date: dayjs(this.flight.arrivalDate).format("HH:mm")
        };
    }
};
</script>
