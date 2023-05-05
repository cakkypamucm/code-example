import scssVars from "@/assets/scss/variables.module";
import useStore from "./store";

export default {
    store: useStore(),

    setWidthCorrectionPx(correctionPx) {
        this.widthCorrectionPx = correctionPx;
    },

    setHeightCorrectionPx(correctionPx) {
        this.heightCorrectionPx = correctionPx;
    },

    setRowHeight(rowHeight) {
        this.rowHeight = rowHeight;
    },

    totalHeight() {
        if (this.store.airplanes.length) {
            return this.heightCorrectionPx + this.store.airplanes.length * this.rowHeight;
        }
        return this.noAirplanesMessageHeight;
    },

    totalWidth() {
        if (this.store.maxArrivalMs) {
            return (
                this.widthCorrectionPx +
                this.dateToPx(new Date(this.store.maxArrivalMs)) +
                this.getTotalWidthCorrection()
            );
        }
        return this.noAirplanesMessageWidth;
    },

    // cудя по тестовым данным, типичный полёт длится несколько часов => удобно принять, что 1час=60px, 1мин=1px
    dateToPx(date) {
        const minDate = new Date(this.store.minDepartureMs);
        return dayjs(date).diff(minDate, "minute");
    },

    getCurrentXByIndex(index) {
        return (
            this.widthCorrectionPx +
            this.dateToPx(dayjs(this.store.minDepartureMs).add(1, "hour").startOf("hour").toDate()) +
            (index - 1) * this.getHourInPx()
        );
    },

    getCurrentDateByIndex(index) {
        return dayjs(this.store.minDepartureMs).add(index, "hour").startOf("hour");
    },

    getHourInPx() {
        return this.dateToPx(dayjs(this.store.minDepartureMs).add(1, "hour").toDate());
    },

    getTotalWidthCorrection() {
        let correction = this.getHourInPx() / 2;
        if (this.isSpecialHour(dayjs(this.store.maxArrivalMs).hour())) {
            correction += this.getHourInPx() / 2;
        }
        return correction;
    },

    isSpecialHour(hour) {
        return hour % 6 === 0;
    },

    setTextDefaults(config) {
        return _.defaults(config, { fontSize: 16, fontFamily: "Helvetica", wrap: "none", ellipsis: true });
    },

    noAirplanesMessageWidth: 245,
    noAirplanesMessageHeight: 16,

    noAirplanesMessageConfig: {
        text: "Добавьте сюда воздушные суда",
        fill: scssVars["help-text-color"]
    },

    floor: Math.floor
};
