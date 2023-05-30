<template>
    <app-k-line
        :config="{
            points: [
                pos.start.x,
                pos.end.y - config.row.padding - config.brackets.size,
                pos.start.x,
                pos.end.y - config.row.padding,
                pos.end.x,
                pos.end.y - config.row.padding,
                pos.end.x,
                pos.end.y - config.row.padding - config.brackets.size
            ],
            stroke: config.brackets.strokeColor
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
        }
    },
    data() {
        return {
            config
        };
    }
};
</script>
