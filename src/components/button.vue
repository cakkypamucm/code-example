<template>
    <button :type="type" v-bind="$attrs">
        <slot />
    </button>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: "button"
        }
    }
};
</script>

<style lang="scss" scoped>
button {
    $primary-color: #ffffff;
    $secondary-color: #007bff;

    display: inline-block;
    overflow: visible;
    box-sizing: border-box;
    padding: 0.375rem 0.75rem;
    border: 1px solid $secondary-color;
    border-radius: 0.25rem;
    background-color: $primary-color;
    color: $secondary-color;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-transform: none;
    transition: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    & + & {
        margin-left: 20px;
    }

    &:active {
        border: 1px solid $secondary-color;
        background-color: $secondary-color;
        color: $primary-color;
    }

    &:hover {
        background-color: $secondary-color;
        color: $primary-color;
        text-decoration: none;
    }

    &:focus {
        background-color: transparent;
        box-shadow: 0 0 0 3px rgba($secondary-color, 0.5);
        color: $secondary-color;
        outline: 0;
    }
}
</style>
