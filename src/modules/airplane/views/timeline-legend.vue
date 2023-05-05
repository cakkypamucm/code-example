<template>
    <template v-if="timeline.totalWidth() / timeline.getHourInPx() >= 1">
        <template v-for="index in timeline.floor(timeline.totalWidth() / timeline.getHourInPx())" :key="index">
            <template v-if="timeline.getCurrentDateByIndex(index).hour() === 0">
                <k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            underlineYStartOfDay,
                            timeline.getCurrentXByIndex(index),
                            fixedHeaderHeight
                        ],
                        stroke: timelinePrimaryColor
                    }"
                />
                <k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            underlineYStartOfDay,
                            timeline.getCurrentXByIndex(index) + timeline.getHourInPx(),
                            underlineYStartOfDay
                        ],
                        stroke: timelinePrimaryColor
                    }"
                />
                <k-text
                    :config="
                        timeline.setTextDefaults({
                            x: timeline.getCurrentXByIndex(index),
                            y: 8,
                            text: timeline.getCurrentDateByIndex(index).format('DD MMM'),
                            fill: timelinePrimaryColor
                        })
                    "
                />
            </template>
            <template v-else-if="timeline.isSpecialHour(timeline.getCurrentDateByIndex(index).hour())">
                <k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            underlineYStartOfQuarterDay,
                            timeline.getCurrentXByIndex(index),
                            fixedHeaderHeight
                        ],
                        stroke: timelinePrimaryColor
                    }"
                />
                <k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            underlineYStartOfQuarterDay,
                            timeline.getCurrentXByIndex(index) + timeline.getHourInPx() / 2,
                            underlineYStartOfQuarterDay
                        ],
                        stroke: timelinePrimaryColor
                    }"
                />
                <k-text
                    :config="
                        timeline.setTextDefaults({
                            x: timeline.getCurrentXByIndex(index),
                            y: 18,
                            fontSize: 12,
                            text: timeline.getCurrentDateByIndex(index).format('HH:mm'),
                            fill: timelinePrimaryColor
                        })
                    "
                />
            </template>
        </template>
    </template>
</template>

<script>
import module from "../index";

export default {
    props: {
        fixedHeaderHeight: {
            type: Number,
            required: true
        },
        timelinePrimaryColor: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            timeline: module.timeline,
            underlineYStartOfDay: 26,
            underlineYStartOfQuarterDay: 32
        };
    }
};
</script>
