module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:jest-playwright/recommended',
    'plugin:import/recommended',
  ],
  plugins: ['prettier', 'promise', 'jest', 'anti-trojan-source'],
  settings: {
    'import/resolver': {
      node: {},
    },
    react: {
      version: '17.0',
    },
  },
  overrides: [
    // TypeScript for Next.js
    {
      files: ['src/web/**/*.ts', 'src/web/**/*.tsx'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint', 'react', 'react-hooks'],
      env: {
        browser: true,
      },
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'jsx-a11y/anchor-is-valid': [
          'error',
          {
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
            aspects: ['invalidHref', 'preferButton'],
          },
        ],
        'import/extensions': 'off',
        // Allow using TypeScript constructor shorthand: `Foo(public bar: string){}`
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },

    // JavaScript for Node.js
    {
      files: ['src/backend/**/*.js', 'tools/**/*.js', 'src/api/**/*.js'],
      env: {
        node: true,
      },
    },

    // Static dashboard
    {
      files: ['src/api/status/public/**/*.js'],
      rules: { 'import/extensions': ['error', 'always'] },
    },

    // Jest Test files
    {
      files: ['test/**/*.js', '*.test.js', '*.test.ts', '*.test.tsx', '**/__mocks__/**/*.js'],
      env: { jest: true, node: true },
    },

    // Expo React Native app
    {
      files: ['src/mobile/**/*.js', 'src/mobile/**/*.jsx'],
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      plugins: ['react-native'],
      rules: { 'no-use-before-define': 'off' },
    },

    // Docusaurus app
    {
      files: ['src/docs/src/**/*.js'],
      extends: [
        'plugin:import/typescript',
        'plugin:node/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      plugins: ['react', 'react-hooks'],
      rules: {
        // https://github.com/facebook/docusaurus/blob/main/.eslintrc.js#L122
        // Ignore certain webpack aliases because they can't be resolved
        'import/no-unresolved': [
          'off',
          {
            ignore: ['^@theme', '^@docusaurus', '^@generated', '^@site'],
          },
        ],
        'global-require': 'off',
        'no-use-before-define': 'off',
        'node/no-missing-import': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
        // https://github.com/facebook/docusaurus/blob/main/.eslintrc.js#L154
        // We build a static site, and nearly all components don't change.
        'react/no-array-index-key': 'off',
        'react/prop-types': 'off',
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
  ],

  // Default rules for any file we lint
  rules: {
    /**
     * Force prettier formatting
     */
    'prettier/prettier': 'error',
    /**
     * Disallow the use of console
     * https://eslint.org/docs/rules/no-console
     */
    'no-console': 'off',

    /**
     * Disallow Reassignment of Function Parameters
     * https://eslint.org/docs/rules/no-param-reassign
     */
    'no-param-reassign': ['error', { props: false }],

    /** Disallows unnecessary return await
     * https://eslint.org/docs/rules/no-return-await
     */
    'no-return-await': 'error',
    /**
     * Disallow using an async function as a Promise executor
     * https://eslint.org/docs/rules/no-async-promise-executor
     */
    'no-async-promise-executor': 'error',
    /**
     * Disallow await inside of loops
     * https://eslint.org/docs/rules/no-await-in-loop
     */
    'no-await-in-loop': 'error',

    /**
     * Disallow assignments that can lead to race conditions due to
     * usage of await or yield
     * https://eslint.org/docs/rules/require-atomic-updates
     */
    'require-atomic-updates': 'error',

    /**
     * Disallow async functions which have no await expression
     * https://eslint.org/docs/rules/require-await
     */
    'require-await': 'error',

    /**
     * Require or disallow named function expressions
     * https://eslint.org/docs/rules/func-names
     */
    'func-names': 'off',
    /**
     * Disallow enforcement of consistent linebreak style
     * https://eslint.org/docs/rules/func-names
     */
    'linebreak-style': 'off',

    /**
     * Prevent variables used in JSX to be incorrectly marked as unused
     */
    'react/jsx-uses-vars': 'error',

    /**
     * Allow ES6 classes to override methods without using this
     * https://eslint.org/docs/rules/class-methods-use-this
     */
    'class-methods-use-this': 'off',

    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-danger': 'off',

    'jsx-a11y/control-has-associated-label': 'warn',

    /**
     * Due to having our dev dependencies in a monorepo layout, this is
     * difficult to configure properly.  Disabling for now.
     */
    'import/no-extraneous-dependencies': ['off'],
    'no-new': 'off',

    /**
     * False positive of no-shadow rule with ENUMs
     * https://github.com/typescript-eslint/typescript-eslint/issues/2483
     */
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    /**
     * Halt if a trojan source attack is found
     * https://github.com/lirantal/eslint-plugin-anti-trojan-source
     */
    'anti-trojan-source/no-bidi': 'error',
  },
};
