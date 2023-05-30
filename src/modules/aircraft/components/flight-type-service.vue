<template>
    <app-k-rect
        ref="rect"
        :config="{
            x: pos.start.x,
            y: pos.start.y + config.row.padding,
            width: pos.end.x - pos.start.x,
            height: pos.end.y - pos.start.y - 2 * config.row.padding,
            fill: fill,
            stroke: fill,
            strokeWidth: config.mainLayer.rect.strokeWidth,
            perfectDrawEnabled: false
        }"
    />
    <app-k-text
        :config="{
            dataId: id,
            text: text,
            x: pos.start.x + config.mainLayer.rect.minimumPaddingX,
            y: pos.start.y + config.row.padding,
            width: pos.end.x - pos.start.x - config.mainLayer.rect.minimumPaddingX,
            height: pos.end.y - pos.start.y - 2 * config.row.padding,
            verticalAlign: 'middle'
        }"
        @pointerenter="$emit('flight-service-pointerenter', id)"
        @pointerleave="$emit('flight-service-pointerleave', id)"
        @pointerdown="onPointerdownHandler"
    />
</template>

<script>
import config from "../config";
import module from "../index";

export default {
    props: {
        pos: {
            type: Object,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        fill: {
            type: String,
            required: true
        }
    },
    emits: {
        "flight-service-pointerenter": (id) => !!id,
        "flight-service-pointerleave": (id) => !!id,
        "flight-service-pointerdown": (id) => !!id
    },

    data() {
        return {
            module,
            config
        };
    },
    methods: {
        onPointerdownHandler() {
            this.$emit("flight-service-pointerdown", this.id);

            const rect = this.$refs.rect.getStage();
            rect.fill(this.config.mainLayer.rect.activeFill);
            rect.stroke(this.config.mainLayer.rect.activeFill);
            setTimeout(() => {
                rect.fill(this.config.mainLayer.rect.regularFill);
                rect.stroke(this.config.mainLayer.rect.regularFill);
            }, this.config.mainLayer.flightRectTimeoutMs);
        }
    }
};
</script>
