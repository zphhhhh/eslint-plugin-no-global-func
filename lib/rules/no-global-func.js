module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow function calls in the global scope",
      category: "Best Practices",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          functionName: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noGlobalCall:
        'Function "{{ name }}" should not be called in the global scope.',
    },
  },
  create(context) {
    const functionName = context.options[0].functionName;

    function reportIfGlobal(node) {
      if (node.type === "CallExpression" && node.callee.name === functionName) {
        const scope = context.getScope();
        if (scope.type === "global") {
          context.report({
            node,
            messageId: "noGlobalCall",
            data: {
              name: functionName,
            },
          });
        }
      }
    }

    return {
      CallExpression(node) {
        reportIfGlobal(node);
      },
    };
  },
};
