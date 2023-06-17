import Color from "color";
import scssVars from "src/css/variables.module";
import helper from "src/helpers/frontend";

const betweenItemsLineStroke = "#cecece";
const mainLayerRectRegularFill = "#8eaaff";
const scrollbarRegularFill = "#c1c1c1";

const shortTimeFormat = "H";
const timeFormat = "HH:mm";
const shortDateFormat = "DD.MM";
const dateFormat = `DD MMM, ${timeFormat}`;

const noAircraftsMessageText = "Добавьте сюда воздушные суда";
const noAircraftsFontSize = 16;

export default {
    row: {
        height: 60,
        padding: 6
    },
    stageBackgroundColor: "white",
    fixedLayerBorderStroke: "black",

    betweenItemsLineStroke,
    timelinePrimaryColor: Color(betweenItemsLineStroke).darken(0.4).hex(),

    mainLayer: {
        flightRectTimeoutMs: 4000,
        rect: {
            regularFill: mainLayerRectRegularFill,
            activeFill: Color(mainLayerRectRegularFill).darken(0.25).hex(),
            minimumPaddingX: 5,
            strokeWidth: 2
        },
        noAircraftsMessage: {
            width: helper.canvas.getTextWidth({ text: noAircraftsMessageText, fontSize: noAircraftsFontSize }),
            height: helper.canvas.getTextHeight({ fontSize: noAircraftsFontSize }),
            text: noAircraftsMessageText,
            fontSize: noAircraftsFontSize,
            fill: scssVars["help-text-color"]
        }
    },

    fixedAside: {
        width: 110
    },

    fixedHeader: {
        height: 40
    },

    stageScrollbarLayer: {
        bar: {
            minimumGreaterDimension: 64,
            width: helper.isMobileDevice() ? 32 : 12,
            padding: 0,
            regularFill: scrollbarRegularFill,
            activeFill: Color(scrollbarRegularFill).darken(0.1).hex(),
            opacity: 0.7
        },

        aircraftNumber: {
            y: 22,
            fontSize: 12
        },

        datetime: {
            text: "Дата/время",
            y: 5,
            fontSize: 12
        }
    },

    timelineGrid: {
        opacity: {
            specialHour: 1,
            regularHour: 0.3
        }
    },

    timelineLegend: {
        startOfDay: {
            underlineY: 26,
            textStartY: 8,
            dateFormat: shortDateFormat
        },

        startOfQuarterDay: {
            underlineY: 32,
            textStartY: 18,
            fontSize: 12,
            dateFormat: timeFormat
        }
    },

    chartTitle: "Расписание перелетов",
    departure: "Вылет",
    arrival: "Посадка",

    aircraft: {
        generateId: () => +Math.random().toFixed(5).slice(2),
        number: "Номер борта",
        prefixName: "RA-"
    },

    flight: {
        types: {
            service: {
                availability: {
                    id: "availability",
                    fill: "#7f84ea",
                    text: "Availability"
                },

                maintenance: {
                    id: "maintenance",
                    fill: "#cd7e31",
                    text: "Maintenance"
                }
            }
        }
    },

    arrow: {
        color: "black",
        pointerSize: 2,
        strokeWidth: 2,
        length: 20,
        fontSize: 10,
        correctionRelatedFontDateY: 3
    },

    brackets: {
        size: 10,
        strokeColor: "blue"
    },

    timeFormat,
    shortTimeFormat,
    dateFormat,
    shortDateFormat
};
