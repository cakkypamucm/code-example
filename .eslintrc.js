/* eslint sort-keys/sort-keys-fix: "error" */
/* eslint-disable sort-keys/sort-keys-fix */

const routerErrorMessage = (scope) =>
    `Router в ${scope} запрещен! Через $emit поднимитесь на уровень страницы и используйте router.`;

const storeErrorMessage = "Store в компонентах запрещен! Используйте props компонентов для получения данных.";

const routerErrorMessageForComponents = routerErrorMessage("компонентах");
const routerSelector = "Identifier[name='$router']";
module.exports = {
    extends: ["eslint-config-cakkypamucm"],
    /* eslint-enable sort-keys/sort-keys-fix */
    rules: {
        "capitalized-comments": ["error", "never", { ignorePattern: "TODO|FIXME" }],

        "import/extensions": [
            "error",
            "never",
            {
                ignorePackages: true,
                pattern: Object.fromEntries("json module svg".split(" ").map((ext) => [ext, "ignorePackages"]))
            }
        ],

        "unicorn/filename-case": [
            "error",
            {
                case: "kebabCase"
            }
        ]
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
                                group: ["@/stores/**/*", "@/modules/**/store"],
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
                    files: ["src/modules/auth/*"],
                    rules: {
                        "no-restricted-syntax": "off",
                        "vue/no-restricted-syntax": "off"
                    }
                }
            ]
        }
    ],
    globals: {
        _: true,
        $http: true,
        dayjs: true
    },
    root: true
};

// FIXME дописать проверку импортов внутри файлов в modules, чтоб из собственного модуля импортировали через ../
