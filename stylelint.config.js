/* eslint sort-keys/sort-keys-fix: "error" */
/* eslint-disable sort-keys/sort-keys-fix */

module.exports = {
    extends: ["stylelint-config-cakkypamucm"],
    /* eslint-enable sort-keys/sort-keys-fix */
    rules: {
        "scss/at-import-partial-extension": "never",
        "scss/at-import-partial-extension-blacklist": [""],

        "unit-disallowed-list": [
            ["vw", "vh"],
            {
                message: "Используйте (d|s|l)v* вместо v*, как некорректных единиц на mobile из-за urlbar",
                severity: "warning"
            }
        ]
    }
    /* eslint-disable sort-keys/sort-keys-fix */
};

// TODO stylelint plugin like `eslint-plugin-import` find and install
