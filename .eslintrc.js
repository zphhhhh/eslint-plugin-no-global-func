module.exports = {
  plugins: ["no-global-func"],
  rules: {
    "no-global-func/no-global-func": ["error", { functionName: "__" }],
  },
};
