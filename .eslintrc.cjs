/* eslint sort-keys/sort-keys-fix: "error" */
/* eslint-disable sort-keys/sort-keys-fix */

const routerErrorMessage = (scope) =>
    `Router в ${scope} запрещен! Через $emit поднимитесь на уровень страницы и используйте router.`;

const storeErrorMessage = "Store в компонентах запрещен! Используйте props компонентов для получения данных.";

const routerErrorMessageForComponents = routerErrorMessage("компонентах");
const routerSelector = "Identifier[name='$router']";
module.exports = {
    extends: ["eslint-config-cakkypamucm", "plugin:vue-scoped-css/vue3-recommended", "plugin:vue/vue3-recommended"],
    /* eslint-enable sort-keys/sort-keys-fix */
    rules: {
        "capitalized-comments": ["error", "never", { ignorePattern: "TODO|FIXME" }],

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

        "vue/block-lang": [
            "error",
            {
                style: {
                    lang: "scss"
                }
            }
        ],
        "vue/block-tag-newline": "error",
        "vue/component-name-in-template-casing": [
            "error",
            "kebab-case",
            {
                ignores: [],
                registeredComponentsOnly: false
            }
        ],
        "vue/custom-event-name-casing": ["error", "kebab-case"],
        "vue/html-button-has-type": "error",
        "vue/html-comment-content-newline": "error",
        "vue/html-comment-content-spacing": "error",
        "vue/html-comment-indent": "error",
        "vue/next-tick-style": "error",
        "vue/no-duplicate-attr-inheritance": "error",
        "vue/no-irregular-whitespace": "error",
        "vue/no-multiple-objects-in-class": "error",
        "vue/no-potential-component-option-typo": [
            "error",
            {
                presets: ["all"]
            }
        ],
        "vue/no-static-inline-styles": [
            "error",
            {
                allowBinding: true
            }
        ],
        "vue/no-template-target-blank": "error",
        "vue/no-unused-refs": "error",
        "vue/no-useless-mustaches": "error",
        "vue/padding-line-between-blocks": "error",
        "vue/require-explicit-emits": "error"
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
    root: true
};

// FIXME дописать проверку импортов внутри файлов в modules, чтоб из собственного модуля импортировали через ../
