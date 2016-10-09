const ts = require('typescript');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      const opts = {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React,
      };

      return ts.transpile(src, opts, path, []);
    }

    return src;
  },
};
