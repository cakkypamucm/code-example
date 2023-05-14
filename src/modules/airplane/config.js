import Color from "color";
import scssVars from "@/assets/scss/variables.module";
import helper from "@/helpers/frontend";

const betweenItemsLineStroke = "#cecece";
const mainLayerRectRegularFill = "#8eaaff";
const scrollbarRegularFill = "#c1c1c1";

export default {
    rowHeight: 40,

    stageBackgroundColor: "white",
    fixedLayerBorderStroke: "black",

    betweenItemsLineStroke,
    timelinePrimaryColor: Color(betweenItemsLineStroke).darken(0.4).hex(),

    fontDefaults: {
        fontSize: 16,
        fontFamily: "Helvetica",
        wrap: "none",
        ellipsis: true
    },

    mainLayer: {
        flightRectTimeoutMs: 4000,
        rect: {
            regularFill: mainLayerRectRegularFill,
            activeFill: Color(mainLayerRectRegularFill).darken(0.25).hex(),
            padding: 6,
            strokeWidth: 2
        },
        noAirplanesMessage: {
            width: 245,
            height: 16,
            text: "Добавьте сюда воздушные суда",
            fill: scssVars["help-text-color"]
        }
    },

    fixedAside: {
        width: 110,
        textStartX: 15
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

        airplaneNumber: {
            y: 22,
            fontSize: 12
        },

        datetime: {
            text: "Дата/время",
            x: 35,
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
            dateFormat: "DD MMM"
        },

        startOfQuarterDay: {
            underlineY: 32,
            textStartY: 18,
            fontSize: 12,
            dateFormat: "HH:mm"
        }
    },

    flightSummary: {
        dateFormat: "DD MMM, HH:mm"
    },

    departure: "Вылет",
    arrival: "Посадка",

    airplane: {
        generateId: () => +Math.random().toFixed(5).slice(2),
        number: "Номер борта",
        prefixName: "RA-"
    }
};
