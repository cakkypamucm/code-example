<template>
    <app-get-resources :promise="getResources()" :multi-root="true">
        <template #combined="{ isPending, isResolved }">
            <app-layout-page-default :show="!isPending">
                <template v-if="isResolved" #header>
                    <div class="row">
                        <div class="col-12">
                            <app-button v-app-auto-focus-click="true" @click="routesClicked"> Маршруты </app-button>
                            <app-button @click="stopsClicked"> Остановки </app-button>
                        </div>
                    </div>
                </template>
                <template v-if="!isPending" #default>
                    <div v-if="isResolved" class="row main-content">
                        <article class="sidebar">
                            <routes-grid
                                v-show="mode === 'routes'"
                                @route-details-click="routeDetailsClicked"
                                @route-click="routeClicked"
                            />
                            <stop-grid v-show="mode === 'stops'" @stop-click="stopClicked" />
                        </article>
                        <article class="map">
                            <routes-map :shown-objects="shownMapObjects" />
                        </article>
                    </div>
                    <div v-else class="row">
                        <div class="col-12">
                            <app-page-resources-rejected @page-refresh="$router.go()" />
                        </div>
                    </div>
                </template>
                <template v-if="!isPending" #footer>
                    <app-footer />
                </template>
            </app-layout-page-default>
        </template>
    </app-get-resources>
</template>

<script>
import RoutesGrid from "@/modules/route/views/grid";
import StopGrid from "@/modules/route/views/stop-grid";
import RoutesMap from "@/modules/route/views/map";
import routeModule from "@/modules/route/index";

export default {
    components: {
        RoutesGrid,
        StopGrid,
        RoutesMap
    },
    data() {
        return {
            mode: "",
            shownMapObjects: { type: "", params: {} }
        };
    },
    methods: {
        async getResources() {
            try {
                return await routeModule.fetch();
            } catch {
                /* eslint-disable-line no-empty */
            }
        },
        routesClicked() {
            this.mode = "routes";
            this.shownMapObjects.type = "routes";
            this.shownMapObjects.params = {};
        },
        stopsClicked() {
            this.mode = "stops";
            this.shownMapObjects.type = "stops";
            this.shownMapObjects.params = {};
        },
        routeClicked({ id }) {
            this.shownMapObjects.type = "route";
            this.shownMapObjects.params = { id };
        },
        stopClicked({ id, forward }) {
            this.shownMapObjects.type = "stop";
            this.shownMapObjects.params = { id, forward };
        },
        routeDetailsClicked({ id }) {
            this.$router.push({ name: "routes-id", params: { id } });
        }
    }
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/_base";

:deep(.main) {
    display: flex;
}

.main-content {
    flex: 1 0 auto;
}

.sidebar {
    height: 560px;

    @include base.column-padding;
}

.map {
    @include base.column-padding;
}

@media (max-width: base.$screen-sm-max) {
    .sidebar {
        width: 100%;
    }

    .map {
        width: 100%;
        height: 100vh;
        height: 100svh;
    }
}

@media (min-width: base.$screen-md-min) {
    .sidebar {
        width: 400px;
    }

    .map {
        flex: 1 0 auto;
    }
}
</style>
