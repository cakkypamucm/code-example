import _ from "lodash";

import { createPinia } from "pinia";
import { createApp } from "vue";
import VueKonva from "vue-konva";

import dayjs from "dayjs";
import "dayjs/locale/ru";
import dayjsLocaleData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";

import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import ganttInit from "highcharts/modules/gantt";
import exportingInit from "highcharts/modules/exporting";
import offlineExportingInit from "highcharts/modules/offline-exporting";
import accessibilityInit from "highcharts/modules/accessibility";

import axios from "axios";
import axiosRetry from "axios-retry";

import App from "@/app";
import router from "@/router/index";
import "@/assets/scss/app";

const app = createApp(App);
app.config.globalProperties = {
    productionAbsoluteUrl: import.meta.env.productionAbsoluteUrl,
    Math
};

dayjs.locale("ru");
dayjs.extend(dayjsLocaleData);
dayjs.extend(utc);
dayjs.extend(duration);
window.dayjs = dayjs;

ganttInit(Highcharts);
exportingInit(Highcharts);
offlineExportingInit(Highcharts);
accessibilityInit(Highcharts);
const formattedNumber = new Intl.NumberFormat("ru-RU").formatToParts(99999.99);
const { value: decimalPoint } = formattedNumber.find((part) => part.type === "decimal");
const { value: thousandsSep } = formattedNumber.find((part) => part.type === "group");
Highcharts.setOptions({
    lang: {
        decimalPoint,
        thousandsSep,
        weekdays: dayjs.weekdays(),
        weekdaysShort: dayjs.weekdaysMin(),
        months: dayjs.months(),
        shortMonths: dayjs.monthsShort()
    }
});

app.use(createPinia()).use(router).use(VueKonva, { prefix: "K" }).use(HighchartsVue).mount("#app");

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

// TODO обновлять @/helpers/supported-browsers-regexp в прекоммит-хуке, если изменен .browserslistrc
