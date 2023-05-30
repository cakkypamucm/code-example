<template>
    <ag-grid-vue v-bind="gridProps" />
</template>

<script>
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-alpine.css";

import localeRu from "src/plugins/ag-grid-locale-ru";
import helper from "src/helpers/frontend";

export default {
    components: {
        AgGridVue
    },
    inheritAttrs: false,
    data() {
        return {
            gridProps: {}
        };
    },
    created() {
        _.defaultsDeep(this.gridProps, this.$attrs, {
            "column-defs": this.$attrs["column-defs"].map(() => ({ suppressMenu: true, suppressMovable: true })),
            style: { width: "100%", height: "100%" },
            class: { "ag-theme-alpine": true },
            pagination: true,
            "pagination-page-size": 10,
            "suppress-context-menu": true,
            "tooltip-show-delay": helper.isMobileDevice() ? 100 : 500,
            "locale-text": localeRu
        });
    }
};
</script>

<style lang="scss" scoped>
@media (max-width: 430px) {
    :deep(.ag-paging-row-summary-panel),
    :deep(.ag-paging-page-summary-panel) {
        margin: 0 6px;
    }

    :deep(.ag-paging-button) {
        margin: 0 3px;
    }
}
</style>
