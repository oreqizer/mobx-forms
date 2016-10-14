/* eslint-disable import/no-extraneous-dependencies */
const ts = require('typescript');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      const opts = {
        target: ts.ScriptTarget.ES6,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React,
      };

      return ts.transpile(src, opts, path, []);
    }

    return src;
  },
};
