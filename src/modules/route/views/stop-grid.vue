<template>
    <app-grid
        :column-defs="columnDefs"
        :row-data="rowData"
        :row-style="{ cursor: 'pointer' }"
        v-bind="$attrs"
        @row-clicked="rowClicked"
    />
</template>

<script>
import useStore from "../store";

export default {
    inheritAttrs: false,
    emits: {
        "stop-click": (payload) => !!(payload.id && payload.forward)
    },
    data() {
        return {
            store: useStore(),
            columnDefs: [
                {
                    flex: 1,
                    headerName: "Имя",
                    field: "stop.name",
                    tooltipField: "stop.name"
                },
                {
                    width: 90,
                    headerName: "Кол-во маршрутов",
                    headerTooltip: "Кол-во маршрутов",
                    valueGetter(params) {
                        return params.data.routeIds.length;
                    }
                },
                {
                    width: 100,
                    headerName: "Направление",
                    valueGetter(params) {
                        return params.data.forward === true ? "Прямое" : "Обратное";
                    }
                }
            ]
        };
    },
    computed: {
        rowData() {
            return this.store.stopsWithForward;
        }
    },
    methods: {
        rowClicked(ev) {
            this.$emit("stop-click", {
                id: ev.data.stop.id,
                forward: ev.data.forward
            });
        }
    }
};
</script>
