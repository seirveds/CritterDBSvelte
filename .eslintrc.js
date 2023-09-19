module.exports = {
  extends: [
    // add more generic rule sets here, such as:
    // 'eslint:recommended',
    'plugin:svelte/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'svelte/rule-name': 'error'
  },
  settings: {
    'svelte3/ignore-warnings': (warning) => {
      return warning.code === 'a11y-click-events-have-key-events'
    },
  },
};