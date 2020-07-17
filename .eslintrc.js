module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'max-len': ['error', 600, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'global-require': 0, // 不能使用require
    'no-param-reassign': 0, // 不允许函数参数重新赋值
    'no-unused-expressions': 0, // 不允许  this.toast.finally && this.toast.finally();形式
    'func-names': 0, // 不允许使用 const getList = function() {...}，是个警告
    'no-restricted-syntax': 0, // 禁止使用for in
    'no-mixed-operators': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'no-cond-assign': 0,
    'prefer-destructuring': 0,
    'import/extensions': 0,
    'no-shadow': 0,
    'import/named': 0,
    'consistent-return': 0,
    'prefer-promise-reject-errors': 0,
    'no-async-promise-executor': 0,
    'no-bitwise': 0,
    'no-useless-escape': 0,
    'no-use-before-define': 0,
    'no-restricted-globals': 0,
    'no-nested-ternary': 0,
    'no-continue': 0,
    'no-alert': 0,
    'import/no-dynamic-require': 0, // 不能使用动态require
    'prefer-const': 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
