<template>
    <template v-if="timeline.totalWidth() / timeline.getHourInPx() >= 1">
        <template v-for="index in Math.floor(timeline.totalWidth() / timeline.getHourInPx())" :key="index">
            <template v-if="timeline.getCurrentDateByIndex(index).hour() === 0">
                <app-k-line
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
                <app-k-line
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
                <app-k-text
                    :config="{
                        text: timeline.getCurrentDateByIndex(index).format(config.timelineLegend.startOfDay.dateFormat),
                        x: timeline.getCurrentXByIndex(index),
                        y: config.timelineLegend.startOfDay.textStartY,
                        fill: config.timelinePrimaryColor
                    }"
                />
            </template>
            <template v-else-if="timeline.isSpecialHour(timeline.getCurrentDateByIndex(index).hour())">
                <app-k-line
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
                <app-k-line
                    :config="{
                        points: [
                            timeline.getCurrentXByIndex(index),
                            config.timelineLegend.startOfQuarterDay.underlineY,
                            timeline.getCurrentXByIndex(index) + timeline.getHourInPx() * 0.6,
                            config.timelineLegend.startOfQuarterDay.underlineY
                        ],
                        stroke: config.timelinePrimaryColor
                    }"
                />
                <app-k-text
                    :config="{
                        text: timeline
                            .getCurrentDateByIndex(index)
                            .format(config.timelineLegend.startOfQuarterDay.dateFormat),
                        x: timeline.getCurrentXByIndex(index),
                        y: config.timelineLegend.startOfQuarterDay.textStartY,
                        fontSize: config.timelineLegend.startOfQuarterDay.fontSize,
                        fill: config.timelinePrimaryColor
                    }"
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
            timeline: module.timeline
        };
    }
};
</script>
