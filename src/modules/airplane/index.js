import useStore from "./store";
import timeline from "./timeline";
import config from "./config";

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
            return "Некорректный flightId";
        }
        const formatDate = (date) => dayjs(date).format(config.flightSummary.dateFormat);
        return `${config.airplane.number}: ${airplane.name}        
        \n${config.departure}: ${formatDate(flight.departureDate)}
        \n${config.arrival}: ${formatDate(flight.arrivalDate)}`;
    }
})();
