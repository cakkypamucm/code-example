/* eslint sort-keys/sort-keys-fix: "error" */
/* eslint-disable sort-keys/sort-keys-fix */

const vueSelectorPseudoClassNoUnknownRule = require("stylelint-config-recommended-vue/lib/vue-specific-rules");

module.exports = {
    plugins: ["stylelint-no-unsupported-browser-features"],
    extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-standard-vue/scss",
        "stylelint-config-idiomatic-order"
    ],
    /* eslint-enable */
    rules: {
        "color-hex-length": "long",
        "declaration-block-no-duplicate-properties": [
            true,
            {
                ignore: ["consecutive-duplicates-with-different-values"]
            }
        ],
        "plugin/no-unsupported-browser-features": [
            true,
            {
                ignorePartialSupport: false,
                severity: "warning"
            }
        ],
        "scss/at-import-partial-extension": "never",
        "scss/at-import-partial-extension-blacklist": [""],
        "scss/double-slash-comment-whitespace-inside": null,
        "selector-pseudo-class-no-unknown": [
            true,
            {
                ignorePseudoClasses: [
                    ...vueSelectorPseudoClassNoUnknownRule["selector-pseudo-class-no-unknown"][1].ignorePseudoClasses,
                    "export"
                ]
            }
        ],
        "unit-disallowed-list": [
            ["vw", "vh"],
            {
                message:
                    "Используйте (d|s|l)v* вместо v*, как некорректных единиц на мобильных устройствах из-за адресной строки",
                severity: "warning"
            }
        ]
    }
    /* eslint-disable sort-keys/sort-keys-fix */
};
