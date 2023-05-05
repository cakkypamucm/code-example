<template>
    <app-layout-page-default>
        <template #header>
            <div class="row">
                <div class="col-12">
                    <app-nav-to-page @navigate="$router.push({ name: 'index' })"> На главную </app-nav-to-page>
                </div>
            </div>
        </template>
        <template #default>
            <div class="row">
                <div class="col-12">
                    <h3 class="help-text">Страница не найдена</h3>
                </div>
            </div>
        </template>
        <template #footer>
            <app-footer />
        </template>
    </app-layout-page-default>
</template>
