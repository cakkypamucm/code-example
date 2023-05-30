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

        const crossRowLinkedRects = [];
        const aircraftAlreadyWithArrow = {};

        const averageDurationHours = 4;
        const aircrafts = _.range(aircraftsCount).map((aircraftIndex) => {
            const id = config.aircraft.generateId();
            const aircraft = {
                id,
                name: `${config.aircraft.prefixName + id}`
            };
            const initialDate = dayjs().subtract(1, "day").startOf("hour");
            aircraft.flights = _.range(flightsCount).map((flightIndex) => {
                let departureDate = initialDate.add(
                    Math.round((flightIndex + Math.random()) * averageDurationHours * 4) / 4,
                    "hour"
                );
                const arrivalDate = departureDate.add(
                    initialDate
                        .add(Math.round((flightIndex + 1) * averageDurationHours), "hour")
                        .diff(departureDate, "hour"),
                    "hour"
                );
                if (arrivalDate.isSame(departureDate)) {
                    departureDate = arrivalDate.subtract(45, "minute");
                }
                const flight = {
                    id: config.aircraft.generateId(),
                    departureDate: departureDate.utc().toDate(),
                    arrivalDate: arrivalDate.utc().toDate(),
                    type: {
                        id: "usual"
                    }
                };
                if (Math.random() > 0.8) {
                    flight.type = {
                        id: "service",
                        name:
                            Math.random() > 0.5
                                ? config.flight.types.service.availability.id
                                : config.flight.types.service.maintenance.id
                    };
                    flight.type.text = config.flight.types.service[flight.type.name].text;
                    flight.type.fill = config.flight.types.service[flight.type.name].fill;
                }
                this.generateAllCrossRowLinkedRects({
                    crossRowLinkedRects,
                    aircraftIndex,
                    flight,
                    aircraftAlreadyWithArrow
                });
                return flight;
            });
            return aircraft;
        });

        this.setLinkToCrossRowLinkedRects(crossRowLinkedRects);
        return aircrafts;
    },

    generateAllCrossRowLinkedRects({ crossRowLinkedRects, aircraftIndex, flight, aircraftAlreadyWithArrow }) {
        if (flight.type.id === "service" && !aircraftAlreadyWithArrow[aircraftIndex]) {
            crossRowLinkedRects.push(flight);
            aircraftAlreadyWithArrow[aircraftIndex] = true;
        }
    },

    setLinkToCrossRowLinkedRects(crossRowLinkedRects) {
        crossRowLinkedRects.forEach((flight, index) => {
            flight.linkTo = index % 2 === 1 ? crossRowLinkedRects[index - 1]?.id : crossRowLinkedRects[index + 1]?.id;
        });
    }
};
