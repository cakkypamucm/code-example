import _ from "lodash";
import axios from "axios";
import axiosRetry from "axios-retry";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import { createPinia } from "pinia";
import { createApp } from "vue";
import VueKonva from "vue-konva";
import * as Sentry from "@sentry/vue";

import App from "@/app";
import router from "@/router/index";
import "@/assets/scss/app";

const app = createApp(App);
Sentry.init({
    app,
    dsn: "https://fad9ba4b02084b828ad57e31a661f501@o4505107600441344.ingest.sentry.io/4505115923709952",
    integrations: [
        new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router)
        }),
        new Sentry.Replay()
    ],
    release: import.meta.env.packageVersion,
    trackComponents: true,
    hooks: ["mount", "update", "destroy"],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1
});
window.Sentry = Sentry;
app.use(createPinia()).use(router).use(VueKonva, { prefix: "K" }).mount("#app");

axiosRetry(axios, {
    retries: import.meta.env.fetchRetries.count,

    // eslint-disable-next-line arrow-body-style
    retryDelay: () => {
        return import.meta.env.fetchRetries.intervalMs;
    }
});
window.$http = axios;

_.templateSettings.interpolate = /{{([\S\s]+?)}}/g;
_.templateSettings.evaluate = /{#([\S\s]+?)#}/g;
window._ = _;

dayjs.locale("ru");
window.dayjs = dayjs;

// TODO обновлять @/helpers/supported-browsers-regexp в прекоммит-хуке, если изменен .browserslistrc
