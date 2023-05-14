import config from "./config";

export default {
    fetch() {
        return new Promise((resolve) => resolve(this.generate()));
    },

    generate() {
        const airplanesCount = 12 + Math.round(Math.random() * 5);
        const flightsCount = 10 + Math.round(Math.random() * 5);
        const averageDurationHours = 4;

        return _.range(airplanesCount).map(() => {
            const id = config.airplane.generateId();
            const airplane = {
                id,
                name: `${config.airplane.prefixName + id}`
            };
            const initialDate = dayjs().subtract(1, "day").startOf("hour");
            airplane.flights = _.range(flightsCount).map((flightsIndex) => {
                let departureDate = initialDate.add(
                    Math.round((flightsIndex + Math.random()) * averageDurationHours * 4) / 4,
                    "hour"
                );
                const arrivalDate = departureDate.add(
                    initialDate
                        .add(Math.round((flightsIndex + 1) * averageDurationHours), "hour")
                        .diff(departureDate, "hour"),
                    "hour"
                );
                if (arrivalDate.isSame(departureDate)) {
                    departureDate = arrivalDate.subtract(45, "minute");
                }
                return {
                    id: config.airplane.generateId(),
                    departureDate: departureDate.toDate(),
                    arrivalDate: arrivalDate.toDate()
                };
            });
            return airplane;
        });
    }
};
