import { defineStore } from "pinia";

import service from "./service";

const aircraftsById = new Map();
const flightsById = new Map();

export default defineStore("aircraft", {
    state: () => ({
        aircrafts: [],
        alreadyFetched: false
    }),
    getters: {
        getFlight: (state) => (id) => {
            const info = flightsById.get(id);
            if (info == null) {
                return null;
            }
            return state.aircrafts[info.aircraftIndex].flights[info.flightIndex];
        },
        getAircraftByFlightId: (state) => (id) => {
            const info = flightsById.get(id);
            if (info == null) {
                return null;
            }
            return state.aircrafts[info.aircraftIndex];
        },
        minDepartureMs(state) {
            return state.aircrafts.reduce(
                (minInAircrafts, aircraft) =>
                    aircraft.flights.reduce(
                        (min, flight) => Math.min(min, flight.departureDate.getTime()),
                        minInAircrafts
                    ),
                Number.MAX_SAFE_INTEGER
            );
        },
        maxArrivalMs(state) {
            return state.aircrafts.reduce(
                (maxInAircrafts, aircraft) =>
                    aircraft.flights.reduce(
                        (max, flight) => Math.max(max, flight.arrivalDate.getTime()),
                        maxInAircrafts
                    ),
                0
            );
        }
    },
    actions: {
        async fetch(aircraftsCount, flightsCount) {
            this.aircrafts = await service.fetch(aircraftsCount, flightsCount);
            this.alreadyFetched = true;

            this.aircrafts.forEach((aircraft, aircraftIndex) => {
                aircraftsById.set(aircraft.id, { aircraftIndex });

                aircraft.flights.forEach((flight, flightIndex) => {
                    flightsById.set(flight.id, { aircraftIndex, flightIndex });
                });
            });
        },
        push(aircraft) {
            if (!aircraftsById.get(aircraft.id)) {
                this.aircrafts.push(aircraft);
                const aircraftIndex = this.aircrafts.length - 1;
                aircraftsById.set(aircraft.id, { aircraftIndex });

                aircraft.flights.forEach((flight, flightIndex) => {
                    flightsById.set(flight.id, { aircraftIndex, flightIndex });
                });
            }
        },
        splice(...rest) {
            this.aircrafts.splice(rest).forEach((aircraft) => {
                aircraftsById.delete(aircraft.id);

                aircraft.flights.forEach((flight) => {
                    flightsById.delete(flight.id);
                });
            });
        }
    }
});
