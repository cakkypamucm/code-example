/* eslint sort-keys/sort-keys-fix: "error" */
/* eslint-disable sort-keys/sort-keys-fix */

const routerErrorMessage = (scope) =>
    `Router в ${scope} запрещен! Через $emit поднимитесь на уровень страницы и используйте router.`;

const storeErrorMessage = "Store в компонентах запрещен! Используйте props компонентов для получения данных.";

const routerErrorMessageForComponents = routerErrorMessage("компонентах");
const routerSelector = "Identifier[name='$router']";
module.exports = {
    extends: ["eslint-config-cakkypamucm", "eslint-config-vue3-cakkypamucm"],
    /* eslint-enable sort-keys/sort-keys-fix */
    rules: {
        "capitalized-comments": ["error", "never", { ignorePattern: "TODO|FIXME" }],
        "id-length": [2, { exceptions: ["_", "i", "j"], properties: "never" }],

        "import/extensions": [
            "error",
            "never",
            {
                ignorePackages: false,
                pattern: Object.fromEntries("cjs json module svg".split(" ").map((ext) => [ext, "ignorePackages"]))
            }
        ],

        "unicorn/filename-case": [
            "error",
            {
                case: "kebabCase"
            }
        ],

        "vue/component-name-in-template-casing": [
            "error",
            "kebab-case",
            {
                ignores: [],
                registeredComponentsOnly: false
            }
        ],
        "vue/custom-event-name-casing": ["error", "kebab-case"]
    },
    /* eslint-disable sort-keys/sort-keys-fix */
    overrides: [
        {
            files: ["src/components/**/*"],
            rules: {
                "no-restricted-imports": [
                    "error",
                    {
                        patterns: [
                            {
                                group: ["src/stores/**/*", "src/modules/**/store"],
                                message: storeErrorMessage
                            },
                            {
                                group: ["vue-router"],
                                message: routerErrorMessageForComponents
                            }
                        ]
                    }
                ],
                "no-restricted-syntax": [
                    "error",
                    {
                        selector: routerSelector,
                        message: routerErrorMessageForComponents
                    },
                    {
                        selector: "Identifier[name='$store']",
                        message: storeErrorMessage
                    }
                ],
                "vue/no-restricted-syntax": [
                    "error",
                    {
                        selector: "VElement[name='router-link']",
                        message: routerErrorMessageForComponents
                    },
                    {
                        selector: routerSelector,
                        message: routerErrorMessageForComponents
                    },
                    {
                        selector: "Identifier[name='$store']",
                        message: storeErrorMessage
                    }
                ]
            }
        },
        {
            files: ["src/modules/**/*"],
            rules: {
                "no-restricted-imports": [
                    "error",
                    {
                        patterns: [
                            {
                                group: ["vue-router"],
                                message: routerErrorMessage("модулях")
                            }
                        ]
                    }
                ],
                "no-restricted-syntax": [
                    "error",
                    {
                        selector: routerSelector,
                        message: routerErrorMessage("модулях")
                    }
                ],
                "vue/no-restricted-syntax": [
                    "error",
                    {
                        selector: "VElement[name='router-link']",
                        message: routerErrorMessage("модулях")
                    },
                    {
                        selector: routerSelector,
                        message: routerErrorMessage("модулях")
                    }
                ]
            },
            overrides: [
                {
                    files: ["src/modules/auth/**/*"],
                    rules: {
                        "no-restricted-syntax": "off",
                        "vue/no-restricted-syntax": "off"
                    }
                }
            ]
        },
        {
            files: ["src/modules/aircraft/**/*"],
            excludedFiles: ["src/modules/aircraft/config.js", "src/modules/aircraft/service.js"],
            rules: {
                "no-magic-numbers": ["error", { ignore: [0, 1, 2] }]
            }
        }
    ],
    globals: {
        _: true,
        $http: true,
        dayjs: true
    },
    root: true,
    settings: {
        "import/resolver": ["node", "webpack"]
    }
};

// FIXME дописать проверку импортов внутри файлов в modules, чтоб из собственного модуля импортировали через ../
