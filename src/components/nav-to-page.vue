<template>
    <nav>
        <app-button @click="$emit('navigate')">
            <slot />
        </app-button>
    </nav>
</template>

<script>
export default {
    emits: {
        navigate: null
    }
};
</script>
