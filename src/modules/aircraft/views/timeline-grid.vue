<template>
    <template v-if="timeline.totalWidth() / timeline.getHourInPx() >= 1">
        <template v-for="index in Math.floor(timeline.totalWidth() / timeline.getHourInPx())" :key="index">
            <app-k-line
                :config="{
                    points: [
                        timeline.getCurrentXByIndex(index),
                        0,
                        timeline.getCurrentXByIndex(index),
                        timeline.totalHeight()
                    ],
                    stroke: config.timelinePrimaryColor,
                    opacity: timeline.isSpecialHour(timeline.getCurrentDateByIndex(index).hour())
                        ? config.timelineGrid.opacity.specialHour
                        : config.timelineGrid.opacity.regularHour
                }"
            />
        </template>
    </template>
</template>

<script>
import module from "../index";
import config from "../config";

export default {
    data() {
        return {
            config,
            timeline: module.timeline
        };
    }
};
</script>
