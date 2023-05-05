import storage from "store2";

const isMobileDevice = window.matchMedia("(any-pointer: coarse)").matches;

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
    }
};

export default utils;
