<template>
    <app-layout-page-default>
        <template #default>
            <div class="text-center">
                <login />
            </div>
        </template>
    </app-layout-page-default>
</template>

<script>
import login from "src/modules/auth/views/index";

export default {
    components: {
        login
    }
};
</script>

<style lang="scss" scoped>
:deep(.main) {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
