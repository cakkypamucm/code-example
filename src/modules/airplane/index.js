import useStore from "./store";
import timeline from "./timeline";

export default new (class {
    constructor() {
        this.store = useStore();
        this.timeline = timeline;
    }

    async fetch() {
        const data = await this.store.fetch();
        window.backdoor = this.store;
        return data;
    }

    getFlightSummary(flightId) {
        const airplane = this.store.getAirplaneByFlightId(flightId);
        const flight = this.store.getFlight(flightId);
        if (airplane == null || flight == null) {
            return `Некорректный flightId`;
        }
        const formatDate = (date) => dayjs(date).format("DD MMM, HH:mm");
        return `Номер: ${airplane.name}        
        \nВылет: ${formatDate(flight.departureDate)}
        \nПосадка: ${formatDate(flight.arrivalDate)}`;
    }
})();
