import { defineStore } from "pinia";

import service from "./service";

const flightsById = new Map();
const airplanesById = new Map();

export default defineStore("airplane", {
    state: () => ({
        airplanes: []
    }),
    getters: {
        getFlight: (state) => (id) => {
            const info = flightsById.get(id);
            if (info == null) {
                return null;
            }
            const airplane = state.airplanes[info.airplaneIndex];
            return airplane.flights[info.flightIndex];
        },
        getAirplaneByFlightId: (state) => (id) => {
            const info = flightsById.get(id);
            if (info == null) {
                return null;
            }
            return state.airplanes[info.airplaneIndex];
        },
        minDepartureMs(state) {
            return state.airplanes.reduce(
                (minInAirplanes, airplane) =>
                    airplane.flights.reduce(
                        (min, flight) => Math.min(min, flight.departureDate.getTime()),
                        minInAirplanes
                    ),
                Number.MAX_SAFE_INTEGER
            );
        },
        maxArrivalMs(state) {
            return state.airplanes.reduce(
                (maxInAirplanes, airplane) =>
                    airplane.flights.reduce(
                        (max, flight) => Math.max(max, flight.arrivalDate.getTime()),
                        maxInAirplanes
                    ),
                0
            );
        }
    },
    actions: {
        async fetch() {
            this.airplanes = await service.fetch();

            this.airplanes.forEach((airplane, airplaneIndex) => {
                airplanesById.set(airplane.id, { airplaneIndex });

                airplane.flights.forEach((flight, flightIndex) => {
                    flightsById.set(flight.id, { airplaneIndex, flightIndex });
                });
            });
        },
        push(airplane) {
            if (!airplanesById.get(airplane.id)) {
                this.airplanes.push(airplane);
                const airplaneIndex = this.airplanes.length - 1;
                airplanesById.set(airplane.id, { airplaneIndex });

                airplane.flights.forEach((flight, flightIndex) => {
                    flightsById.set(flight.id, { airplaneIndex, flightIndex });
                });
            }
        },
        splice(...rest) {
            const airplanes = this.airplanes.splice(rest);

            airplanes.forEach((airplane) => {
                airplanesById.delete(airplane.id);

                airplane.flights.forEach((flight) => {
                    flightsById.delete(flight.id);
                });
            });
        }
    }
});
