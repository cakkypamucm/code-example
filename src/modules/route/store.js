import { defineStore } from "pinia";

import routeService from "./service";

const routesById = new Map();
const stopsById = new Map();

export default defineStore("route", {
    state: () => ({
        routes: [],
        stops: [],
        stopsWithForward: []
    }),

    getters: {
        getRoute: (state) => (id) => {
            const info = routesById.get(id);
            if (info == null) {
                return null;
            }
            return state.routes[info.index];
        },

        getStopWithForward: () => (id, forward) => {
            const info = stopsById.get(id);
            if (info == null) {
                return null;
            }
            return info[forward];
        }
    },

    actions: {
        async fetch() {
            this.resetState();

            const routes = await routeService.fetch();
            const stops = [];
            const stopsWithForward = [];
            routes.forEach((route, index) => {
                // заведем map для поиска route по id напрямую (без find по всему массиву)
                routesById.set(route.id, { index });

                // нормализуем routes, вместо полных данных stop оставим {id, forward}
                route.stopIds = route.stops.map((stop) => {
                    let info = stopsById.get(stop.id);
                    if (info == null) {
                        info = {
                            index: stops.length
                        };

                        // заведем нормализованные stops
                        const { routeId, forward, ...normalized } = stop;
                        stops.push(normalized);
                    }

                    if (info[stop.forward] == null) {
                        // заведем stopsWithForward
                        const item = {
                            stop: stops[info.index],
                            forward: stop.forward,
                            routeIds: []
                        };
                        stopsWithForward.push(item);

                        info[stop.forward] = item;
                    }
                    info[stop.forward].routeIds.push(route.id);

                    // аналогично заведем map для поиска stops по его id напрямую (без find по всему массиву)
                    // и для stopsWithForward по его id, forward напрямую (без find по всему массиву)
                    stopsById.set(stop.id, info);

                    return { id: stop.id, forward: stop.forward };
                });
                delete route.stops;
            });

            this.routes = routes;
            this.stops = stops;
            this.stopsWithForward = stopsWithForward;
        },

        resetState() {
            this.$reset();
            routesById.clear();
            stopsById.clear();
        }
    }
});
