import useStore from "./store";
import timeline from "./timeline";
import config from "./config";

export default new (class {
    constructor() {
        this.store = useStore();
        this.timeline = timeline;
    }

    async fetch(aircraftsCounts, flightsCount) {
        const data = await this.store.fetch(aircraftsCounts, flightsCount);
        window.backdoor = this.store;
        return data;
    }

    getFlightSummary(flightId) {
        const aircraft = this.store.getAircraftByFlightId(flightId);
        const flight = this.store.getFlight(flightId);
        if (aircraft == null || flight == null) {
            return "Некорректный flightId";
        }
        const formatDate = (date) => dayjs(date).format(config.dateFormat);
        return `${config.aircraft.number}: ${aircraft.name}        
        \n${config.departure}: ${formatDate(flight.departureDate)}
        \n${config.arrival}: ${formatDate(flight.arrivalDate)}`;
    }
})();
