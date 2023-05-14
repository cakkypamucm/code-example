<template>
    <l-map ref="map" :style="{ height: '100%', outline: 'none' }" :zoom="10" :center="[0, 0]" @ready="mapReadyHandler">
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a target='_blank' href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
        />

        <l-marker
            v-for="{ stop, forward } in stopsWithForward"
            :key="getStopKey(stop, forward)"
            :lat-lng="[stop.lat, stop.lon]"
            :icon="getStopIcon(forward)"
            @click="stopClicked({ id: stop.id, forward })"
        >
            <l-tooltip>{{ stop.name }}</l-tooltip>
        </l-marker>

        <l-polyline
            v-for="route in routes"
            :key="route.id"
            :lat-lngs="getRouteLatLngs(route)"
            :color="routeColor"
            @click="polylineClicked(route.id)"
        >
            <l-tooltip>{{ route.name }}</l-tooltip>
        </l-polyline>
    </l-map>
</template>

<script>
import Leaflet from "leaflet";
import { LMap, LTileLayer, LPolyline, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

import stopForward from "@/assets/img/stop-forward.svg";
import stopReverse from "@/assets/img/stop-reverse.svg";
import useStore from "../store";

export default {
    components: {
        LMap,
        LTileLayer,
        LPolyline,
        LMarker,
        LTooltip
    },
    props: {
        shownObjects: {
            type: Object,
            required: true,
            validator(obj) {
                return obj.type !== undefined && obj.params !== undefined;
            }
        }
    },
    data() {
        return {
            store: useStore(),
            routes: [],
            stopsWithForward: [],
            stopIcons: {
                forward: Leaflet.icon({
                    iconUrl: stopForward,
                    iconSize: [26, 26]
                }),
                reverse: Leaflet.icon({
                    iconUrl: stopReverse,
                    iconSize: [26, 26]
                })
            },
            routeColor: "#7B7B7B",
            needToFitBounds: false
        };
    },
    watch: {
        shownObjects: {
            handler(val) {
                this.showObjects(val);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        polylineClicked(id) {
            this.showObjects({ type: "route", params: { id } });
        },
        stopClicked({ id, forward }) {
            this.showObjects({ type: "stop", params: { id, forward } });
        },

        showObjects({ type, params }) {
            if (!type) {
                return;
            }
            switch (type) {
                case "routes":
                    this.stopsWithForward = this.store.stopsWithForward;
                    this.routes = this.store.routes;
                    break;
                case "stops":
                    this.stopsWithForward = this.store.stopsWithForward;
                    this.routes = [];
                    break;
                case "route":
                    this.stopsWithForward = [];
                    this.routes = [this.store.getRoute(params.id)];
                    break;
                case "stop":
                    this.stopsWithForward = [this.store.getStopWithForward(params.id, params.forward)];
                    this.routes = [];
                    break;
                default:
                    return;
            }
            this.fitBounds();
        },
        fitBounds() {
            const bounds = [];
            if (this.stopsWithForward.length) {
                bounds.push(this.stopsWithForward.map(({ stop }) => [stop.lat, stop.lon]));
            }
            if (this.routes.length) {
                bounds.push(this.routes.map((route) => this.getRouteLatLngs(route)));
            }
            if (bounds.length) {
                // @see https://vue2-leaflet.netlify.app/faq/#how-can-i-access-the-leaflet-map-object
                // если this.$refs.map == null , делаем fitBounds в @map-ready
                if (this.$refs?.map?.leafletObject) {
                    this.$refs.map.leafletObject.fitBounds(new Leaflet.LatLngBounds(bounds));
                } else {
                    this.needToFitBounds = true;
                }
            }
        },
        mapReadyHandler() {
            if (this.needToFitBounds === true) {
                this.fitBounds();
                this.needToFitBounds = false;
            }
        },
        getStopIcon(forward) {
            return forward === true ? this.stopIcons.forward : this.stopIcons.reverse;
        },
        getStopKey(stop, forward) {
            return Symbol.for(`app.stopId.${stop.id}.${forward}`);
        },
        getRouteLatLngs(route) {
            return route.points.map((point) => [point.lat, point.lon]);
        }
    }
};
</script>

<style lang="scss" scoped>
:deep(.leaflet-interactive) {
    outline: none;
}
</style>
