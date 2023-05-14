/* eslint sort-keys/sort-keys-fix: "error" */
/* eslint-disable sort-keys/sort-keys-fix */

const routerErrorMessage = (scope) =>
    `Router в ${scope} запрещен! Через $emit поднимитесь на уровень страницы и используйте router.`;

const storeErrorMessage = "Store в компонентах запрещен! Используйте props компонентов для получения данных.";

const addPaddingLineAfter = (statement) => [
    { blankLine: "always", prev: statement, next: "*" },
    { blankLine: "any", prev: statement, next: statement }
];

const routerErrorMessageForComponents = routerErrorMessage("компонентах");
const routerSelector = "Identifier[name='$router']";
module.exports = {
    plugins: ["sort-keys", "unused-imports"],
    extends: [
        "plugin:vuejs-accessibility/recommended",
        "plugin:import/recommended",
        "plugin:promise/recommended",
        "plugin:optimize-regex/recommended",
        "plugin:markdown/recommended",
        "plugin:vue/vue3-recommended",
        "plugin:vue-scoped-css/vue3-recommended",
        "plugin:sonarjs/recommended",
        "plugin:unicorn/recommended",
        "airbnb-base",
        "prettier"
    ],
    /* eslint-enable sort-keys/sort-keys-fix */
    rules: {
        "capitalized-comments": ["error", "never", { ignorePattern: "TODO|FIXME" }],
        "consistent-return": "off",
        "id-length": [2, { exceptions: ["_", "i", "j"], properties: "never" }],

        "import/exports-last": "error",
        "import/extensions": [
            "error",
            "never",
            {
                ignorePackages: true,
                pattern: Object.fromEntries("json module svg".split(" ").map((ext) => [ext, "ignorePackages"]))
            }
        ],
        "import/newline-after-import": ["error", { considerComments: true, count: 1 }],
        "import/no-absolute-path": "error",
        "import/no-useless-path-segments": "error",
        "import/order": [
            "error",
            { groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"] }
        ],

        "no-console": "warn",
        "no-constructor-return": "off",
        "no-multi-spaces": "error",
        "no-param-reassign": "off",
        "no-plusplus:": "off",
        "no-promise-executor-return": "off",
        "no-shadow": "off",
        "no-underscore-dangle": "off",
        "padding-line-between-statements": [
            "error",
            ...addPaddingLineAfter("directive"),
            ...addPaddingLineAfter("import"),
            ...addPaddingLineAfter("cjs-import")
        ],

        "promise/always-return": ["error", { ignoreLastCallback: true }],
        "promise/prefer-await-to-callbacks": ["error"],
        "promise/prefer-await-to-then": ["error"],

        "require-await": "error",

        "spaced-comment": ["error", "always"],

        "unicorn/consistent-function-scoping": "off",
        "unicorn/error-message": "error",
        "unicorn/explicit-length-check": "off",
        "unicorn/filename-case": [
            "error",
            {
                case: "kebabCase"
            }
        ],
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-array-for-each": "off",
        "unicorn/no-array-reduce": "off",
        "unicorn/no-empty-file": "off",
        "unicorn/no-null": "off",
        "unicorn/no-this-assignment": "off",
        "unicorn/numeric-separators-style": "off",
        "unicorn/prefer-module": "off",
        "unicorn/prefer-object-from-entries": "off",
        "unicorn/prefer-reflect-apply": "off",
        "unicorn/prefer-string-starts-ends-with": "error",
        "unicorn/prefer-ternary": ["error", "only-single-line"],
        "unicorn/prefer-type-error": "error",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/throw-new-error": "error",

        "unused-imports/no-unused-imports": "error",

        "vue/block-lang": [
            "error",
            {
                style: {
                    lang: "scss"
                }
            }
        ],
        "vue/block-tag-newline": "error",
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
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
    env: {
        browser: true,
        node: true
    },
    globals: {
        _: true,
        $http: true,
        dayjs: true
    },
    parserOptions: {
        ecmaVersion: 2021
    },
    root: true,
    settings: {
        "import/resolver": ["webpack", "node"]
    }
};
