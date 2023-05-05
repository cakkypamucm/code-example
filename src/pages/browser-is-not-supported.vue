<template>
    <app-layout-page-default>
        <template #default>
            <div class="main-content text-center">
                <h3>Ваша версия браузера не поддерживается</h3>
                <p>Поддерживаются актуальные версии:</p>
                <p v-if="isMobileDevice" class="help-text">
                    Chrome, Firefox, Opera (не mini), Safari, Samsung Internet, UC Browser
                </p>
                <p v-else class="help-text">Chrome, Edge, Firefox, Opera, Safari, Yandex</p>
                <p>Пожалуйста, обновите ваш браузер!</p>
            </div>
        </template>
    </app-layout-page-default>
</template>

<script>
import helper from "@/helpers/frontend";

export default {
    data() {
        return {
            isMobileDevice: helper.isMobileDevice()
        };
    }
};
</script>

<style lang="scss" scoped>
:deep(.main) {
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-content {
    line-height: 1.5;
}
</style>
