import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import supportedBrowsers from "@/helpers/supported-browsers-regexp";
import Auth from "@/modules/auth/index";

function createPage(path) {
    // eslint-disable-next-line import/extensions
    return import(/* webpackChunkName: "[request]" */ `@/pages/${path}.vue`);
}

const nameBrowserIsNotSupported = "browser-is-not-supported";
const isBrowserNotSupported = () => !supportedBrowsers.test(navigator.userAgent);
const router = createRouter({
    history: (process.env.NODE_ENV === "production" ? createWebHashHistory : createWebHistory)("/"),
    routes: [
        {
            path: "/",
            name: "index",
            redirect: { name: "flights" }
        },
        {
            path: "/flights",
            name: "flights",
            component: () => createPage("flights/index"),
            meta: {
                title: "Перелеты"
            }
        },
        {
            path: "/routes",
            name: "routes",
            component: () => createPage("routes/index"),
            meta: {
                title: "Маршруты"
            }
        },
        {
            path: "/routes/:id(\\d+)",
            name: "routes-id",
            component: () => createPage("routes/[id]"),
            props: (route) => ({ id: +route.params.id }),
            meta: {
                title: "Маршрут {{ id }}"
            }
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
                    next({ name: "login", query: { redirectPath: from.path }, replace: true });
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
                title: "Страница не найдена"
            }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    document.title = _.template(to?.meta?.title || "\uFEFF")(to.params);

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
        next({ name: "login", query: { redirectPath: to.path } });
        return;
    }

    next();
});

export default router;
