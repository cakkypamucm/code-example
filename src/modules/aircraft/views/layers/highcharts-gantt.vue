<template>
    <template v-if="store.alreadyFetched">
        <highcharts
            v-if="store.aircrafts.length"
            class="chart"
            :constructor-type="'ganttChart'"
            :options="chartOptions"
        />
        <template v-else>
            <span class="no-aircraft-message">
                {{ config.mainLayer.noAircraftsMessage.text }}
            </span>
        </template>
    </template>
</template>

<script>
/* eslint-disable no-magic-numbers */ // т.к. не поддерживаю далее
import useStore from "../../store";
import config from "../../config";

// @see https://stackoverflow.com/a/67738868
// вертикальный скролл тоже можно подключить, но тогда после загрузки данных один раз наблюдается reflow секунд 10
export default {
    data() {
        const vm = this;
        return {
            store: useStore(),
            config,

            customShapes: [],

            chartOptions: {
                chart: {
                    animation: false,
                    events: {
                        render() {
                            vm.onRender(this);
                        }
                    }
                },

                plotOptions: {
                    series: {
                        allowPointSelect: true,

                        states: {
                            inactive: {
                                opacity: 1
                            }
                        }
                    }
                },

                series: [],

                title: {
                    useHTML: true,
                    text: `${config.chartTitle} - <a href="${vm.productionAbsoluteUrl}/code-example/blob/master/src/docs/research/highcharts-gantt.md">research</a>`
                },

                xAxis: [
                    {
                        type: "datetime",
                        range: dayjs.duration(24, "hours").asMilliseconds(),
                        startOnTick: true,
                        endOnTick: true,
                        tickWidth: 1,
                        gridLineWidth: 1,
                        labels: {
                            align: "center",
                            useHtml: true,
                            formatter() {
                                const date = dayjs(this.value);
                                if (date.isSame(date.startOf("day"))) {
                                    return `<b>${date.format(config.shortDateFormat)}</b>`;
                                }
                                return date.format(config.shortTimeFormat);
                            }
                        }
                    }
                ],

                yAxis: {
                    categories: [],
                    staticScale: 60
                },

                navigator: {
                    enabled: true
                },

                tooltip: {
                    outside: true
                }
            }
        };
    },

    watch: {
        "store.alreadyFetched": {
            handler() {
                this.setData();
            }
        }
    },

    beforeUnmount() {
        this.customShapes.forEach((shape) => {
            shape.destroy();
        });
    },

    methods: {
        setData() {
            const series = [];
            const categories = [];

            this.store.aircrafts.forEach((aircraft, index) => {
                series.push({
                    name: aircraft.name,
                    data: _.map(aircraft.flights, (flight) => ({
                        start: flight.departureDate.getTime(),
                        end: flight.arrivalDate.getTime(),
                        flight,
                        y: index,
                        color: flight.type.id === "service" ? flight.type.fill : "transparent"
                    }))
                });
                categories.push(aircraft.name);
            });
            this.chartOptions.series = series;
            this.chartOptions.yAxis.categories = categories;
        },

        onRender(chart) {
            this.customShapes.forEach((shape) => {
                shape.destroy();
            });

            chart.series.forEach((serie) => {
                serie.points.forEach((point) => {
                    const pointX = point.plotX + chart.plotLeft;
                    const pointY = point.plotY + chart.plotTop - 10;

                    if (point.options.flight.type.id === "usual") {
                        this.addArrowUp({
                            chart,
                            x: pointX + config.arrow.pointerSize,
                            y: pointY
                        });
                        this.addText(
                            {
                                chart,
                                text: dayjs(point.options.start).format("HH:mm"),
                                x: pointX + 7 + config.arrow.pointerSize,
                                y: pointY - 5
                            },
                            (shape) => shape.attr({ rotation: 90 })
                        );

                        this.addText(
                            {
                                chart,
                                text: dayjs(point.options.end).format("HH:mm"),
                                x: pointX + point.shapeArgs.width - 14,
                                y: pointY - 5
                            },
                            (shape) => shape.attr({ rotation: 90 })
                        );
                        this.addArrowDown({
                            chart,
                            x: pointX + point.shapeArgs.width - 2 * config.arrow.pointerSize,
                            y: pointY
                        });

                        this.addBrackets({ chart, x: pointX, y: pointY, point });
                    } else if (point.options.flight.type.id === "service") {
                        this.addText({
                            chart,
                            text: point.options.flight.type.text,
                            x: pointX + point.shapeArgs.width / 2 - 30,
                            y: pointY + point.shapeArgs.height / 2
                        });
                    }
                });
            });
        },

        addText({ chart, text, x, y }, beforeAdd = _.noop) {
            const textShape = chart.renderer.text(text, x, y).css({
                fontSize: "10px"
            });
            beforeAdd(textShape);
            this._addShape(chart, textShape, beforeAdd);
        },

        addArrowUp({ chart, x, y }) {
            const arrowMainX = x + config.arrow.strokeWidth;
            const arrowMainY = y;

            const arrow = chart.renderer
                .path([
                    "M",
                    arrowMainX,
                    arrowMainY + config.arrow.length,
                    "L",
                    arrowMainX,
                    arrowMainY,
                    "L",
                    arrowMainX + config.arrow.pointerSize,
                    arrowMainY + config.arrow.pointerSize,
                    "M",
                    arrowMainX,
                    arrowMainY,
                    "L",
                    arrowMainX - config.arrow.pointerSize,
                    arrowMainY + config.arrow.pointerSize
                ])
                .attr({
                    "stroke-width": config.arrow.strokeWidth,
                    stroke: config.arrow.color
                });
            this._addShape(chart, arrow);
        },

        addArrowDown({ chart, x, y }) {
            const arrowMainX = x + config.arrow.strokeWidth;
            const arrowMainY = y;

            const arrow = chart.renderer
                .path([
                    "M",
                    arrowMainX,
                    arrowMainY,
                    "L",
                    arrowMainX,
                    arrowMainY + config.arrow.length,
                    "L",
                    arrowMainX - config.arrow.pointerSize,
                    arrowMainY + config.arrow.length - config.arrow.pointerSize,
                    "M",
                    arrowMainX,
                    arrowMainY + config.arrow.length,
                    "L",
                    arrowMainX + config.arrow.pointerSize,
                    arrowMainY + config.arrow.length - config.arrow.pointerSize
                ])
                .attr({
                    "stroke-width": config.arrow.strokeWidth,
                    stroke: "black"
                });
            this._addShape(chart, arrow);
        },

        addBrackets({ chart, point, x, y }) {
            const mainX = x + config.arrow.strokeWidth;
            const mainY = y;
            const { size: bracketsSize } = this.config.brackets;
            const brackets = chart.renderer
                .path([
                    "M",
                    mainX,
                    mainY + bracketsSize,
                    "L",
                    mainX,
                    mainY + 2 * bracketsSize,
                    "L",
                    mainX + point.shapeArgs.width + bracketsSize,
                    mainY + 2 * bracketsSize,
                    "L",
                    mainX + point.shapeArgs.width + bracketsSize,
                    mainY + bracketsSize
                ])
                .attr({
                    "stroke-width": config.arrow.strokeWidth,
                    stroke: config.brackets.strokeColor
                });
            this._addShape(chart, brackets);
        },

        _addShape(chart, shape) {
            const zIndexAboveRect = 3;
            shape.attr({
                zIndex: zIndexAboveRect
            });
            shape.add();
            this.customShapes.push(shape);
        }
    }
};
</script>

<style lang="scss" scoped>
.chart {
    min-width: 90vw;
    min-width: 90svw;
    min-height: 80vh;
    min-height: 80svh;
}

.no-aircraft-message {
    color: v-bind("config.mainLayer.noAircraftsMessage.fill");
}
</style>
