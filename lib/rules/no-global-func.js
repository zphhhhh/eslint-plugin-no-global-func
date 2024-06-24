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
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    const functions = context.options[0].functions;
    const globalFuncions = [];
    const memberFuncions = [];

    functions.forEach((func) => {
      func.split(".").length === 2
        ? memberFuncions.push(func.split("."))
        : globalFuncions.push(func);
    });

    function reportIfGlobal(node) {
      const scope =
        sourceCode && sourceCode.getScope
          ? sourceCode.getScope(node)
          : context.getScope();

      if (scope.type !== "global" && scope.type !== "module") {
        return;
      }

      if (node.type !== "CallExpression") {
        return;
      }

      // Check if the callee is a global function
      if (globalFuncions.includes(node.callee.name)) {
        context.report({
          node,
          messageId: "noGlobalCall",
          data: {
            name: node.callee.name,
          },
        });
        return;
      }

      // Check if the callee is a member function
      if (node.callee.type === "MemberExpression") {
        const { object, property } = node.callee;
        const target = memberFuncions.find(([objectName, methodName]) => {
          return object.name === objectName && property.name === methodName;
        });
        if (target) {
          context.report({
            node,
            messageId: "noGlobalCall",
            data: {
              name: target.join("."),
            },
          });
        }
        return;
      }
    }

    return {
      CallExpression(node) {
        reportIfGlobal(node);
      },
    };
  },
};
