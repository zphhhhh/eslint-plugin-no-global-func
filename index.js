module.exports = {
  meta: {
    name: "eslint-plugin-no-global-func",
    version: "0.0.2",
  },
  rules: {
    "no-global-func": require("./lib/rules/no-global-func"),
  },
};
