<template>
    <template v-if="route">
        <div class="row">
            <div class="col-12">
                <h3 class="help-text">Маршрут {{ route.id }} транспортного средства</h3>
            </div>
        </div>
        <div class="row">
            <article class="col-4">
                <h4>Свойства маршрута</h4>
                <ul class="route-info">
                    <li>
                        Имя: <span class="help-text">{{ route.name }}</span>
                    </li>
                    <li>
                        Описание: <span class="help-text">{{ route.description }}</span>
                    </li>
                    <li>
                        Кол-во остановок в прямом направлении:
                        <span class="help-text">{{ forwardStopIds.length }}</span>
                    </li>
                    <li>
                        Кол-во остановок в обратном направлении:
                        <span class="help-text">{{ reverseStopIds.length }}</span>
                    </li>
                </ul>
            </article>
            <article v-if="forwardStopIds.length" class="col-4">
                <h4>Список остановок в прямом направлении</h4>
                <ul>
                    <li v-for="stop in forwardStopIds" :key="stop.id" class="forward-stop-name">
                        {{ getStopName(stop) }}
                    </li>
                </ul>
            </article>
            <article v-if="reverseStopIds.length" class="col-4">
                <h4>Список остановок в обратном направлении</h4>
                <ul>
                    <li v-for="stop in reverseStopIds" :key="stop.id" class="reverse-stop-name">
                        {{ getStopName(stop) }}
                    </li>
                </ul>
            </article>
        </div>
    </template>
    <template v-else>
        <div class="row">
            <div class="col-12">
                <h3 class="help-text">Маршрут с id={{ id }} не найден</h3>
            </div>
        </div>
    </template>
</template>

<script>
import useStore from "../store";

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            store: useStore(),
            route: null
        };
    },
    computed: {
        forwardStopIds() {
            return this.route.stopIds.filter(({ forward }) => forward === true);
        },
        reverseStopIds() {
            return this.route.stopIds.filter(({ forward }) => forward === false);
        }
    },
    created() {
        this.route = this.store.getRoute(this.id);
    },
    methods: {
        getStopName({ id, forward }) {
            const info = this.store.getStopWithForward(id, forward);
            if (info == null) {
                return "";
            }
            return info.stop.name;
        }
    }
};
</script>

<style lang="scss" scoped>
h3,
h4 {
    margin-bottom: 15px;
}

li {
    position: relative;
    box-sizing: border-box;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    font-family: inherit;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    line-height: inherit;
    list-style: none none;
}

.forward-stop-name {
    color: blue;
}

.reverse-stop-name {
    color: red;
}
</style>
