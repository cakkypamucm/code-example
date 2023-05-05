<template>
    <app-fragment :wrap-tag="!multiRoot ? 'div' : ''" :class="{ 'h-100': !multiRoot }">
        <promised v-bind="$attrs" :pending-delay="0">
            <template v-if="$slots.combined" #combined="combinedContext">
                <app-preloader
                    v-if="showPreloader && combinedContext.isPending && combinedContext.isDelayElapsed"
                    :add-wrapper="multiRoot"
                />
                <slot name="combined" v-bind="combinedContext" />
            </template>
            <template v-if="!$slots.combined" #pending>
                <slot name="pending">
                    <app-preloader v-if="showPreloader" :add-wrapper="multiRoot" />
                </slot>
            </template>
            <template v-if="!$slots.combined" #default>
                <slot />
            </template>
            <template v-if="!$slots.combined" #rejected>
                <slot name="rejected" />
            </template>
        </promised>
    </app-fragment>
</template>

<script>
import { Promised } from "vue-promised";

export default {
    components: {
        Promised
    },
    inheritAttrs: false,
    props: {
        multiRoot: {
            type: Boolean,
            default: false
        },
        showPreloader: {
            type: Boolean,
            default: true
        }
    }
};
</script>
