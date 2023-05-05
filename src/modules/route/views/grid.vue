<template>
    <app-grid
        :column-defs="columnDefs"
        :row-data="rowData"
        :row-style="{ cursor: 'pointer' }"
        :suppress-context-menu="false"
        :get-context-menu-items="getContextMenuItems"
        v-bind="$attrs"
        @row-clicked="rowClicked"
    />
</template>

<script>
import useStore from "../store";

export default {
    inheritAttrs: false,
    emits: {
        "route-click": (payload) => !!payload.id,
        "route-details-click": (payload) => !!payload.id
    },
    data() {
        return {
            store: useStore(),
            columnDefs: [
                { headerName: "Имя", field: "name", flex: 1 },
                {
                    headerName: "Кол-во остановок",
                    headerTooltip: "Кол-во остановок",
                    width: 150,
                    valueGetter(params) {
                        return params.data.stopIds.length;
                    }
                }
            ]
        };
    },
    computed: {
        rowData() {
            return this.store.routes;
        }
    },
    methods: {
        rowClicked(e) {
            this.$emit("route-click", { id: e.data.id });
        },
        getContextMenuItems(params) {
            return [
                {
                    name: "Подробно",
                    action: () => {
                        this.$emit("route-details-click", { id: params.node.data.id });
                    }
                }
            ];
        }
    }
};
</script>
