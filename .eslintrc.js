module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'es5',
            },
        ],
    },
    globals: {
        module: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        require: 'readonly',
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
};
