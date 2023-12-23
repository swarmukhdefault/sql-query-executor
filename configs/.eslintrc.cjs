module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['../build', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        interfaces: {
          memberTypes: ['signature', 'field', 'constructor', 'method'],
          order: 'alphabetically-case-insensitive'
        }
      }
    ],
    '@typescript-eslint/method-signature-style': ['error', 'method'],
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'arrow-body-style': ['error', 'as-needed'],
    'brace-style': ['error', '1tbs'],
    'complexity': [
      'error',
      { max: 10 }
    ],
    'curly': ['error', 'all'],
    'func-style': ['error', 'expression'],
    'jsx-quotes': ['warn', 'prefer-single'],
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'max-lines': [
      'warn',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'max-params': [
      'error',
      { max: 4 }
    ],
    'no-cond-assign': ['error', 'except-parens'],
    'no-console': 'error',
    // use the following only if reverse mapping is not required
    'no-restricted-syntax': [
      'error',
      {
        'selector': 'TSEnumDeclaration:not([const=true])',
        'message': 'Use const enums to reduce memory footprint'
      }
    ],
    'no-underscore-dangle': [
      'error',
      { allowFunctionParams: true }
    ],
    'no-unused-vars': 'off',
    'operator-linebreak': ['error', 'before'],
    'quotes': ['error', 'single'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
