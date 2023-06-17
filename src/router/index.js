import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import qs from "qs";
import { unref } from "vue";
import { onFCP, onLCP } from "web-vitals";
import supportedBrowsersRE from "src/helpers/supported-browsers-regexp";
import Auth from "src/modules/auth/index";
import helper from "src/helpers/frontend";

function createPage(path) {
    return import(/* webpackChunkName: "[request]" */ `src/pages/${path}`);
}
let lastVisitedRouteData;
const lastVisitedRouteDataStorageId = "app.lastVisitedRoute";
const nameBrowserIsNotSupported = "browser-is-not-supported";
const konvaRouteName = "aircraft.flights.konva";
const isBrowserNotSupported = () => !supportedBrowsersRE.test(navigator.userAgent);
const router = createRouter({
    history: (process.env.NODE_ENV === "production" ? createWebHashHistory : createWebHistory)("/"),
    parseQuery(query) {
        return qs.parse(query);
    },
    stringifyQuery(query) {
        return qs.stringify(query) || "";
    },
    routes: [
        {
            path: "/",
            name: "index",
            redirect: { name: "aircraft.flights.konva.nativeScrollbars" }
        },

        {
            path: "/aircraft/flights/konva",
            name: konvaRouteName,
            component: () => createPage("aircraft/flights/konva/index"),
            meta: {
                title: "Перелеты konva"
            }
        },
        {
            path: "/aircraft/flights/highcharts-gantt",
            name: "aircraft.flights.gantt",
            component: () => createPage("aircraft/flights/highcharts-gantt/index"),
            meta: {
                title: "Перелеты highcharts-gantt"
            }
        },
        {
            path: "/aircraft/flights/konva/native-scrollbars",
            name: "aircraft.flights.konva.nativeScrollbars",
            component: () => createPage("aircraft/flights/konva/native-scrollbars"),
            meta: {
                title: "Перелеты konva native-scrollbars"
            }
        },
        {
            path: "/aircraft",
            redirect: { path: "/aircraft/flights" }
        },
        {
            path: "/aircraft/flights",
            redirect: { name: konvaRouteName }
        },

        {
            path: "/vehicle/routes",
            name: "vehicle.routes",
            component: () => createPage("vehicle/routes/index"),
            meta: {
                title: "Маршруты транспортных средств"
            }
        },
        {
            path: "/vehicle/routes/:id(\\d+)",
            name: "vehicle.routes.id",
            component: () => createPage("vehicle/routes/[id]"),
            props: (route) => ({ id: +route.params.id }),
            meta: {
                title: "Маршрут {{ id }} транспортного средства"
            }
        },
        {
            path: "/vehicle",
            redirect: { name: "vehicle.routes" }
        },

        {
            path: "/login",
            name: "login",
            component: () => createPage("login"),

            // при успешной аутентификации не показывается страница логина
            async beforeEnter(to, from, next) {
                if (await new Auth(router).isUserAuthenticated()) {
                    next({ name: "index", replace: true });
                } else {
                    next();
                }
            },

            meta: {
                public: true,
                title: "Вход"
            }
        },
        {
            path: "/logout",
            name: "logout",
            async beforeEnter(to, from, next) {
                try {
                    await new Auth(router).logout();
                } finally {
                    next({
                        name: "login",
                        query: { redirect: { path: lastVisitedRouteData.path, query: lastVisitedRouteData.query } },
                        replace: true
                    });
                }
            },
            meta: {
                public: true
            }
        },
        {
            path: "/browser-is-not-supported",
            name: nameBrowserIsNotSupported,
            component: () => createPage(nameBrowserIsNotSupported),
            beforeEnter(to, from, next) {
                if (isBrowserNotSupported()) {
                    next();
                } else {
                    next({ name: "index", replace: true });
                }
            },
            meta: {
                public: true,
                title: "Версия браузера не поддерживается"
            }
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => createPage("not-found"),
            meta: {
                public: true,
                title: "Страница не найдена"
            }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    document.title = _.template(to?.meta?.title || "\uFEFF")(to.params);

    lastVisitedRouteData = helper.storage.get(lastVisitedRouteDataStorageId) || {};
    helper.storage.remove(lastVisitedRouteDataStorageId);

    if (isBrowserNotSupported() && to.name !== nameBrowserIsNotSupported) {
        next({ name: nameBrowserIsNotSupported, replace: true });
        return;
    }

    const auth = new Auth(router);
    if (to.matched.some((record) => !record.meta.public)) {
        if (await auth.isUserAuthenticated()) {
            next();
            return;
        }
        next({ name: "login", query: { redirect: { path: to.path, query: to.query } } });
        return;
    }

    next();
});

window.addEventListener("beforeunload", () => {
    const route = unref(router.currentRoute);
    helper.storage.set(lastVisitedRouteDataStorageId, { path: route.path, query: route.query });
});

function logMetric(metric) {
    console.debug(`${metric.name}: ${Math.ceil(metric.value)}ms == '${metric.rating}'`);
}

onFCP(logMetric);
onLCP(logMetric);

export default router;
