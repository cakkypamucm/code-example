<template>
    <p class="help-text">При получении данных произошла ошибка.</p>
    <p class="help-text">
        Попробуйте <a href="#" @click.prevent="$emit('page-refresh')">обновить страницу</a> через некоторое время.
    </p>
</template>

<script>
export default {
    emits: {
        "page-refresh": null
    }
};
</script>
