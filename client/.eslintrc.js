module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'cypress'],
  ignorePatterns: [
    'public/**/*',
    '*.json',
    '*.md',
    '*.test.tsx',
    'build/**/*',
    'src/utils/resources/*',
  ],
  rules: {
    '@typescript-eslint/indent': 'off',
    indent: ['error', 2],
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
