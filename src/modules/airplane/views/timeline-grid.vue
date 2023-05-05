<template>
    <template v-if="timeline.totalWidth() / timeline.getHourInPx() >= 1">
        <template v-for="index in timeline.floor(timeline.totalWidth() / timeline.getHourInPx())" :key="index">
            <k-line
                :config="{
                    points: [
                        timeline.getCurrentXByIndex(index),
                        0,
                        timeline.getCurrentXByIndex(index),
                        timeline.totalHeight()
                    ],
                    stroke: timelinePrimaryColor,
                    opacity: timeline.isSpecialHour(timeline.getCurrentDateByIndex(index).hour()) ? 1 : 0.3
                }"
            />
        </template>
    </template>
</template>

<script>
import module from "../index";

export default {
    props: {
        timelinePrimaryColor: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            timeline: module.timeline
        };
    }
};
</script>
