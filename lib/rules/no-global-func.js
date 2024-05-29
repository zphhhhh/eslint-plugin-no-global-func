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
          functions: {
            type: "array",
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
    const functions = context.options[0].functions;

    function reportIfGlobal(node) {
      if (
        node.type === "CallExpression" &&
        functions.includes(node.callee.name)
      ) {
        const scope = context.getScope();
        if (scope.type === "global" || scope.type === "module") {
          context.report({
            node,
            messageId: "noGlobalCall",
            data: {
              name: node.callee.name,
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
