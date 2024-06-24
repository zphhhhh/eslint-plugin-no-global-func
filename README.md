### Background

This eslint plugin is used to check whether the global function is used in the code, because sometimes we need initialize function before using it.

So it will throw errors when you type the following codes:

```js
const hello = __('hello');        // Error! Function "__" should not be called in the global scope.
const world = I18n.t('world');    // Error! Function "I18n.t" should not be called in the global scope.

const getText = () => {
  const hello = __('hello');      // It's ok!
  const world = I18n.t('world');  // It's ok!
}
```

### Usage

With `eslint@9`:

```js
const eslintPluginNoGlobalFunc = require("eslint-plugin-no-global-func");

module.exports = {
  plugins: {
    "no-global-func": eslintPluginNoGlobalFunc,
  },
  rules: {
    "no-global-func/no-global-func": ["error", { functions: ["__", "I18n.t"] }],
  },
};
```

With `eslint@8`:

```js
module.exports = {
  plugins: ["no-global-func"],
  rules: {
    "no-global-func/no-global-func": ["error", { functions: ["__", "I18n.t"] }],
  },
};
```
