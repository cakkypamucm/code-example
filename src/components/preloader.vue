<template>
    <app-fragment :wrap-tag="addWrapper ? 'div' : ''" :class="{ wrapper: addWrapper }">
        <div class="ball-container" :class="{ 'h-100': !addWrapper }">
            <div class="ball-pulse">
                <div v-for="i in 3" :key="i" :style="{ 'background-color': ballColor }" />
            </div>
        </div>
    </app-fragment>
</template>

<script>
export default {
    props: {
        addWrapper: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ballColor: "black"
        };
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    width: 100%;
    flex: 1 0 auto;
}

.ball-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

// @see https://github.com/Hokid/vue-loaders
.ball-pulse {
    display: inline-block;
    box-sizing: content-box;
    font-size: 0;

    & *,
    & ::after,
    & ::before {
        box-sizing: inherit;
    }

    & > div {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        animation-fill-mode: both;
        background-color: #ffffff;
    }

    $name: scale;
    $duration: 0.75s;
    $iteration-count: infinite;
    $timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08);

    @for $value from 1 through 4 {
        & > div:nth-child(#{$value - 1}) {
            animation: $name $duration -#{(4 - $value) * 0.12}s $iteration-count $timing-function;
        }
    }

    @keyframes #{$name} {
        30% {
            transform: scale(0.3);
        }

        100% {
            transform: scale(1);
        }
    }
}
</style>
