import useStore from "./store";
import moduleConfig from "./config";

export default {
    store: useStore(),

    widthCorrectionPx: moduleConfig.fixedAside.width,

    heightCorrectionPx: moduleConfig.fixedHeader.height,

    totalHeight() {
        if (this.store.airplanes.length) {
            return this.heightCorrectionPx + this.store.airplanes.length * moduleConfig.rowHeight;
        }
        return moduleConfig.mainLayer.noAirplanesMessage.height;
    },

    totalWidth() {
        if (this.store.maxArrivalMs) {
            return (
                this.widthCorrectionPx +
                this.dateToPx(new Date(this.store.maxArrivalMs)) +
                this.getTotalWidthCorrection()
            );
        }
        return moduleConfig.mainLayer.noAirplanesMessage.width;
    },

    // судя по тестовым данным, типичный полёт длится несколько часов => удобно принять, что 1час=60px, 1мин=1px
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
        return _.defaults(config, moduleConfig.fontDefaults);
    }
};
