module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": ["@typescript-eslint", "prettier", "import"],
    "rules": {
        "prettier/prettier": "error",
        "import/extensions": "off",
        "no-console": "off",
        "import/order": [
            "error",
            {
                "newlines-between": "never",
                groups: [
                    ["builtin", "external"],
                    ["internal", "parent", "sibling", "index"]
                ]
            }
        ]
    },
    "settings": {
        "import/parsers": {
            "@typescript-eslint/parser": ['.ts'],
               "parserOptions": ["./tsconfig.json"]
        },
        "import/resolver":{
            "typescript": {
                "alwaysTryTypes": true,
                "project": "./tsconfig.json"
            }
        }
    },
}
