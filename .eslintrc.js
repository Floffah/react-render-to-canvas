module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "plugin:@typescript-eslint/recommended",
    ],
    globals: {
        JSX: "readonly",
    },
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/prop-types": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: false,
            },
        ],
        "@typescript-eslint/no-var-requires": "warn",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
        prettier: true,
    },
    env: {
        node: true,
    },
};
