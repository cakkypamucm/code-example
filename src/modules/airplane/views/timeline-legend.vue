<template>
    <template v-if="timeline.totalWidth() / timeline.getHourInPx() >= 1">
        <template v-for="index in floor(timeline.totalWidth() / timeline.getHourInPx())" :key="index">
            <template v-if="timeline.getCurrentDateByIndex(index).hour() === 0">
                <k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            config.timelineLegend.startOfDay.underlineY,
                            timeline.getCurrentXByIndex(index),
                            config.fixedHeader.height
                        ],
                        stroke: config.timelinePrimaryColor
                    }"
                />
                <k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            config.timelineLegend.startOfDay.underlineY,
                            timeline.getCurrentXByIndex(index) + timeline.getHourInPx(),
                            config.timelineLegend.startOfDay.underlineY
                        ],
                        stroke: config.timelinePrimaryColor
                    }"
                />
                <k-text
                    :config="
                        timeline.setTextDefaults({
                            x: timeline.getCurrentXByIndex(index),
                            y: config.timelineLegend.startOfDay.textStartY,
                            text: timeline
                                .getCurrentDateByIndex(index)
                                .format(config.timelineLegend.startOfDay.dateFormat),
                            fill: config.timelinePrimaryColor
                        })
                    "
                />
            </template>
            <template v-else-if="timeline.isSpecialHour(timeline.getCurrentDateByIndex(index).hour())">
                <k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            config.timelineLegend.startOfQuarterDay.underlineY,
                            timeline.getCurrentXByIndex(index),
                            config.fixedHeader.height
                        ],
                        stroke: config.timelinePrimaryColor
                    }"
                />
                <k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            config.timelineLegend.startOfQuarterDay.underlineY,
                            timeline.getCurrentXByIndex(index) + timeline.getHourInPx() / 2,
                            config.timelineLegend.startOfQuarterDay.underlineY
                        ],
                        stroke: config.timelinePrimaryColor
                    }"
                />
                <k-text
                    :config="
                        timeline.setTextDefaults({
                            x: timeline.getCurrentXByIndex(index),
                            y: config.timelineLegend.startOfQuarterDay.textStartY,
                            fontSize: config.timelineLegend.startOfQuarterDay.fontSize,
                            text: timeline
                                .getCurrentDateByIndex(index)
                                .format(config.timelineLegend.startOfQuarterDay.dateFormat),
                            fill: config.timelinePrimaryColor
                        })
                    "
                />
            </template>
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
            timeline: module.timeline,
            floor: Math.floor
        };
    }
};
</script>
