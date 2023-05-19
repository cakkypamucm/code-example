<template>
    <app-get-resources :promise="getResources()" :multi-root="true">
        <template #combined="{ isPending, isResolved }">
            <app-layout-page-default :show="!isPending">
                <template v-if="isResolved" #header>
                    <div class="row">
                        <div class="col-12">
                            <app-nav-to-page @navigate="$router.push({ name: 'vehicle.routes' })">
                                Все маршруты
                            </app-nav-to-page>
                        </div>
                    </div>
                </template>
                <template v-if="!isPending" #default>
                    <route v-if="isResolved" :id="id" />
                    <app-page-resources-rejected v-if="!isPending && !isResolved" @page-refresh="$router.go()" />
                </template>
                <template v-if="isResolved" #footer>
                    <app-footer />
                </template>
            </app-layout-page-default>
        </template>
    </app-get-resources>
</template>

<script>
import routeModule from "@/modules/vehicle-route/index";
import Route from "@/modules/vehicle-route/views/id";

export default {
    components: {
        Route
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    methods: {
        async getResources() {
            try {
                return await routeModule.fetch();
            } catch {
                /* eslint-disable-line no-empty */
            }
        }
    }
};
</script>
