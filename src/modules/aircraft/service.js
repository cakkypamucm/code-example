import config from "./config";

export default {
    fetch(aircraftsCount, flightsCount) {
        return new Promise((resolve) => resolve(this.generate(aircraftsCount, flightsCount)));
    },

    generate(aircraftsCount, flightsCount) {
        aircraftsCount = Number.parseInt(aircraftsCount);
        if (Number.isNaN(aircraftsCount) || aircraftsCount < 0) {
            aircraftsCount = 12;
        }
        flightsCount = Number.parseInt(flightsCount);
        if (Number.isNaN(flightsCount) || flightsCount <= 0) {
            flightsCount = 10;
        }

        const averageDurationHours = 4;
        return _.range(aircraftsCount).map(() => {
            const id = config.aircraft.generateId();
            const aircraft = {
                id,
                name: `${config.aircraft.prefixName + id}`
            };
            const initialDate = dayjs().subtract(1, "day").startOf("hour");
            aircraft.flights = _.range(flightsCount).map((flightsIndex) => {
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
                const flight = {
                    id: config.aircraft.generateId(),
                    departureDate: departureDate.utc().toDate(),
                    arrivalDate: arrivalDate.utc().toDate()
                };
                if (Math.random() > 0.8) {
                    flight.serviceMode = {};
                    flight.serviceMode.id =
                        Math.random() > 0.5 ? config.serviceModes.availability.id : config.serviceModes.maintenance.id;
                }
                return flight;
            });
            return aircraft;
        });
    }
};
