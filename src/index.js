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

import FontFaceObserver from "fontfaceobserver";
import scssVars from "src/css/variables.module";
import App from "src/app";
import router from "src/router/index";

import "@fontsource/roboto-slab";
import "src/css/app";

// bug - custom font некорректно отображается при первоначальной отрисовке в canvas,
// только после первого redraw (после скролла, например) отображение сменяется на корректное, т.е. нужно
// либо принудительно вызывать redraw у всей stage,
// либо использовать данный workaround
const customFont = scssVars["font-family"].split(",")[0].slice(1, -1);
new FontFaceObserver(customFont).load();

const app = createApp(App);
app.config.globalProperties = {
    productionAbsoluteUrl: import.meta.env.productionAbsoluteUrl,
    Math,
    logValueToConsole(value) {
        console.debug(value);
        return value;
    }
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

// TODO обновлять src/helpers/supported-browsers-regexp в прекоммит-хуке, если изменен .browserslistrc
