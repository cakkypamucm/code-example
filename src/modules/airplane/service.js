export default {
    fetch() {
        return new Promise((resolve) => resolve(this.generate()));
    },

    generate() {
        const airplanesCount = 12 + Math.round(Math.random() * 5);
        const flightsCount = 10 + Math.round(Math.random() * 5);
        const averageDurationHours = 4;
        const generateId = () => +Math.random().toFixed(5).slice(2);

        return _.range(airplanesCount).map(() => {
            const id = generateId();
            const airplane = {
                id,
                name: `RA-${id}`
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
                    id: generateId(),
                    departureDate: departureDate.toDate(),
                    arrivalDate: arrivalDate.toDate()
                };
            });
            return airplane;
        });
    }
};
