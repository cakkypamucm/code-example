/* eslint sort-keys/sort-keys-fix: "error" */

module.exports = {
    extends: ["stylelint-config-vue-kebab-no-ext-cakkypamucm"],
    rules: {
        "color-hex-length": "long",
        "unit-disallowed-list": [
            ["vw", "vh"],
            {
                message: "Используйте (d|s|l)v* вместо v*, как некорректных единиц на mobile из-за urlbar",
                severity: "warning"
            }
        ]
    }
};

// TODO stylelint plugin like `eslint-plugin-import` find and install
