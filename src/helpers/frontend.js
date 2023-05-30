import storage from "store2";
import scssVars from "src/css/variables.module";

const isMobileDevice = window.matchMedia("(any-pointer: coarse)").matches;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const utils = {
    storage,

    formatter: {
        normalizePropName(name) {
            if (name.endsWith("ID")) {
                name = `${name.slice(0, -2)}Id`;
            }
            return _.camelCase(name);
        },

        normalizePropNames(obj) {
            if (!_.isObject(obj)) {
                return obj;
            }
            if (_.isArray(obj)) {
                return obj.map((elem) => utils.formatter.normalizePropNames(elem));
            }
            return Object.keys(obj).reduce((prev, curr) => {
                prev[utils.formatter.normalizePropName(curr)] = utils.formatter.normalizePropNames(obj[curr]);
                return prev;
            }, {});
        },

        toUniqueSpaces(string) {
            return string.replace(/(\s)+/g, "$1");
        }
    },

    sleep: (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms)),

    retry: async (fn, { onEachRetryError, retries, retryIntervalMs }) => {
        try {
            return await fn();
        } catch (error) {
            onEachRetryError(retries);
            if (retries <= 0) {
                throw error;
            }
            await utils.sleep(retryIntervalMs);
            return utils.retry(fn, { onEachRetryError, retries: retries - 1, retryIntervalMs });
        }
    },

    isMobileDevice() {
        return isMobileDevice;
    },

    canvas: {
        // @see https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics#measuring_text_width
        getTextWidth({ text, font, fontSize, fontFamily = scssVars["font-family"] }) {
            ctx.font = font || `${fontSize}px ${fontFamily}`;
            return Math.ceil(ctx.measureText(text).width);
        },

        // @see https://longviewcoder.com/2021/02/11/html5-canvas-text-line-height-measurement/ for more precision
        getTextHeight({ fontSize, fontFamily = scssVars["font-family"] }) {
            const font = `bold ${fontSize}px ${fontFamily}`;
            ctx.font = font;

            // @see https://stackoverflow.com/a/13318387
            return utils.canvas.getTextWidth({ text: "M", font });
        }
    }
};

export default utils;
