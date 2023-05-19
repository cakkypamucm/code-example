import Color from "color";
import scssVars from "@/assets/scss/variables.module";
import helper from "@/helpers/frontend";

const betweenItemsLineStroke = "#cecece";
const mainLayerRectRegularFill = "#8eaaff";
const scrollbarRegularFill = "#c1c1c1";

const shortTimeFormat = "H";
const timeFormat = `HH:mm`;
const shortDateFormat = "DD.MM";
const dateFormat = `DD MMM, ${timeFormat}`;
export default {
    rowHeight: 60,

    stageBackgroundColor: "white",
    fixedLayerBorderStroke: "black",

    betweenItemsLineStroke,
    timelinePrimaryColor: Color(betweenItemsLineStroke).darken(0.4).hex(),

    mainLayer: {
        flightRectTimeoutMs: 4000,
        rect: {
            regularFill: mainLayerRectRegularFill,
            activeFill: Color(mainLayerRectRegularFill).darken(0.25).hex(),
            padding: 6,
            strokeWidth: 2
        },
        noAircraftsMessage: {
            width: 245,
            height: 16,
            text: "Добавьте сюда воздушные суда",
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

    serviceModes: {
        availability: {
            id: "availability",
            color: "#7f84ea",
            text: "Availability"
        },

        maintenance: {
            id: "maintenance",
            color: "#cd7e31",
            text: "Maintenance"
        }
    },

    arrow: {
        color: "black",
        pointerSize: 2,
        strokeWidth: 2,
        mainHeight: 20
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
