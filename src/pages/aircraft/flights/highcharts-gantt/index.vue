<template>
    <app-layout-page-default>
        <div class="fps">FPS: {{ fps }}</div>
        <highcharts-gantt />
    </app-layout-page-default>
</template>

<script>
import { useFps } from "@vueuse/core";
import { useRoute } from "vue-router";
import module from "src/modules/aircraft";
import moduleConfig from "src/modules/aircraft/config";
import HighchartsGantt from "src/modules/aircraft/views/layers/highcharts-gantt";

export default {
    components: {
        HighchartsGantt
    },
    data() {
        return {
            moduleConfig,
            fps: useFps()
        };
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            const { aircraftsCount, flightsCount } = useRoute().query;
            await module.fetch(aircraftsCount, flightsCount);
        }
    }
};
</script>

<style lang="scss" scoped>
@use "src/css/_base";

:deep(.main) {
    display: flex;
    min-width: calc(v-bind("moduleConfig.mainLayer.noAircraftsMessage.width") * 1px);
    min-height: 300px;
    align-items: center;
    justify-content: center;
}

.fps {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background: v-bind("moduleConfig.stageBackgroundColor");

    @include base.column-padding;
}
</style>
